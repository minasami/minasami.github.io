# Technical Trust Roadmap

This roadmap translates technical maturity work into investor and partner trust.

## Purpose

Medicine Support Hub is now a GitHub-integrated, Vercel-hosted and Supabase-backed digital health platform. The next credibility step is not louder marketing. It is stronger assurance.

## Current trust signals

- Public production app: https://medicine-support-hub.vercel.app/
- Public GitHub repository: https://github.com/minasami/medicine-support-hub
- Supabase-backed database foundation
- Supabase project status observed as active and healthy
- Case-study proof system and claims boundaries on the career site

## Technical assurance priorities

### 1. Security advisor review

Review Supabase security advisor findings and decide which warnings should be remediated before pilots or external partners are invited.

Priority areas:

- callable SECURITY DEFINER functions
- authentication password protection settings
- exposed RPC boundaries

### 2. RLS and access policy performance

Review RLS policies that may re-evaluate auth functions row by row. Optimize policies where needed before scale testing.

Priority areas:

- pilot tables
- support request tables
- medicine request workflows
- profile and organization access rules

### 3. Index and query maturity

Do not remove indexes blindly. Use real traffic and query plans before deciding whether an index is unused or simply not exercised yet.

Priority areas:

- medicine search
- request status filtering
- organization and program filtering
- activity/event reporting

### 4. Deployment evidence

Keep the GitHub repository, Vercel deployment and Supabase architecture documented so reviewers can understand the delivery path.

### 5. Pilot readiness

Before any serious pilot, prepare:

- environment separation
- role-based test accounts
- seed data policy
- privacy and data handling notes
- issue escalation route
- backup and recovery notes
- basic monitoring checklist

## Public wording rule

Say:

> Medicine Support Hub is a GitHub-integrated, Vercel-hosted and Supabase-backed digital health platform with an active technical trust roadmap.

Do not say:

> Fully enterprise-grade, clinically validated, nationally deployed or production healthcare certified.

unless that evidence is added later.

## Decision rule

Trust is built by showing what is real, what is improving and what is not yet claimed.
