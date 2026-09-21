# VM Brothers Website Rebrand

## Summary

Transform the entire Olivia Harper website into an English-language VM Brothers real-estate website using the supplied research pack at `D:\Work\Website inspirations\VM Brothers\docs\VM_Brothers_Website_Research_Pack.docx` as the content source.

Keep the existing Gallient, F37 Bolton, and Garamond typography, colors, responsive layouts, animations, smooth scrolling, and preloader style. Remove all visible Olivia Harper, Miami, Florida, founder, project, contact, metadata, and legal references.

Before implementation, save this plan as:

`D:\Work\Website inspirations\VM Brothers\docs\branding_vmbrothers.md`

Update this file after each phase with completion status, checks performed, and outstanding client information.

## Implementation Progress

### Phase 1 — Complete (10 September 2026)

Completed:

- Added the typed VM Brothers content source with company, founder, navigation, provisional contact, social, service, workflow, value, FAQ, project, disclaimer, asset, verification, and publication data.
- Rebranded the shared header, mobile navigation, footer, social links, preloader, not-found messaging, metadata, Open Graph fields, sitemap, and robots output.
- Added temporary typography-based VM Brothers wordmark and monogram components.
- Added a generated VM favicon route and moved the former Olivia favicon to `scratch/retired-olivia-favicon.ico` for recoverability.
- Renamed the package from `olivia_react` to `vm-brothers-website`.
- Preserved the existing font families, color tokens, animations, smooth scrolling, and every-refresh preloader behavior.

Validation completed:

- ESLint passed.
- TypeScript `--noEmit` passed.
- Next.js 16.3.2 production build passed and generated all 22 current routes plus the new `/icon` route.
- Rendered home-page output returned HTTP 200 and contained the VM Brothers global identity, provisional Indian phone number, Surat address, social links, metadata, and generated favicon.
- The rendered global shell contained no former U.S. phone number or Olivia Harper domain.

Deferred to Phase 2:

- Interior page copy and existing project-detail routes still contain Olivia/Miami content until the planned page migration.
- Navigation temporarily targets the existing `/homes-projects` and `/vision` routes while displaying the final “Projects” and “How We Work” labels; Phase 2 will introduce `/projects` and `/how-we-work` and add permanent redirects.
- Old project URLs have been removed from the sitemap but remain directly accessible until Phase 2 replaces the project data and routes.

Outstanding client items remain unchanged: final domain, official logo/favicon, founder portrait, original project photography, official email, business hours, Maps link, legal entity and registration details, project roles, RERA information, current inventory, and approved pricing.

## Implementation Phases

### Phase 1 — Content foundation and global branding

- Create a typed VM Brothers content source containing company details, navigation, services, workflow, founder information, FAQs, contact information, projects, asset references, verification status, and publication flags.
- Use three fact states: `verified`, `provisional`, and `client-confirmation-required`.
- Render only fields explicitly marked for publication.
- Use “VM Brothers” as a typography-based temporary wordmark and “VM” monogram; remove all Olivia logos and favicons.
- Change the preloader title to “VM Brothers” while preserving its current animation and every-refresh behavior.
- Rebrand the header, footer, mobile menu, 404 page, metadata, Open Graph data, sitemap, robots file, copyright, alt text, and structured content.
- Keep the existing visual tokens:
  - Dark: `#1A1A1A`
  - Primary: `#313131`
  - Accent: `#B6AB99`
  - Cream: `#EEEBE4`
  - Background: `#F5F5F5`

### Phase 2 — Routes and page content

Use this public structure:

- `/` — Home
- `/projects` — Project portfolio
- `/projects/[slug]` — Project details
- `/services` — Services
- `/about-us` — Company and founder
- `/how-we-work` — Verified operating process and values
- `/contact` — Enquiry and site-visit form
- Existing legal and accessibility pages

Add permanent redirects:

- `/homes-projects` → `/projects`
- `/vision` → `/how-we-work`
- Every old Miami project slug → `/projects`

Rebuild the pages as follows:

- Home: VM Brothers hero, company introduction, featured projects, services, step-by-step property journey, Surat service areas, Founder and CEO section, FAQs, and site-visit CTA.
- About: verified company positioning, Varshil Patel as Founder and CEO, conservative leadership copy, values, and relationship-focused CTA. Do not show an unrelated founder portrait.
- Services: residential property, commercial opportunities, buying/selling/renting, project discovery and site visits, market and pricing guidance, booking/documentation support, and land/plot enquiries.
- How We Work: discovery, requirement assessment, shortlisting, site visit, pricing guidance, booking/documentation, and applicable after-sales support.
- Projects: publish Sahjanand Bunglows & Row House, Shubh Aangan, Vinayak Villa, and Aarna Heights using only the safe copy from the research pack.
- Keep the unnamed “2 Balcony Luxury Villa” project hidden until its formal name and project details are supplied.
- Do not publish prices, availability, possession dates, RERA numbers, developer badges, exclusivity claims, or historical metrics.
- Show “Contact for current pricing and availability” and the global project-information disclaimer.
- Add the research-pack FAQ content, excluding the developer-role question until those relationships are confirmed.

### Phase 3 — Contact, legal, and SEO conversion

- Display `+91 74338 61000` as the provisional phone and WhatsApp number.
- Display the Masma-Orma address as a provisional Surat contact location with “Please call before visiting”; do not describe it as a registered or head office.
- Use the pack’s Instagram and Facebook identities.
- Hide email, business hours, LinkedIn, Google Maps, and other missing contact fields until confirmed.
- Replace the contact form with:
  - Full name — required
  - Indian phone number — required
  - Email — optional
  - Inquiry type — Buy, Sell, Rent, Site Visit, Commercial, Land/Plot, General
  - Property type — Villa/Row House, Apartment/Flat, Shop/Commercial, Land/Plot, Other
  - Preferred location
  - Budget — Under ₹25 lakh, ₹25–40 lakh, ₹40–75 lakh, ₹75 lakh–₹1 crore, ₹1 crore+, Not decided
  - Message
  - Privacy consent — required
  - Hidden spam honeypot
- Update `POST /api/contact` to validate the new payload, accept optional email, require a valid Indian phone number, retain webhook delivery, and direct failures to the provisional phone/WhatsApp.
- Remove U.S./Florida legal references. Rebrand privacy, cookies, terms, and accessibility copy for VM Brothers and India, with an internal legal-review flag.
- State that prices, offers, inventory, and specifications may change and must be confirmed directly.
- Replace the hard-coded Olivia domain with `NEXT_PUBLIC_SITE_URL`; use localhost during development and require the final domain before deployment.
- Do not emit unconfirmed addresses, registration numbers, project roles, or email addresses in structured metadata.

### Phase 4 — Temporary and final visual assets

- Temporarily reuse selected existing architectural photos and the hero video as presentation imagery, as requested.
- Never reuse Olivia logos, old founder portraits, the alumni graphic, or Miami-address-specific captions.
- Mark temporary project imagery in the content model and display a discreet “Representative imagery” label wherever it could otherwise be mistaken for the named Surat project.
- Hide project galleries until approved project photography is supplied.
- Centralize all temporary image references so they can be replaced without editing page components.
- When client assets arrive, add:
  - VM Brothers logo, monogram, and favicon
  - Hero image or video
  - Varshil Patel portrait
  - Company/team imagery
  - Hero and gallery images for each project
  - Approved brochures, project logos, and RERA details
- Remove every representative-image label once the corresponding approved assets are installed.

### Phase 5 — Verification and handoff

- Run ESLint, TypeScript checking, and the Next.js production build after each phase.
- Test the contact API for valid submissions, invalid phone/email, missing consent, honeypot submissions, missing webhook configuration, and webhook failure.
- Verify all new routes, permanent redirects, project generation, sitemap entries, canonical metadata, phone links, and WhatsApp links.
- Review desktop, tablet, and mobile layouts, including navigation, project cards, forms, animations, reduced-motion behavior, and overflow.
- Search application code and rendered pages for Olivia Harper, Miami, Florida, old founders, old project names, U.S. phone numbers, addresses, emails, and Bangluxor attribution.
- Confirm that no unapproved price, metric, developer claim, or legal identity is publicly rendered.
- Record phase completion and unresolved client items in this implementation-plan document.

## Interfaces and Data Changes

- Replace the existing Olivia project JSON with a typed VM Brothers content model.
- Add verification and publication metadata to sensitive company and project fields.
- Change the contact API payload from the current U.S. investment form to the buyer-focused Indian property enquiry structure described above.
- Preserve the existing webhook environment variable, but document the new payload for whoever owns the webhook.
- Add `NEXT_PUBLIC_SITE_URL` as a required production environment variable.
- No database or CMS will be introduced in this rebrand; the typed content file remains the single source of truth.

## Final Implementation Update

### Phase 2 — Complete (11 September 2026)

Completed:

- Rebuilt the home, about, services, projects, project-detail, and how-we-work pages with VM Brothers content.
- Added the final `/projects` and `/how-we-work` routes.
- Added permanent redirects for `/homes-projects`, `/vision`, and all six former Miami project slugs.
- Published the four approved projects and kept the unnamed villa project unpublished.
- Removed project galleries, unverified pricing, possession dates, RERA details, historical metrics, and universal developer claims.
- Added the Surat service-area section, six-step operating process, FAQs, values, and site-visit calls to action.

### Phase 3 — Complete in Code (11 September 2026)

Completed:

- Added the provisional Indian phone, WhatsApp, and contact location with the required call-before-visiting note.
- Rebuilt the property enquiry form with the planned fields, Indian phone validation, optional email, required consent, and spam honeypot.
- Updated `POST /api/contact` for the new payload and retained `CONTACT_FORM_WEBHOOK_URL` delivery.
- Replaced all four legal and accessibility pages with VM Brothers/India-oriented copy.
- Added route-specific canonical metadata, environment-based site URLs, project sitemap entries, and updated robots output.

Deployment dependency:

- The enquiry endpoint intentionally returns a clear `503` call/WhatsApp fallback until `CONTACT_FORM_WEBHOOK_URL` is configured. No enquiry data is logged or falsely reported as delivered.
- Legal copy requires client/legal review before production publication.

### Phase 4 — Complete for Temporary Assets (11 September 2026)

Completed:

- Centralized every temporary image and video path in `data/siteContent.ts`.
- Marked all temporary project and page imagery as representative wherever it could be mistaken for a named Surat property.
- Replaced the former logo, favicon, portraits, and alumni graphic with the temporary VM wordmark/monogram system or safe presentation imagery.
- Fixed three nonexistent asset paths that caused broken-image/white placeholder areas.
- Confirmed that every asset referenced by the content model exists.

Final VM logo, founder portrait, project photography, project logos, approved brochures, and RERA materials remain client-supplied asset replacements.

### Phase 5 — Complete (11 September 2026)

Validation completed:

- ESLint passed.
- TypeScript `--noEmit` passed.
- Next.js 16.3.2 production build passed; 20 static/generated routes and the contact API were produced.
- All public pages returned HTTP 200.
- The four VM project detail routes were statically generated and included in the sitemap.
- All eight legacy route checks returned HTTP 308 with the planned destinations.
- Canonical URLs, phone links, WhatsApp links, sitemap entries, and robots output were verified from rendered production pages.
- Contact API checks passed for valid webhook delivery, invalid phone, invalid optional email, missing consent, honeypot submission, missing webhook configuration, and webhook failure.
- Desktop, 900 px tablet, and 500 px mobile renders were reviewed; navigation, page heroes, project cards, responsive wrapping, representative-image labels, and overflow were verified.
- Reduced-motion handling remains active for the preloader, global CSS animation durations, and slideshow behavior.
- Application code and rendered pages contain no visible Olivia Harper, former founder, Miami Beach, South Florida, legacy domain, U.S. phone, or Bangluxor attribution.
- No missing asset, unapproved price, historical metric, possession claim, RERA number, or universal developer/exclusivity claim is publicly rendered.
- The VM Brothers preloader remains session-independent and runs on every full home-page refresh, including after a refresh returns the visitor to the home page.

## Assumptions and Client-Update Flags

- English only for the first release.
- VM Brothers is positioned as a Surat real-estate company, property advisory, and project-sales partner—not universally as the legal developer.
- Varshil Patel may be named Founder and CEO; no co-founder will be invented.
- The phone, WhatsApp number, and Masma-Orma address are provisional.
- The final domain, legal entity name, registration details, official email, working hours, Maps link, project relationships, current inventory, prices, RERA details, founder biography, statistics, testimonials, and original imagery remain flagged for client confirmation.
- Current photos are temporary presentation assets only and will not be presented as factual images of VM Brothers’ Surat projects.
