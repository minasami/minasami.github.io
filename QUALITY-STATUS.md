# Quality Status

Last reviewed: 2026-07-07

## Current status

- Internal route checking is handled by `scripts/check_links.py`.
- The site workflow now treats internal route failures as blocking.
- External link checks are advisory because outside websites can fail independently from this site.
- New duplicate automated link-check issue creation has been removed from the workflow.

## Manual cleanup

Older duplicate automated-check issues can be closed manually after the updated workflow runs cleanly.

## Next checks

1. Run Site Link Check manually from GitHub Actions.
2. Confirm internal route checking passes.
3. Confirm no new duplicate automated-check issues are created.
4. Close older duplicate automated-check issues.
