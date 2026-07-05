#!/usr/bin/env python3
"""Validate core quality gates for minasami.github.io.

This script intentionally uses only the Python standard library so it can run
inside GitHub Actions without dependency installation.
"""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
IGNORE_DIRS = {'.git', '.github', 'node_modules', '__pycache__'}
REQUIRED_SCRIPTS = [
    '/assets/recruiter-assistant.js',
    '/assets/site-enhancements.js',
    '/assets/experience-router.js',
]
IMPORTANT_PAGES = [
    '/',
    '/digital-health-command-center/',
    '/site-growth-control-center/',
    '/career-intelligence-dashboard/',
    '/proof-room/',
    '/claims-registry/',
    '/executive-brief/',
    '/ceo-digital-health-advisory/',
    '/digital-health-readiness-assessment/',
    '/outreach-command-system/',
    '/linkedin-content-engine/',
    '/share/',
    '/quality-trust-audit/',
]


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title = ''
        self._in_title = False
        self.meta: dict[str, str] = {}
        self.links: list[str] = []
        self.scripts: list[str] = []
        self.canonical = ''
        self.h1_count = 0
        self.images_missing_alt: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = {k.lower(): (v or '') for k, v in attrs}
        if tag == 'title':
            self._in_title = True
        elif tag == 'meta':
            name = attrs_dict.get('name') or attrs_dict.get('property')
            content = attrs_dict.get('content', '')
            if name:
                self.meta[name.lower()] = content
        elif tag == 'link':
            href = attrs_dict.get('href', '')
            rel = attrs_dict.get('rel', '')
            if 'canonical' in rel:
                self.canonical = href
            if href:
                self.links.append(href)
        elif tag == 'a':
            href = attrs_dict.get('href', '')
            if href:
                self.links.append(href)
        elif tag == 'script':
            src = attrs_dict.get('src', '')
            if src:
                self.scripts.append(src)
        elif tag == 'h1':
            self.h1_count += 1
        elif tag == 'img':
            src = attrs_dict.get('src', '')
            alt = attrs_dict.get('alt')
            if src and (alt is None or not alt.strip()):
                self.images_missing_alt.append(src)

    def handle_endtag(self, tag: str) -> None:
        if tag == 'title':
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data.strip()


def html_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob('*.html'):
        if any(part in IGNORE_DIRS for part in path.parts):
            continue
        files.append(path)
    return sorted(files)


def route_for_file(path: Path) -> str:
    rel = path.relative_to(ROOT)
    if rel.name == 'index.html':
        parent = rel.parent.as_posix()
        return '/' if parent == '.' else f'/{parent}/'
    return '/' + rel.as_posix()


def route_exists(route: str) -> bool:
    route = route.split('#', 1)[0].split('?', 1)[0]
    if not route or route == '/':
        return (ROOT / 'index.html').exists()
    if route.endswith('/'):
        return (ROOT / route.strip('/') / 'index.html').exists()
    return (ROOT / route.lstrip('/')).exists()


def is_external(url: str) -> bool:
    parsed = urlparse(url)
    return parsed.scheme in {'http', 'https', 'mailto', 'tel', 'sms'} or url.startswith('//')


def validate_page(path: Path) -> list[str]:
    errors: list[str] = []
    html = path.read_text(encoding='utf-8')
    parser = PageParser()
    parser.feed(html)
    route = route_for_file(path)

    if not parser.title:
        errors.append(f'{route}: missing <title>')
    if not parser.meta.get('description'):
        errors.append(f'{route}: missing meta description')
    if not parser.canonical:
        errors.append(f'{route}: missing canonical link')
    if parser.h1_count != 1:
        errors.append(f'{route}: expected exactly one h1, found {parser.h1_count}')
    if parser.images_missing_alt:
        errors.append(f'{route}: images missing alt text: {", ".join(parser.images_missing_alt[:3])}')

    missing_scripts = [script for script in REQUIRED_SCRIPTS if script not in html]
    if missing_scripts and route not in {'/privacy/', '/accessibility/'}:
        errors.append(f'{route}: missing required script(s): {", ".join(missing_scripts)}')

    for link in parser.links:
        if link.startswith('#') or link.startswith('data:') or link.startswith('javascript:'):
            continue
        if is_external(link):
            continue
        if link.startswith('/') and not route_exists(link):
            errors.append(f'{route}: broken internal link {link}')

    return errors


def validate_sitemap(routes: set[str]) -> list[str]:
    errors: list[str] = []
    sitemap = ROOT / 'sitemap.xml'
    if not sitemap.exists():
        return ['missing sitemap.xml']
    text = sitemap.read_text(encoding='utf-8')
    for route in IMPORTANT_PAGES:
        url = f'https://minasami.github.io{route}'
        if url not in text:
            errors.append(f'sitemap.xml: missing important URL {url}')
    for match in re.findall(r'<loc>https://minasami\.github\.io([^<]*)</loc>', text):
        route = match or '/'
        if route not in routes and not route.endswith('.json') and not route.endswith('.txt'):
            errors.append(f'sitemap.xml: URL has no matching page/file {route}')
    return errors


def main() -> int:
    files = html_files()
    routes = {route_for_file(path) for path in files}
    errors: list[str] = []

    for path in files:
        errors.extend(validate_page(path))
    errors.extend(validate_sitemap(routes))

    if errors:
        print('Site validation failed:')
        for error in errors:
            print(f' - {error}')
        return 1

    print(f'Site validation passed for {len(files)} HTML page(s).')
    return 0


if __name__ == '__main__':
    sys.exit(main())
