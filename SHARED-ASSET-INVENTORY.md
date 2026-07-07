# Shared Asset Inventory

Last reviewed: 2026-07-07

## Purpose

Keep shared CSS and JavaScript understandable as the platform grows. This inventory helps future changes avoid duplicate scripts, broken route behavior and unnecessary rewrites.

## Core platform assets

| Asset | Role | Change rule |
| --- | --- | --- |
| `/assets/main.css` | Global visual system and page layout primitives. | Avoid page-specific hacks here unless the pattern is reusable. |
| `/assets/site-enhancements.css` | Shared enhancement styles. | Keep compatible with existing pages before adding new utility classes. |
| `/assets/theme.js` | Theme switching and persistence. | Preserve existing theme behavior. |
| `/assets/analytics.js` | Shared non-sensitive event tracking. | Document new events in `EVENT-TAXONOMY.md` before implementation. |
| `/assets/site-enhancements.js` | Shared page enhancements. | Check for existing behavior before adding another page-level script. |

## Routing and experience assets

| Asset | Role | Change rule |
| --- | --- | --- |
| `/assets/experience-router.js` | Routes visitors toward relevant experience paths. | Preserve existing route recommendations unless intentionally updating journey logic. |
| `/assets/growth-navigation.js` | Supports growth and navigation pathways. | Keep aligned with the architecture map. |
| `/assets/recruiter-assistant.js` | Supports recruiter-oriented interactions. | Do not mix recruiter logic with decision-maker logic unless the route requires it. |
| `/assets/roadmap-integration.js` | Connects roadmap or next-step interactions. | Confirm affected pages before editing. |

## Decision-support assets

| Asset | Role | Change rule |
| --- | --- | --- |
| `/assets/decision-brief-bridge.js` | Stores and reads local Decision Brief context. | Do not store sensitive health or patient details. Preserve the public functions documented in `ARCHITECTURE.md`. |
| `/assets/readiness-assessment.js` | Powers the Readiness Assessment and printable Executive Readiness Brief. | Keep the assessment usable even when no Decision Brief exists. |
| `/assets/readiness-assessment.css` | Styles the Readiness Assessment experience. | Keep print and mobile use readable. |

## Proof and trust assets

| Asset | Role | Change rule |
| --- | --- | --- |
| `/assets/case-study-proof-router.js` | Connects case-study pages to proof routes. | Preserve proof paths and claim-safety routes. |
| `/assets/medicine-support-hub-deployment.js` | Supports Medicine Support Hub deployment messaging. | Keep deployment claims current and evidence-backed. |

## Learning and engagement assets

| Asset | Role | Change rule |
| --- | --- | --- |
| `/assets/learning-quest.js` | Supports learning or guided exploration interactions. | Keep optional; pages should remain useful without it. |
| `/assets/knowledge-check.js` | Supports knowledge-check interactions. | Avoid collecting sensitive answers. |

## Engineering rules

1. Search this inventory before adding a new shared asset.
2. Prefer extending an existing shared asset when the behavior already belongs there.
3. Prefer page-specific scripts when behavior is truly page-specific.
4. Keep decision-support, recruiter and proof logic separated unless there is a clear shared contract.
5. Update this inventory when adding, removing or changing a shared asset.
