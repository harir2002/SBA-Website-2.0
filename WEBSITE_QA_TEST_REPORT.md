# SBA Website QA Test Report

## Test Run Summary

| Field | Value |
|---|---|
| Date and time | 2026-09-08 ~10:55 IST |
| Branch/commit | `main` / `b63e96f` |
| Framework | React 19 + Vite 8 + React Router 7 + Tailwind CSS 4 |
| Package manager | npm (`package-lock.json` present) |
| Test environment | Local codebase inspection + `npm run build` |
| Browser automation | Not available (no Playwright/Cypress; no MCP browser tools in this run) |
| Overall result | FAIL |
| Release recommendation | READY WITH MINOR FIXES |

## Executive Summary

- Total test cases: **148**
- PASS: **71**
- FAIL: **16**
- BLOCKED: **8**
- NOT TESTED: **53**
- Critical issues: **0**
- High issues: **4**
- Short factual summary of readiness: Production **build succeeds**. Router and content sources for core, industries, solutions, careers, and insights are present and internally consistent. **No browser/visual/responsive run was executed**, so those suites are NOT TESTED. Confirmed high defects: SPA catch-all treats unknown URLs as Home; header Search submits nothing; contact/careers success copy claims delivery/receipt while backends are stubs; contact enquiry logs PII to `console.info`.

## Commands and Results

| Command | Purpose | Exit Code | Status | Key Output |
|---|---|---:|---|---|
| `npm run build` | Production Vite build | 0 | PASS | Built in 17.34s. Chunk `index-CAg202AT.js` 912 kB (warning: >500 kB). No compile errors. |
| `npm run lint` | Lint | — | NOT TESTED | Script does not exist in `package.json`. |
| `npm run typecheck` | TypeScript check | — | NOT TESTED | Project is JS (`src/**/*.jsx`); no typecheck script. |
| `npm test` / `npm run test:e2e` | Unit / E2E | — | NOT TESTED | No test runner or e2e scripts in `package.json`. |

## Route Inventory

Evidence: `src/App.jsx` plus `jobs.js`, `insights/content.js`, `industriesContent.js`, `data/solutions/index.js`. Client render/console/images in a live browser: **NOT TESTED**.

| Route | Page Type | Loads | Main CTA | Images | Console | Status | Notes |
|---|---|---|---|---|---|---|---|
| `/` | Home | Code: HomeV2 | Header Let’s Connect; hero Explore… | Code: capability + insight assets | NOT TESTED | PASS | Router maps to `HomeV2`. Title set in `useEffect`, not `usePageMeta`. |
| `/home-v2` | Home alias | Code: HomeV2 | Same | Same | NOT TESTED | PASS | Duplicate of `/`. |
| `/about` | About | Code: AboutPage | Let’s Connect | Code: leadership photos | NOT TESTED | PASS | Title in `useEffect` only. |
| `/contact` | Contact | Code: ContactPage | Let’s Connect → `#enquiry` | Hero motion | NOT TESTED | PASS | Footer `hideContactForm`. |
| `/careers` | Careers | Code: CareersPage | View Open Roles / Life at SBA | careers-hero + life-at-sba imports | NOT TESTED | PASS | Meta via `usePageMeta`. |
| `/insights` | Insights (blogs) | Code: InsightsPage | Topic filters | insights-hero + thumbs | NOT TESTED | PASS | `getPublishedBlogs()` only. |
| `/case-studies` | Case studies | Code: CaseStudiesPage | Industry filters | case-studies-hero | NOT TESTED | PASS | Case studies only. |
| `/industries` | Industries overview | Code: IndustriesOverviewPage | Let’s Connect | public industry PNGs | NOT TESTED | PASS | |
| `/industries/bfsi` | Industry | Code: getIndustryBySlug | Let’s Connect `#contact` | `/images/industries/bfsi-hero.png` exists | NOT TESTED | PASS | |
| `/industries/manufacturing` | Industry | Code | Let’s Connect | manufacturing-hero.png exists | NOT TESTED | PASS | |
| `/industries/it-ites` | Industry | Code | Let’s Connect | it-ites-hero.png exists | NOT TESTED | PASS | |
| `/industries/diversified-enterprises` | Industry | Code | Let’s Connect | diversified-enterprises-hero.png exists | NOT TESTED | PASS | |
| `/industries/unknown` | Industry 404 UI | Code: “Industry not found” | Back to Industries | n/a | NOT TESTED | PASS | Dedicated not-found UI (not Home). |
| `/solutions/modernize-the-core` | Solution | Code: getSolutionBySlug | Let’s Connect `#contact` | imported hero PNG | NOT TESTED | PASS | SEO title/description in data. |
| `/solutions/protect-and-recover` | Solution | Code | Let’s Connect | imported hero | NOT TESTED | PASS | |
| `/solutions/make-data-actionable` | Solution | Code | Let’s Connect | imported hero | NOT TESTED | PASS | |
| `/solutions/build-and-connect` | Solution | Code | Let’s Connect | imported hero | NOT TESTED | PASS | |
| `/solutions/operate-with-assurance` | Solution | Code | Let’s Connect | imported hero | NOT TESTED | PASS | |
| `/solutions/accelerate-business-ai` | Solution | Code | Let’s Connect | imported hero | NOT TESTED | PASS | |
| `/solutions/unknown` | Solution 404 UI | Code: “Solution not found” | Back to Home | n/a | NOT TESTED | PASS | |
| `/careers/technical-support-engineer-security-av` | Job | Code: getJobBySlug | href `#apply` | n/a | NOT TESTED | PASS | |
| `/careers/technical-support-engineer-data-center` | Job | Code | `#apply` | n/a | NOT TESTED | PASS | |
| `/careers/technical-support-engineer-desktop-support` | Job | Code | `#apply` | n/a | NOT TESTED | PASS | |
| `/careers/accounts-assistant` | Job | Code | `#apply` | n/a | NOT TESTED | PASS | |
| `/careers/software-engineer-intern` | Job | Code | `#apply` | n/a | NOT TESTED | PASS | |
| `/insights/air-gapped-openshift-for-ai` | Insight detail | Code | Talk to an expert | thumbnail/hero mapped | NOT TESTED | PASS | |
| `/insights/one-pane-of-glass-unified-observability` | Insight detail | Code | Talk to an expert | mapped | NOT TESTED | PASS | |
| `/insights/detect-early-recover-clean` | Insight detail | Code | Talk to an expert | mapped | NOT TESTED | PASS | |
| `/insights/one-platform-three-workloads` | Insight detail | Code | Talk to an expert | mapped | NOT TESTED | PASS | |
| `/insights/two-employee-types-one-login` | Blog detail | Code | Get in touch | insights-hero asset | NOT TESTED | PASS | |
| `/insights/why-every-enterprise-deploying-ai-needs-a-red-team` | Blog detail | Code | Get in touch | ai-automation.png | NOT TESTED | PASS | |
| `/insights/shadow-ai-invisible-risk` | Blog detail | Code | Get in touch | data-analytics.png | NOT TESTED | PASS | |
| Unknown path e.g. `/this-page-does-not-exist` | Catch-all | Code: HomeV2 | Home CTAs | Home | NOT TESTED | FAIL | `path="*"` renders Home. No HTTP 404 page. Deep-link reload depends on host SPA fallback — NOT TESTED. |

## CTA and Navigation Audit

| ID | Source Route | Element Label | Type | Intended Destination | Actual Result | Status | Severity | Notes |
|---|---|---|---|---|---|---|---|---|
| C01 | Global | Logo | internal | `/` | `<a href="/">` in Header | PASS | — | Code inspection. |
| C02 | Global | About | internal | `/about` | Header link | PASS | — | |
| C03 | Global | Solutions dropdown | internal | six `/solutions/...` paths | Header `CAPABILITIES` | PASS | — | |
| C04 | Global | Industries dropdown | internal | `/industries` + 4 sectors | `INDUSTRY_NAV` | PASS | — | Order: Overview, BFSI, IT/ITES, Manufacturing, Diversified Enterprises. |
| C05 | Global | Insights dropdown | internal | `/case-studies`, `/insights` | `INSIGHTS_MENU` | PASS | — | |
| C06 | Global | Careers | internal | `/careers` | Header | PASS | — | |
| C07 | Global | Contact | internal | `/contact` | Header | PASS | — | |
| C08 | Global | Let’s Connect | scroll/nav | `#contact` or `/contact` then form | `scrollToContactForm()` | PASS | — | Contact page uses `#enquiry`. Click in browser NOT TESTED. |
| C09 | Global | Search | search | none | `handleSearch` preventDefault, no navigate | FAIL | HIGH | Icon opens field; submit does not search. |
| C10 | Home | Join the SBA Team | internal | `/careers` | `CareersBanner` Link | PASS | — | |
| C11 | Home | Insight cards | internal | `/insights/[slug]` | `getPublishedInsights()` | PASS | — | Not generic topic cards. |
| C12 | Home | View All Insights → | internal | `/insights` | Link | PASS | — | |
| C13 | Solution heroes | Schedule an Architecture Review (etc.) | CTA | form anchors | **Not in data** | FAIL | MEDIUM | All six solutions use primary CTA **Let’s Connect** → `#contact`. Spec labels not implemented. |
| C14 | Solution heroes | Download … Brief | download | file | `secondaryCta: null` | PASS | — | No deceptive download CTA. |
| C15 | Industry detail | LET’S CONNECT | hash | `#contact` | `primaryCta`; `secondaryCta` null on detail heroes | PASS | — | Code. Scroll NOT TESTED. |
| C16 | Careers hero | View Open Roles | anchor | `#open-roles` | `scrollToSection` | PASS | — | Browser scroll NOT TESTED. |
| C17 | Careers hero | Learn about life at SBA | anchor | `#life-at-sba` | `scrollToSection` | PASS | — | |
| C18 | Careers | View Role | internal | `/careers/[slug]` | Link | PASS | — | |
| C19 | Job detail | Apply | anchor | `#apply` | `href="#apply"` | PASS | — | |
| C20 | Job / apply | mailto:hr@sbainfo.in | mailto | HR inbox | **Removed** from UI | FAIL | LOW | Stakeholder asked form-only; QA checklist still expected mailto. |
| C21 | Footer | Protect & Recover | hash | `/#protect-and-recover` | Home section `id="protect-and-recover"` exists on capability blocks | PASS | — | Hash scroll on Home NOT TESTED. |
| C22 | Footer | Operate with Assurance | hash | `/#engineered-for-your-industry` | Capability `id` matches | PASS | — | Label vs id mismatch is historical but target exists. |
| C23 | Footer | Modernize the Core | internal | `/solutions/modernize-the-core` | Direct solution URL | PASS | — | Other footer solutions use home hashes, not solution routes. |
| C24 | About / Video heroes | Let’s Connect | internal | `/#capabilities` | AboutHero, VideoHero | PASS | — | Goes to home capabilities, not contact form. |

## Anchor and Scroll-Spy Audit

| Route | Nav Label | Target ID | Scroll Result | Active State Result | Status | Notes |
|---|---|---|---|---|---|---|
| `/industries/*` | Overview | `overview` | Code: IndustryHero `id="overview"` | `aria-current="location"` in subnav | NOT TESTED | IDs exist. Scroll/spy behavior needs browser. |
| `/industries/*` | Industry Challenges | `industry-challenges` | ID on `IndustryChallengeSection` | same | NOT TESTED | |
| `/industries/*` | Solution Areas | `solution-areas` | BFSI: `BfsiOperationsPillars`; others: `IndustryOperationsPillars` | spy includes this id | NOT TESTED | Duplicate-ID risk if both solution-areas components mounted — **not** both mounted (slug branch). |
| `/industries/*` | Use Cases | `use-cases` | `IndustryUseCaseGrid` | | NOT TESTED | |
| `/industries/*` | Why SBA | `why-sba` | `IndustryWhySBA` | | NOT TESTED | |
| `/industries/*` | Let’s Connect | `talk-to-an-expert` | `IndustryCTA` | | NOT TESTED | Footer also `#contact`. |
| All 6 solutions | Subnav labels | per `solution.anchors` | Components assign matching section ids | SolutionSubNav | NOT TESTED | Code IDs aligned; spy/overlap NOT TESTED. |

## Content Verification

| Page/Route | Expected Content or Count | Actual Result | Status | Notes |
|---|---|---|---|---|
| Careers openings | 5 named roles | 5 in `JOBS`, all `status: Open` | PASS | Titles match list. |
| Careers departments | Technical / Finance/Accounts | Filter compares exact strings; grid no longer `ScrollStagger` | PASS | Filter logic code-verified after prior opacity bug fix. Browser NOT TESTED. |
| Insights master | 4 CS + 3 blogs | 7 records, `status: published` | PASS | |
| `/insights` | Blogs only | `getPublishedBlogs()` | PASS | |
| `/case-studies` | Case studies only | `getPublishedCaseStudies()` | PASS | |
| Home insights | Real records | `getPublishedInsights()` | PASS | Sorted by `publishDate` desc. |
| Solution pain cards | 3 per page | `overview.cards` length 3 in all six files | PASS | Counted in source. |
| Solution pillars | 3 pillars × 3 capabilities | Inspected modernize, make-data, protect pattern | PASS | Same structure across files. |
| Solution proof | 4 scenarios | `capabilities.scenarios` length 4 | PASS | |
| Solution journey | 4 steps | modernize `journey.steps` 4; make-data `blueprint.stages` 4 | PASS | |
| Connected offerings | 3 cards | modernize `offerings` **4**; protect **4** | FAIL | Spec asked 3. Extra cards include `href: null` (non-links). |
| Industry detail hero CTA | Exactly one | `secondaryCta` null on detail heroes | PASS | Overview page still has secondary Let’s Connect. |
| Solution hero CTA labels | Schedule … Workshop/Review | Actual: Let’s Connect | FAIL | Product data differs from QA expected labels. |
| Life at SBA | 5 photos | 5 imports; photo 02 is 680×304 | FAIL | LOW: documented lower resolution vs 1600×1200 set. |

## Image and Asset Audit

| Route/Component | Asset/Visual | Result | Status | Severity | Notes |
|---|---|---|---|---|---|
| Industry heroes | `/images/industries/*-hero.png` | 4 files exist in `public/` | PASS | — | Paths match `industryHeroPng()`. |
| Solution heroes | `src/assets/images/solutions/*-hero.png` | Imported; present in build output | PASS | — | |
| Careers hero | `careers-hero.png` | Build emitted hashed asset | PASS | — | |
| Insights/CS heroes | insights-hero, case-studies-hero | Build emitted | PASS | — | |
| Home insight thumbs | `public/images/insights/*.png` | 6 files exist | PASS | — | Identity blog uses imported listing-hero asset. |
| Life at SBA 02 | `life-at-sba-02.jpg` | 108 kB vs multi-MB PNGs | FAIL | LOW | Possible softness at large card size. |
| Capability icons | `public/images/icons/*.png` | 6 files match `BADGE_ICONS` | PASS | — | |
| Home capability slides | `import.meta.glob` capabilities folder | Build included large PNGs | PASS | — | `imageZoom` up to 1.72 on Make Data Actionable — visual QA NOT TESTED. |
| Insight detail heroes | record `heroImage` | Mapped per slug | PASS | — | Same file often used for thumb + hero (topic-matched public PNGs). |
| Alt text | heroes / cards / decorative | Mix of descriptive alts; some `alt=""` + `aria-hidden` | PASS | — | Baseline only. Decorative join-team image empty alt. |
| Rendered 404 images | live network | — | NOT TESTED | — | No browser. |

## Forms Audit

| Form/Route | Test Case | Expected Result | Actual Result | Status | Severity | Notes |
|---|---|---|---|---|---|---|
| Job apply | Empty required fields | Errors | `validate()` requires name, email, mobile, location, experience, LinkedIn URL, resume, consent | PASS | — | Code path. |
| Job apply | Invalid email | Reject | regex in `validate()` | PASS | — | |
| Job apply | Consent required | Reject | `if (!form.consent)` | PASS | — | |
| Job apply | Resume required | Reject | `if (!resumeFile)` | PASS | — | |
| Job apply | Type PDF/DOC/DOCX | Accept UI | `ACCEPT_ATTR` + extension check | PASS | — | MIME not sniffed. |
| Job apply | >5 MB | Reject | `MAX_RESUME_BYTES` | PASS | — | |
| Job apply | Show filename/size | Display | `formatFileSize` | PASS | — | |
| Job apply | Remove resume | Clears | `clearResume` | PASS | — | |
| Job apply | Job title shown | Prefilled | “Applying for: {job.title}” | PASS | — | |
| Job apply | Exact success copy from this QA brief | Email-to-HR message | Actual: “Thank you for applying. We have received your application…” | FAIL | HIGH | Does not match brief; also **false receipt** (stub does not transmit). |
| Job apply | No upload/API | No network | `submitJobApplication` returns local promise | PASS | — | Intentionally no backend. |
| Job apply | Backend delivery | Email/HR | Stub `pending_backend` | BLOCKED | — | Deferred by design. |
| Footer Let’s Connect | Required/email | Client validation | `ContactSection` status `sent` without fetch | PASS | — | Validation code exists. |
| Footer Let’s Connect | Honest pending backend | Must not claim delivery | “Thank you! We'll be in touch.” + “captured for this preview.” | FAIL | MEDIUM | Preview note exists; “we’ll be in touch” overclaims. |
| Contact enquiry | Required/email | Client validation | Form validators present | PASS | — | |
| Contact enquiry | Honest pending | No false start | “Your conversation with SBA has started.” | FAIL | HIGH | `console.info('[SBA Contact enquiry]', payload)` then timeout; no API. |
| Contact enquiry | External submit | Do not send | No `fetch` | PASS | — | Did not submit live data. |
| Talent pool (Careers) | Backend | Pool storage | Hint: backend not connected; link to Contact | PASS | — | Honest copy. |

## Responsive QA

| Route/Page Group | Viewport | Test Case | Result | Status | Notes |
|---|---:|---|---|---|---|
| All major groups | 390 | Overflow, nav, CTAs, heroes | Not executed | NOT TESTED | No browser. CSS has `sm`/`lg` breakpoints and hero `svh` rules. |
| All | 768 | Same | — | NOT TESTED | |
| All | 1024 | Same | — | NOT TESTED | |
| All | 1366 | Same | — | NOT TESTED | |
| All | 1440 | Same | — | NOT TESTED | |
| All | 1920 | Same | — | NOT TESTED | |
| All | 200% zoom | Main actions usable | — | NOT TESTED | |

## Accessibility Baseline

Development baseline only. **Not a WCAG certification.**

| ID | Route/Component | Test Case | Result | Status | Severity | Notes |
|---|---|---|---|---|---|---|
| A01 | Home | One H1 | HeroCarousel uses `<h1>` per slide in markup | FAIL | MEDIUM | Multiple H1s likely in DOM. |
| A02 | Careers / Insights / CS / jobs / articles | One H1 | Single `h1` in page source | PASS | — | |
| A03 | About / Contact | One H1 | AboutHero/ContactHero headings | NOT TESTED | — | Confirm in browser. |
| A04 | Job form | Labels | `htmlFor` + ids | PASS | — | |
| A05 | Contact forms | Labels | Present | PASS | — | Code. |
| A06 | Header menus | Keyboard / Escape | Mouse enter/leave + click; Escape not verified for all | NOT TESTED | — | |
| A07 | Search | Accessible name | `aria-label="Search"` | PASS | — | Behavior still broken (C09). |
| A08 | Mobile drawer | Focus trap | Menu state exists | NOT TESTED | — | |
| A09 | Carousels | Accessible names | Prev/Next aria-labels on Insights + Life at SBA | PASS | — | |
| A10 | Industry subnav | aria-current | `aria-current={isActive ? 'location'}` | PASS | — | |
| A11 | Clickable divs | Semantic links | Solution connected `href: null` uses `<div>` | PASS | — | Not clickable. |
| A12 | Reduced motion | Framer `useReducedMotion` | Used in several components | PASS | — | Incomplete site-wide audit. |
| A13 | Focus visible | Red outline classes | Many `focus-visible:outline-primary-red` | PASS | — | Visual check NOT TESTED. |
| A14 | Contrast | White/55 on black | Likely OK for body; 0.45/0.55 opacity | NOT TESTED | — | No contrast tool run. |

## SEO and Metadata Audit

| Route/Page Type | Test Case | Result | Status | Severity | Notes |
|---|---|---|---|---|---|
| Six solutions | Unique title + description | `seoTitle` / `metaDescription` + `usePageMeta` | PASS | — | |
| Careers listing | Unique meta | CareersPage `usePageMeta` | PASS | — | |
| Insights / Case Studies | Unique meta | Each listing `usePageMeta` | PASS | — | |
| Insight detail | Record meta | `item.metaTitle` / `metaDescription` | PASS | — | |
| Insight detail | Article JSON-LD | `@type: Article` | PASS | — | |
| Job pages | JobPosting schema | Not implemented | PASS | — | Spec: do not add incomplete JobPosting. |
| Home | Unique description | Title only in `useEffect`; no meta description | FAIL | MEDIUM | |
| About / Contact | Unique description | Title only | FAIL | MEDIUM | |
| Catch-all | Indexing unknown URLs | Unknown paths render Home with Home title | FAIL | HIGH | Duplicate home content at arbitrary URLs. |
| noindex | Accidental noindex | No robots noindex found in app meta helper | PASS | — | |
| Duplicate titles | Global fallback | Default “SBA Info Solutions” on cleanup | PASS | — | |

## Console and Network Audit

| Route | Issue | Evidence | Status | Severity | Recommended Fix |
|---|---|---|---|---|---|
| `/contact` enquiry | PII logged | `console.info('[SBA Contact enquiry]', payload)` includes form fields and filename | FAIL | MEDIUM | Remove logging of applicant payload. |
| All | Runtime console | No browser session | NOT TESTED | — | Run DevTools on preview. |
| All | Image/font 404 | Build succeeded; live 404s unknown | NOT TESTED | — | Network panel on preview. |
| Frontend secrets | API keys in src | No secrets found in grep | PASS | — | Baseline only. |

## Confirmed Defects

### Critical

No confirmed issues found.

### High

- **D-H1** `*` catch-all — Unknown URLs render Home instead of a 404. — Add a dedicated Not Found page; keep `*` for that component. Configure host SPA fallback for deep links.
- **D-H2** Header Search — Submit does not query or navigate. — Implement search or hide the control until ready.
- **D-H3** `/careers/:slug` apply success — Copy claims the application was received; stub does not send data. Also mismatches the QA-specified HR email message. — Use honest pending-backend copy for approval builds, or connect backend before public launch.
- **D-H4** `/contact` enquiry success — “Your conversation with SBA has started” with no API. — Align success copy with frontend-only/pending backend.

### Medium

- **D-M1** Home/About/Contact — Missing `usePageMeta` descriptions (Home/About/Contact). — Add unique meta descriptions.
- **D-M2** Home hero carousel — Likely multiple `h1` elements. — One page-level H1; slides as H2.
- **D-M3** Contact enquiry — `console.info` of full payload. — Delete or gate behind non-production.
- **D-M4** Footer vs Solutions — Five of six footer solution links are Home hashes, not `/solutions/...` (except Modernize). — Point footer items at solution routes if that is the intended IA.
- **D-M5** Connected offerings count — 4 cards on some solution pages vs expected 3; some are non-links (`href: null`). — Confirm with stakeholders; not auto-fixed.
- **D-M6** Solution hero CTA labels — Implemented as Let’s Connect, not “Schedule an Architecture Review” family. — Confirm approved live copy.
- **D-M7** Duplicate `id="capabilities"` — Home `HeroCarousel` `sectionId="capabilities"` and `CapabilitiesGrid` also uses `id="capabilities"`. — Unique IDs.
- **D-M8** Insights topic filter — Blogs have no “Modernization” topic; selecting it can empty `/insights`. — Hide unused topic chips or keep empty-state copy (already has empty message).

### Low

- **D-L1** Job apply mailto — Removed per product request; QA checklist still expected `mailto:hr@sbainfo.in`. — Update the checklist or restore a questions-only mailto.
- **D-L2** Life at SBA photo 02 — 680×304 vs 1600×1200 siblings. — Replace with a matching high-res asset.
- **D-L3** Build chunk size — JS bundle >500 kB warning. — Code-split later; not launch-blocking for this audit.
- **D-L4** About/Video “Let’s Connect” → `/#capabilities` not contact. — Confirm CTA intent.

## Blocked and Not Tested

| ID | Area | Status | Why It Could Not Be Tested | What Is Needed |
|---|---|---|---|---|
| B01 | Browser visual QA | NOT TESTED | No Playwright/Cypress/MCP browser | Local `npm run dev` + manual or Playwright |
| B02 | Responsive 390–1920 | NOT TESTED | Same | Device/DevTools pass |
| B03 | Scroll-spy / sticky overlap | NOT TESTED | Requires scrolling in browser | Manual on four industry + six solution pages |
| B04 | Keyboard/mobile menu | NOT TESTED | Requires browser | Keyboard + phone check |
| B05 | Live console/network | NOT TESTED | No runtime session | Chrome DevTools on preview |
| B06 | Careers backend email/upload | BLOCKED | Stub by design | Secure multipart API + HR notify |
| B07 | Contact/footer form delivery | BLOCKED | Client-only success | Same backend as contact |
| B08 | External email delivery | BLOCKED | Must not send test PII | Staging mailbox after backend |
| B09 | Lint / unit / e2e | NOT TESTED | Scripts not in package.json | Add ESLint/Vitest/Playwright if required |
| B10 | Deep-link reload on host | NOT TESTED | Depends on nginx/Netlify/IIS SPA fallback | Deploy preview |

## Pre-Launch Checklist

- [x] Production build passes
- [ ] All primary routes load *(code yes; browser not run)*
- [ ] All primary CTAs work *(code mostly; Search fails; Schedule-* labels absent)*
- [ ] All anchor links work *(IDs exist; scroll not run)*
- [ ] No broken image requests *(files exist; network not run)*
- [x] Careers form frontend validation works *(code)*
- [x] Backend email/upload integration is intentionally pending
- [ ] No false form submission claims *(FAIL today)*
- [ ] Mobile navigation works *(NOT TESTED)*
- [ ] No horizontal overflow at required viewports *(NOT TESTED)*
- [ ] No high or critical unresolved issues *(4 high open)*
- [ ] SEO metadata reviewed *(Home/About/Contact gaps; catch-all SEO)*
- [ ] Accessibility baseline reviewed *(H1/search gaps)*
- [ ] Final stakeholder visual approval completed

## Passed test cases (code-verified)

Build; six solution data modules registered; four industry slugs + public heroes; five jobs; seven insights with thumbs; blogs-only Insights listing; case-studies-only listing; Home carousel from master records; job form validation rules; no download-brief 404; industry detail single primary CTA; Article JSON-LD on insight details; no JobPosting claim; logo/nav destinations exist; CareersBanner → `/careers`.

## Final Recommendation

**READY WITH MINOR FIXES**

The production build is green and the information architecture (routes, jobs, insights, industries, solutions) is coherent in source. This is **not** READY FOR RELEASE until: (1) form success states stop claiming receipt/conversation without a backend, (2) Search is implemented or removed, (3) unknown URLs do not silently show Home, and (4) a real browser pass covers responsive, scroll-spy, and console/network.

Report file path: `WEBSITE_QA_TEST_REPORT.md`
