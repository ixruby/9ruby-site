# 9Ruby Single Source Strategy

Date: 2026-05-10

## Decision

`C:/Users/mrvis/Projects/9ruby-home` is the single source of truth for the public `9ruby.com` website.

This site is the public front door for 9Ruby as an agency and company. Clients, prospects, search visitors, and tool users should land here to understand services, pricing, templates, tools, products, and the public ecosystem.

## Public Positioning

9Ruby is a front-facing agency and product ecosystem.

The site should feel like a company website with useful products, not a private project archive. Public pages should explain what a visitor can buy, use, download, request, or learn.

## Include

- Agency services: AI agents, websites, voice systems, automation, SEO, design, apps, dashboards, and support.
- Free tools: SEO checker, QR generator, JSON formatter, meta generator, color palette, and future lightweight utilities.
- Templates: free starter templates, paid premium templates, Framer-style website kits, v0 template intake results, and reusable client-ready assets.
- Products: 9Ruby AI, Nine Builder, Domains, Voice Agents, Templates, Tools, Apps, and selected public ecosystem entries.
- Proof: polished case studies, public demos, anonymized outcomes, and client-safe results.
- Pricing: clear service packages, template pricing, tool access tiers, and custom quote paths.
- Lead capture: contact, quote, domain quote, AI start links, template CTAs, and service request paths.

## Exclude

- Private client files, internal notes, raw worklogs, credentials, tokens, private dashboards, and unfinished operational systems.
- Internal agent infrastructure unless it is packaged as a public product benefit.
- Experimental websites that create brand confusion unless they are migrated into a product, template, tool, or case-study page.
- Multiple competing `9ruby.com` homepages.

## Consolidation Rules

- `9ruby.com` and `www.9ruby.com` point to this repo and this public website.
- Subdomains can exist, but the main site must explain them and route users clearly.
- Every old 9Ruby or IX Ruby variation should become one of:
  - A public service page.
  - A product page.
  - A free or paid template.
  - A free tool.
  - A paid tool.
  - A case study.
  - An internal/private archive.
- Do not copy private/internal UI directly into public pages. Convert it into client-facing language and offers.

## Free vs Paid Rules

Free:
- Small utilities that create trust and traffic.
- Starter templates that advertise quality.
- Educational docs and guides.
- Public demos that do not require private data.

Paid:
- Done-for-you services.
- Premium templates and full website kits.
- AI agents, voice agents, automation setup, dashboards, and integrations.
- Business operations setup, domain services, SEO packages, and custom software.
- Anything requiring support, hosting, ongoing maintenance, or private client implementation.

## Open Inventory Questions

Use these when reviewing older projects and domains:

1. Is this public-facing, client-safe, and useful to a visitor?
2. Is it a service, tool, template, product, case study, or private archive?
3. Should it be free, paid, lead-capture, or internal-only?
4. Does it strengthen the 9Ruby agency story?
5. Does it confuse the brand if left on a separate domain?
6. Can the feature be represented as a page first before deeper integration?

## Current Known Inputs

- `C:/Users/mrvis/Projects/9ruby-home`: live public website source.
- `C:/Users/mrvis/Projects/9ruby-core`: older non-live 9Ruby core prototype.
- `C:/Users/mrvis/Projects/ix-ruby-agency`: older agency site source.
- `C:/Users/mrvis/Projects/ix-ruby-premium`: premium IX Ruby layer.
- `C:/Users/mrvis/Projects/kimi-9ruby-v0`: 9Ruby AI product.
- `C:/Users/mrvis/Projects/nine-builder`: builder product.
- `C:/Users/mrvis/Projects/framer-template-vault`: template catalog source.
- `C:/Users/mrvis/OneDrive/Documents/New project/v0-template-library`: v0 template intake source.
- `C:/Users/mrvis/Projects/cpanel`: internal control panel.
- `C:/Users/mrvis/Projects/platform`: internal RUBY platform/runtime.

## Immediate Next Build Order

1. Fix health: lint errors, middleware-to-proxy warning, and source-of-truth registry drift.
2. Create a public ecosystem inventory page or data file.
3. Review old 9Ruby/IX Ruby domains and assign each to service, tool, template, product, case study, or archive.
4. Expand Templates into free and paid sections.
5. Expand Tools into free utilities and paid setup services.
6. Add pricing/package structure for agency services.
7. Add redirects or clear links from confusing older domains after approval.
