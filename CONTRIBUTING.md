# Contributing to Mina Tawfik's Career Platform

This repository is not just a personal website. It is a digital-health career platform with a clear operating model.

## Core principle

Every change should improve at least one of these outcomes:

1. Make Mina's positioning clearer.
2. Make evidence easier to verify.
3. Help the right audience find the right route.
4. Convert attention into serious conversations.
5. Improve growth, outreach, or site governance.

## Main page families

### Entry and navigation

- `/digital-health-command-center/` — default starting point.
- `/resource-library/` — role-based navigation.
- `/site-growth-control-center/` — weekly growth rhythm.

### Trust and proof

- `/proof-room/` — evidence paths.
- `/claims-registry/` — approved wording and claim boundaries.
- `/quality-trust-audit/` — quality and trust audit.
- `/site-quality-gates/` — automated quality checks.
- `/site-quality-runbook/` — operating standard for future changes.

### Conversion

- `/executive-brief/` — fast recruiter and executive profile.
- `/executive-conversation-kit/` — structured conversation path.
- `/contact/` — direct contact.

### Growth and distribution

- `/linkedin-content-engine/` — content plan.
- `/outreach-command-system/` — direct outreach system.
- `/share/` — share-ready links and copy.
- `/career-intelligence-dashboard/` — opportunity routing.

### Digital health authority

- `/digital-health-operating-system/` — operating model.
- `/digital-health-readiness-assessment/` — interactive readiness diagnostic.
- `/ceo-digital-health-advisory/` — executive advisory route.
- `/insights/` — thought leadership hub.

## Before adding a new page

Ask:

- Who is the page for?
- What is the one job of the page?
- What proof does it connect to?
- What is the next action?
- Could an existing page be improved instead?

## Validation

Run the validator before treating a change as complete:

```bash
python scripts/validate-site.py
```

The GitHub Actions workflow also runs validation on pull requests and pushes to `master`.

## Claim discipline

Use the Claims Registry and Proof Room when changing public wording. Keep credential status, role scope, and project scope accurate.

## Navigation discipline

Do not send every visitor everywhere. Route by audience:

- General audience: Command Center.
- Recruiter: Executive Brief, then Proof Room.
- CEO or founder: CEO Advisory, then Readiness Assessment.
- PMO leader: Operating System, then PMO KPI article.
- Skeptical reviewer: Proof Room and Claims Registry.
- Mina's weekly execution: Site Growth Control Center.
