# Platform Architecture

Last reviewed: 2026-07-07

## Purpose

This repository is a lightweight digital-health career and decision-support platform. It should help visitors understand Mina's work, verify proof, choose a useful route and start a serious conversation.

## Core user journeys

### Decision-maker journey

1. `/decision-navigator/`
2. Decision Brief
3. `/digital-health-readiness-assessment/`
4. Executive Readiness Brief
5. `/proof-room/` or `/contact/`

### Executive overview journey

1. `/digital-health-command-center/`
2. `/digital-health-operating-system/`
3. `/executive-conversation-kit/`
4. `/proof-room/`
5. `/contact/`

### Recruiter journey

1. `/executive-brief/`
2. `/proof-room/`
3. `/medicine-support-hub/`
4. `/recruiter-resources/`
5. `/contact/`

### Quality and governance journey

1. `/quality-trust-audit/`
2. `/site-quality-gates/`
3. `/site-quality-runbook/`
4. `QUALITY-STATUS.md`
5. `.github/pull_request_template.md`

## Page families

### Entry and routing

- `/`
- `/digital-health-command-center/`
- `/decision-navigator/`
- `/resource-library/`

### Decision support

- `/decision-navigator/`
- `/digital-health-readiness-assessment/`
- `/digital-health-operating-system/`
- `/executive-conversation-kit/`
- `/case-study-review-guide/`

### Proof and trust

- `/proof-room/`
- `/claims-registry/`
- `/medicine-support-hub/`
- `/quality-trust-audit/`

### Growth and conversion

- `/executive-brief/`
- `/recruiter-resources/`
- `/linkedin-content-engine/`
- `/outreach-command-system/`
- `/share/`
- `/contact/`

### Governance

- `/site-quality-gates/`
- `/site-quality-runbook/`
- `CONTRIBUTING.md`
- `README.md`
- `AI-NAVIGATION-GUIDE.md`
- `QUALITY-STATUS.md`

## Shared assets

### Core scripts

- `/assets/theme.js`
- `/assets/analytics.js`
- `/assets/site-enhancements.js`

### Routing and experience scripts

- `/assets/experience-router.js`
- `/assets/growth-navigation.js`
- `/assets/recruiter-assistant.js`
- `/assets/roadmap-integration.js`

### Decision-support scripts

- `/assets/decision-brief-bridge.js`
- `/assets/readiness-assessment.js`

## Decision context contract

The decision-support flow uses browser-local context.

Expected public functions:

- `window.saveHealthcareDecisionBrief(brief)`
- `window.readHealthcareDecisionBrief()`
- `window.clearHealthcareDecisionBrief()`

Expected fields:

- `initiative`
- `decision`
- `sponsor`
- `date`
- `situation`
- `risk`
- `evidence`

Rules:

1. Do not store sensitive health or patient details in the browser-local decision brief.
2. Keep the brief focused on leadership decision context.
3. The Readiness Assessment should still work if no brief exists.
4. The printable readiness report should include decision context when available.

## Quality gates

The repository currently uses:

- `.github/workflows/validate-site.yml`
- `.github/workflows/site-link-check.yml`
- `.github/workflows/site-quality.yml`
- `scripts/validate-site.py`
- `scripts/check_links.py`
- `scripts/healthcare_hub_maintenance.py`

Important checks:

- metadata presence
- one main H1 per page
- internal route existence
- sitemap coverage
- image alt text
- decision route continuity
- healthcare hub maintenance
- published site checks
- Lighthouse accessibility and SEO thresholds

## Engineering rules

1. Read existing files first.
2. Search for related functionality before adding code.
3. Prefer small changes over page rewrites.
4. Preserve existing scripts, analytics, routes and proof paths.
5. Update architecture or quality documentation when changing core flows.
6. Keep claims accurate and evidence-backed.

## Current architectural priority

The platform should become more useful by improving connected flows, validation and evidence quality, not by adding unnecessary pages.
