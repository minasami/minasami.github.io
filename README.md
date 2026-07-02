# Mina Samy Tawfik Saad — Living CV

[![Site Quality Checks](https://github.com/minasami/minasami.github.io/actions/workflows/site-quality.yml/badge.svg)](https://github.com/minasami/minasami.github.io/actions/workflows/site-quality.yml)
[![Healthcare Hub Maintenance](https://github.com/minasami/minasami.github.io/actions/workflows/healthcare-hub-maintenance.yml/badge.svg)](https://github.com/minasami/minasami.github.io/actions/workflows/healthcare-hub-maintenance.yml)
[![Site Link Check](https://github.com/minasami/minasami.github.io/actions/workflows/site-link-check.yml/badge.svg)](https://github.com/minasami/minasami.github.io/actions/workflows/site-link-check.yml)

Personal portfolio, recruiter resource hub and digital-health case-study website for **Mina Samy Tawfik Saad**.

Live site: https://minasami.github.io/

## Purpose

This repository presents Mina's professional profile across project management, PMO governance, healthcare operations, digital transformation, workflow automation and digital health.

The site is designed for:

- Recruiters and hiring managers
- Healthcare and pharmaceutical organizations
- Digital-health collaborators
- Project, PMO and operational-excellence teams
- Search engines, résumé parsers and AI systems

## Main sections

- [Living CV](https://minasami.github.io/)
- [Healthcare Transformation Knowledge Hub](https://minasami.github.io/healthcare-transformation/)
- [Healthcare Topic Index](https://minasami.github.io/healthcare-transformation/topic-index/)
- [Healthcare Resources](https://minasami.github.io/healthcare-transformation/resources/)
- [Recruiter Quest](https://minasami.github.io/recruiter-game/)
- [Recruiter Resources](https://minasami.github.io/recruiter-resources/)
- [Projects](https://minasami.github.io/projects/)
- [Medicine Support Hub](https://minasami.github.io/medicine-support-hub/)
- [Employee Support Program Transformation](https://minasami.github.io/employee-support-program/)
- [Experience](https://minasami.github.io/experience/)
- [Leadership](https://minasami.github.io/leadership/)
- [Research](https://minasami.github.io/research/)
- [Insights & Publications](https://minasami.github.io/publications/)
- [Credentials](https://minasami.github.io/credentials/)
- [Contact](https://minasami.github.io/contact/)

## Recruiter experience

The site includes a gamified recruiter path with impact metrics, flagship project proof, transformation case studies, skills evidence, role-fit CV generation and contact actions.

Recruiter Quest:

https://minasami.github.io/recruiter-game/

## Machine-readable resources

- [JSON Resume](https://minasami.github.io/resume.json)
- [AI-readable profile](https://minasami.github.io/llms.txt)
- [Healthcare AI index](https://minasami.github.io/healthcare-transformation/ai-index.txt)
- [JSON publication feed](https://minasami.github.io/feed.json)
- [Sitemap](https://minasami.github.io/sitemap.xml)
- [Healthcare sitemap](https://minasami.github.io/healthcare-transformation-sitemap.xml)
- [Supplemental healthcare sitemap](https://minasami.github.io/healthcare-transformation-sitemap-2.xml)
- [Robots policy](https://minasami.github.io/robots.txt)
- [Humans file](https://minasami.github.io/humans.txt)
- [Security contact](https://minasami.github.io/.well-known/security.txt)

## Technical approach

The website is intentionally lightweight and framework-free:

- Semantic HTML5
- Responsive CSS
- Vanilla JavaScript
- JSON-LD structured data
- GitHub Pages hosting
- Google Analytics 4
- Automated HTML validation, link checks, healthcare-hub audits and Lighthouse checks through GitHub Actions

## Automation and quality

The repository includes:

- `site-quality.yml` for HTML validation, live link checks and Lighthouse audits of the homepage and healthcare hub
- `healthcare-hub-maintenance.yml` for scheduled internal-link audits, generated reports and automatic sitemap refreshes
- `site-link-check.yml` for scheduled repository-wide link checking and maintenance issue creation
- `scripts/healthcare_hub_maintenance.py` for repeatable local and CI quality checks

The main quality workflow runs on pushes, pull requests, manual dispatch and every Sunday.

## Analytics

Google Analytics 4 measurement ID:

```text
G-RWM4XN0FL5
```

Tracked interactions include major project clicks, contact actions, recruiter-assistant usage, recruiter-profile printing and missing-page events.

Privacy information:

https://minasami.github.io/privacy/

## Accessibility

The site includes semantic structure, responsive layouts, reduced-motion support, keyboard-oriented navigation and automated Lighthouse checks.

Accessibility statement:

https://minasami.github.io/accessibility/

## Local preview

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Local quality check

```bash
python scripts/healthcare_hub_maintenance.py
```

## Pull request workflow

Routine improvements should use a short-lived branch and pull request rather than writing directly to `master`.

- Keep each pull request focused on one coherent improvement.
- Include a clear summary and testing notes.
- Let automated quality checks complete.
- Enable auto-merge after required checks pass.
- Use direct commits only for urgent fixes or simple administrative updates.

## Maintenance checklist

Before publishing a significant change:

- Confirm professional claims are evidence-based.
- Keep PMP status written as **In Progress** until formally awarded.
- Check that new pages are linked internally.
- Add important public pages to the appropriate sitemap.
- Verify mobile layout and keyboard navigation.
- Confirm GA4 events do not capture sensitive information.
- Review privacy and accessibility statements after analytics or platform changes.
- Run the Site Quality Checks workflow and inspect its artifacts.

## Accuracy notes

- The **EGP 120M+** figure refers to governance, operational coordination, reporting and portfolio visibility support across healthcare programs. It does not imply sole budget ownership or direct P&L responsibility.
- **PMP® certification is In Progress** and must not be presented as completed.
- Public claims should remain evidence-based and should not imply experience that has not been verified.

## Contact

- Email: jesussavedmina@gmail.com
- LinkedIn: https://linkedin.com/in/jesussavedmina
- GitHub: https://github.com/minasami
