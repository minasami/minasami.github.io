# Event Taxonomy

Last reviewed: 2026-07-07

## Purpose

Track useful visitor actions without collecting sensitive information. Analytics should measure whether the platform helps people navigate, verify proof and start serious conversations.

## Privacy rule

Do not send personal health information, patient details, private document text or full decision-brief content to analytics. Events should use route, action and non-sensitive category fields only.

## Core event families

### Decision support

- `decision_brief_generate` — visitor generates a Decision Brief.
- `decision_brief_print` — visitor prints or saves the Decision Brief.
- `readiness_assessment_update` — visitor adjusts the readiness diagnostic.
- `readiness_report_print` — visitor prints or saves the Executive Readiness Brief.

### Proof and trust

- `open_medicine_support_hub` — visitor opens the Medicine Support Hub case or live product route.
- `view_projects` — visitor opens projects or project sections.
- `view_research` — visitor opens research content.
- `view_publications` — visitor opens publication or insight content.
- `view_experience` — visitor opens experience content.

### Contact and conversion

- `click_email` — visitor clicks an email link.
- `book_meeting` — visitor clicks a meeting-oriented email link.
- `click_whatsapp` — visitor clicks a WhatsApp link.
- `visit_linkedin` — visitor opens LinkedIn.
- `visit_github` — visitor opens GitHub.
- `download_cv` — visitor downloads or opens a CV file.

## Usefulness metrics

Review these signals together rather than optimizing a single metric:

1. Decision Brief generation.
2. Readiness report print/save actions.
3. Proof Room and Medicine Support Hub visits.
4. Contact clicks after proof or assessment routes.
5. Recruiter and executive route usage.

## Engineering rule

When adding a new event, document it here and confirm it does not send sensitive or unnecessary text.
