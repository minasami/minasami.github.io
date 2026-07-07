from pathlib import Path
from urllib.parse import urlparse
import re
import sys

root = Path(__file__).resolve().parents[1]
files = [p for p in root.rglob('*') if p.suffix.lower() in ('.html', '.md') and '.git' not in p.parts]
pattern = re.compile('(?:href|src)=["\\\']([^"\\\']+)["\\\']|\\[[^\\]]+\\]\\(([^) ]+)\\)')
ignore = ('#', 'mailto:', 'tel:', 'javascript:', 'data:')
checked = 0
broken = []
for source in files:
    text = source.read_text(encoding='utf-8', errors='ignore')
    for match in pattern.findall(text):
        link = match[0] or match[1]
        if not link or link.startswith(ignore):
            continue
        parsed = urlparse(link)
        if parsed.scheme or parsed.netloc:
            if parsed.netloc != 'minasami.github.io':
                continue
            link = parsed.path
        link = link.split('#')[0].split('?')[0]
        if not link:
            continue
        target = root / link.lstrip('/') if link.startswith('/') else source.parent / link
        if link.endswith('/') or target.is_dir():
            target = target / 'index.html'
        checked += 1
        if not target.exists():
            broken.append((source.relative_to(root).as_posix(), link))
print('Internal links checked:', checked)
if broken:
    print('Broken internal links:')
    for source, link in broken:
        print(f'- {source} -> {link}')
    sys.exit(1)
print('Broken internal links: 0')
