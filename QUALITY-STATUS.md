# Quality Status

Last reviewed: 2026-07-07

## Current status

- Internal route checking is handled by `scripts/check_links.py`.
- The site workflow now treats internal route failures as blocking.
- External link checks are advisory because outside websites can fail independently from this site.
- New duplicate automated link-check issue creation has been removed from the workflow.
- Engineering mode is documented in `CONTRIBUTING.md`, the PR template and the public Site Quality Runbook.
- The Decision Navigator, saved Decision Brief and Readiness Assessment handoff are now part of the quality model.
- Validate Site Quality now checks that the Readiness Assessment script exists as part of decision-route validation.

## Manual cleanup

Older duplicate automated-check issues can be closed manually after the updated workflow runs cleanly.

## Next checks

1. Run Site Link Check manually from GitHub Actions.
2. Confirm internal route checking passes.
3. Confirm no new duplicate automated-check issues are created.
4. Close older duplicate automated-check issues.
5. Run Validate Site Quality and confirm the Decision Navigator and Readiness Assessment routes pass.
6. Keep strengthening decision-tool continuity checks in small safe workflow updates.
