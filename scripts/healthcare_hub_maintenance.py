#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
HUB = ROOT / "healthcare-transformation"
BASE = "https://minasami.github.io"
HREF_RE = re.compile(r'href=["\']([^"\']+)["\']', re.I)


def pages() -> list[Path]:
    return sorted(p for p in HUB.rglob("*") if p.is_file() and (p.name == "index.html" or p.suffix.lower() == ".md"))


def public_url(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel.endswith("/index.html"):
        rel = rel[:-10]
    return f"{BASE}/{rel}"


def internal_target(href: str) -> Path | None:
    if href.startswith(("#", "mailto:", "tel:", "javascript:")):
        return None
    parsed = urlparse(href)
    if parsed.scheme and parsed.netloc:
        if parsed.netloc != "minasami.github.io":
            return None
        href = parsed.path
    href = href.split("#", 1)[0].split("?", 1)[0]
    if not href:
        return None
    candidate = ROOT / href.lstrip("/") if href.startswith("/") else HUB / href
    if candidate.is_dir() or href.endswith("/"):
        candidate = candidate / "index.html"
    return candidate


def audit() -> dict:
    found = pages()
    broken: list[dict[str, str]] = []
    links_checked = 0
    for page in found:
        if page.suffix.lower() != ".html":
            continue
        text = page.read_text(encoding="utf-8", errors="replace")
        for href in HREF_RE.findall(text):
            target = internal_target(href)
            if target is None:
                continue
            links_checked += 1
            if not target.exists():
                broken.append({"page": page.relative_to(ROOT).as_posix(), "href": href})
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "page_count": len(found),
        "internal_links_checked": links_checked,
        "broken_internal_links": broken,
        "status": "pass" if not broken else "fail",
    }


def write_sitemap(found: list[Path]) -> None:
    urls = "\n".join(f"  <url><loc>{public_url(p)}</loc></url>" for p in found)
    xml = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n'
    (ROOT / "healthcare-transformation-sitemap-auto.xml").write_text(xml, encoding="utf-8")


def write_report(result: dict) -> None:
    report_dir = HUB / "reports"
    report_dir.mkdir(exist_ok=True)
    (report_dir / "maintenance-report.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    broken = result["broken_internal_links"]
    rows = "\n".join(f"- `{x['page']}` -> `{x['href']}`" for x in broken) or "- None"
    md = (
        "# Healthcare Hub Maintenance Report\n\n"
        f"- Status: **{result['status'].upper()}**\n"
        f"- Pages found: {result['page_count']}\n"
        f"- Internal links checked: {result['internal_links_checked']}\n"
        f"- Generated: {result['generated_at']}\n\n"
        "## Broken internal links\n" + rows + "\n"
    )
    (report_dir / "maintenance-report.md").write_text(md, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    result = audit()
    if args.write:
        write_sitemap(pages())
        write_report(result)
    print(json.dumps(result, indent=2))
    return 0 if result["status"] == "pass" else 1


if __name__ == "__main__":
    raise SystemExit(main())
