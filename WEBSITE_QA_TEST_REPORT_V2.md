# SBA Website QA Test Report — V2

## Test Run Summary

| Field | Value |
|---|---|
| Date and time | 2026-09-08 ~11:45 IST |
| Branch/commit | `main` / `b63e96f` (working tree includes uncommitted remediation) |
| Framework | React 19 + Vite 8 + React Router 7 + Tailwind CSS 4 |
| Package manager | npm (`package-lock.json` present) |
| Test environment | Local codebase inspection + `npm run build` (Vite 8.2.1, exit 0) |
| Browser automation | Unavailable — no Playwright/Cypress, no MCP browser tools in this run |
| Overall result | BLOCKED |
| Release recommendation | READY WITH MINOR FIXES |

Overall is **BLOCKED**, not PASS: original in-scope code defects were remediated and the production build succeeded, but browser/responsive/console/network suites were not executed, and form delivery backends remain intentionally deferred.

## V1-to-V2 Remediation Summary

| Original ID | Original Issue | Root Cause | Change Made | Retest Evidence | V2 Status |
|---|---|---|---|---|---|
| D-H1 | `path="*"` rendered `HomeV2` | Catch-all aliased unknown URLs to Home | Added `NotFoundPage`; `App.jsx` `*` → `NotFoundPage`. `/` and `/home-v2` unchanged. No redirect to `/`. Title “Page Not Found \| SBA Info Solutions”. | Source: `src/pages/NotFoundPage.jsx`, `src/App.jsx`. Browser render NOT TESTED. Host SPA fallback NOT TESTED. | PASS |
| D-H2 | Header search submitted nothing | `handleSearch` only `preventDefault` | Local `searchSite()` over solutions, industries, jobs, published insights; `/search?q=`; labelled inputs; Escape closes desktop field. | Source: `Header.jsx`, `siteSearch.js`, `SearchPage.jsx`. Empty copy: `No results found for “[query]”.` Live submit NOT TESTED. | PASS |
| D-H3 | Apply success claimed receipt | Stub + false copy | Exact pending copy; visible `mailto:hr@sbainfo.in` with subject `Application — [job title]`; job title remains visible; validation unchanged; no storage of applicant data. | Source: `JobApplicationForm.jsx`, `submitJobApplication.js`. Delivery BLOCKED (separate). | PASS |
| D-H4 | Contact claimed conversation started | Client timeout + false heading | Removed false success; honest pending copy; `mailto:hr@sbainfo.in` (only public email in use). Footer `ContactSection` no longer says “we’ll be in touch” / “captured”. No API. | Source: `ContactEnquiryForm.jsx`, `ContactSection.jsx`. | PASS |
| D-M1 | Home/About/Contact no unique description | Title-only `useEffect` | `usePageMeta` with specified titles/descriptions. Solution/Careers/Insights/CS/detail meta not changed. | Source: `HomeV2.jsx`, `AboutPage.jsx`, `ContactPage.jsx`. Document head in browser NOT TESTED. | PASS |
| D-M2 | Multiple Home H1s | Full-bleed used `h1` per slide; split was all `h2` (zero page H1) | First capability slide is `h1`; other slides `h2` with same classes. | Source: `HeroCarousel.jsx`. Live `querySelectorAll('h1')` NOT TESTED. | PASS |
| D-M3 | Contact `console.info` of payload | Debug log of form fields | Removed payload logging and unused payload object. Left `main.jsx` THREE.Clock warn filter. | Repo grep: no `[SBA Contact enquiry]`. Runtime console NOT TESTED. | PASS |
| D-M4 | Five footer Solutions were Home hashes | Footer `SOLUTIONS` array | All six footer Solution items use `/solutions/...` `Link`s. Labels unchanged. | Source: `Footer.jsx`. Routes exist in `data/solutions/index.js`. Click NOT TESTED. | PASS |
| D-M5 | 4 connected cards / `href: null` | Extra unapproved offerings; UI overwrote from catalog of 5 | Exactly 3 cards per solution; approved sets; Ethana label on Protect page; all remaining cards have real hrefs. | Source: six `whySba.offerings` arrays (length 3). Render NOT TESTED. | PASS |
| D-M6 | Generic “Let’s Connect” on solution heroes | `primaryCta` href `#contact` | Approved labels + hashes; `ctaSectionId()` already unique per template; existing `.solution-detail-page section[id]` `scroll-margin-top`. Industry heroes still Let’s Connect. Header CTA unchanged. | Source: six solution `hero.primaryCta` objects + `SolutionArchitectCta` `id`. Click/scroll NOT TESTED. | PASS |
| D-M7 | Duplicate `#capabilities` | Unused `CapabilitiesGrid` + live `CapabilityCarousel` | Live Home target remains carousel `sectionId="capabilities"`. Unused grid renamed `capabilities-grid`. Solution pages still use `#capabilities` for proof (different document). | Grep: Home grid no longer `id="capabilities"`. `querySelectorAll` in browser NOT TESTED. | PASS |
| D-M8 | Insights “Modernization” chip with no blogs | `INSIGHT_TOPICS` included case-study-only topic | Chips computed from published blogs only; invalid `?topic=` replaced with All. No invented blog. | Source: `InsightsPage.jsx`. Query/back-forward NOT TESTED. | PASS |
| D-L1 | Missing careers mailto | Form-only UI | Same as D-H3: visible `hr@sbainfo.in` mailto, job-specific subject, no attach claim. | Source: `JobApplicationForm.jsx`. | PASS |
| D-L2 | 680×304 Life at SBA photo | `life-at-sba-02.jpg` in active array | Excluded from `lifeAtSbaPhotos`; four 1600×1200 PNGs remain. File not deleted. CSS unchanged (max-width 620px, 4/3, cover). | Source: `lifeAtSbaPhotos.js`. Build output has 01/03/04/05, not 02. Intrinsic check in browser NOT TESTED. | PASS |
| D-L3 | Main JS >500 kB warning | Single large route bundle | Route-level `React.lazy` + `Suspense` (“Loading”). Header/Footer stay inside pages. | `npm run build` exit 0. Main `index-DAsZeHV6.js` **234.62 kB**; no >500 kB JS warning. V1 was 912 kB `index-CAg202AT.js`. | PASS |
| D-L4 | About/Video Let’s Connect → `/#capabilities` | Secondary/primary CTAs scrolled home capabilities | AboutHero, AboutFinalCta, VideoHero, unused `Hero.jsx` Let’s Connect → `/contact#enquiry`. Contact page scrolls `#enquiry` when hash present. Header Let’s Connect unchanged. | Source files above + `ContactPage.jsx`. Route/anchor in browser NOT TESTED. | PASS |

## Test Execution Summary

- Total test cases: **149**
- PASS: **88**
- FAIL: **0**
- BLOCKED: **8**
- NOT TESTED: **53**
- Critical issues: **0**
- High issues: **0**
- Medium issues: **0**
- Low issues: **0**

Counts: 88 + 0 + 8 + 53 = 149.  
V1 was 148 (71 / 16 / 8 / 53). V2 converts the 16 FAILs to PASS and adds `/search` as one PASS case. The 53 NOT TESTED browser/tooling cases were **not** reclassified as PASS. The 8 BLOCKED backend/email cases remain BLOCKED.

## Commands and Results

| Command | Purpose | Exit Code | Status | Key Output |
|---|---|---:|---|---|
| `npm run build` | Production Vite build | 0 | PASS | Built in 16.02s. Largest JS: `index-DAsZeHV6.js` 234.62 kB; `usePageMeta-Dxir5ffh.js` 177.81 kB; `HomeV2-MPqWCNGA.js` 164.32 kB. No 500 kB chunk warning. |
| `npm run lint` | Lint | — | NOT TESTED | No `lint` script in `package.json`. No ESLint package added. |
| `npm run typecheck` | Typecheck | — | NOT TESTED | JavaScript app; no typecheck script. |
| `npm test` | Unit / E2E | — | NOT TESTED | No test runner in `package.json`. None installed solely for this report. |

## Route Inventory

Evidence: `src/App.jsx` plus data modules. Live browser load/console/images: **NOT TESTED**. Host must still serve `index.html` for client deep links; the app now renders `NotFoundPage` for unmatched paths. That host behavior was **not** tested on a deployed preview.

| Route | Page Type | Render/Load Result | Main CTA Result | Asset Result | Console Result | Status | Notes |
|---|---|---|---|---|---|---|---|
| `/` | Home | Code: lazy `HomeV2` | Header Let’s Connect; hero Explore | Capability + insight assets in build | NOT TESTED | PASS | `usePageMeta` title + description. |
| `/home-v2` | Home alias | Same | Same | Same | NOT TESTED | PASS | Unchanged mapping. |
| `/about` | About | Code: `AboutPage` | Let’s Connect → `/contact#enquiry` | Leadership photos | NOT TESTED | PASS | `usePageMeta`. |
| `/contact` | Contact | Code: `ContactPage` | Let’s Connect → `#enquiry` | Hero motion | NOT TESTED | PASS | Hash scroll coded for `#enquiry`. |
| `/search` | Search | Code: `SearchPage` | Results from local records | n/a | NOT TESTED | PASS | New; `?q=` required for results. |
| `/careers` | Careers | Code: `CareersPage` | Open roles / Life at SBA | careers-hero + 4 life photos | NOT TESTED | PASS | |
| `/insights` | Blogs | Code: `InsightsPage` | Topic chips from blogs | insights-hero | NOT TESTED | PASS | |
| `/case-studies` | Case studies | Code: `CaseStudiesPage` | Industry chips | case-studies-hero | NOT TESTED | PASS | |
| `/industries` | Overview | Code | Let’s Connect | public industry PNGs | NOT TESTED | PASS | |
| `/industries/bfsi` | Industry | Code | Let’s Connect `#contact` | bfsi-hero.png exists | NOT TESTED | PASS | |
| `/industries/manufacturing` | Industry | Code | Let’s Connect | manufacturing-hero.png | NOT TESTED | PASS | |
| `/industries/it-ites` | Industry | Code | Let’s Connect | it-ites-hero.png | NOT TESTED | PASS | |
| `/industries/diversified-enterprises` | Industry | Code | Let’s Connect | diversified-enterprises-hero.png | NOT TESTED | PASS | |
| `/industries/unknown` | Industry 404 UI | Code: “Industry not found” | Back to Industries | n/a | NOT TESTED | PASS | Not Home. |
| `/solutions/modernize-the-core` | Solution | Code | Schedule an Architecture Review → `#talk-to-an-architect` | imported hero | NOT TESTED | PASS | |
| `/solutions/protect-and-recover` | Solution | Code | Schedule a Resilience Assessment → `#talk-to-a-security-expert` | imported hero | NOT TESTED | PASS | |
| `/solutions/make-data-actionable` | Solution | Code | Schedule a Data & AI Workshop → `#talk-to-a-data-architect` | imported hero | NOT TESTED | PASS | |
| `/solutions/build-and-connect` | Solution | Code | Schedule an Engineering Consultation → `#talk-to-an-engineering-lead` | imported hero | NOT TESTED | PASS | |
| `/solutions/operate-with-assurance` | Solution | Code | Schedule an Operations Audit → `#talk-to-an-operations-lead` | imported hero | NOT TESTED | PASS | |
| `/solutions/accelerate-business-ai` | Solution | Code | Schedule an AI Discovery Session → `#talk-to-an-ai-specialist` | imported hero | NOT TESTED | PASS | |
| `/solutions/unknown` | Solution 404 UI | Code: “Solution not found” | Back to Home | n/a | NOT TESTED | PASS | |
| `/careers/technical-support-engineer-security-av` | Job | Code | `#apply` | n/a | NOT TESTED | PASS | |
| `/careers/technical-support-engineer-data-center` | Job | Code | `#apply` | n/a | NOT TESTED | PASS | |
| `/careers/technical-support-engineer-desktop-support` | Job | Code | `#apply` | n/a | NOT TESTED | PASS | |
| `/careers/accounts-assistant` | Job | Code | `#apply` | n/a | NOT TESTED | PASS | |
| `/careers/software-engineer-intern` | Job | Code | `#apply` | n/a | NOT TESTED | PASS | |
| `/insights/air-gapped-openshift-for-ai` | Insight | Code | Talk to an expert | mapped | NOT TESTED | PASS | |
| `/insights/one-pane-of-glass-unified-observability` | Insight | Code | Talk to an expert | mapped | NOT TESTED | PASS | |
| `/insights/detect-early-recover-clean` | Insight | Code | Talk to an expert | mapped | NOT TESTED | PASS | |
| `/insights/one-platform-three-workloads` | Insight | Code | Talk to an expert | mapped | NOT TESTED | PASS | |
| `/insights/two-employee-types-one-login` | Blog | Code | Get in touch | mapped | NOT TESTED | PASS | |
| `/insights/why-every-enterprise-deploying-ai-needs-a-red-team` | Blog | Code | Get in touch | mapped | NOT TESTED | PASS | |
| `/insights/shadow-ai-invisible-risk` | Blog | Code | Get in touch | mapped | NOT TESTED | PASS | |
| Unknown e.g. `/this-page-does-not-exist` | Not Found | Code: `NotFoundPage` | Back to Home `/` | n/a | NOT TESTED | PASS | Does not render Home. HTTP status still 200 unless host configured otherwise — NOT TESTED. |

## CTA and Navigation Audit

| ID | Source Route | Label | Intended Destination | Actual Result | Evidence | Status | Severity |
|---|---|---|---|---|---|---|---|
| C01 | Global | Logo | `/` | Header link `/` | `Header.jsx` | PASS | — |
| C02 | Global | About | `/about` | Header | `Header.jsx` | PASS | — |
| C03 | Global | Solutions dropdown | six `/solutions/...` | `CAPABILITIES` | Header | PASS | — |
| C04 | Global | Industries dropdown | `/industries` + 4 sectors | `INDUSTRY_NAV` | Header | PASS | — |
| C05 | Global | Insights dropdown | `/case-studies`, `/insights` | `INSIGHTS_MENU` | Header | PASS | — |
| C06 | Global | Careers | `/careers` | Header | Header | PASS | — |
| C07 | Global | Contact | `/contact` | Header | Header | PASS | — |
| C08 | Global | Let’s Connect | footer `#contact` or contact form | `scrollToContactForm()` unchanged | Header | PASS | — |
| C09 | Global | Search | `/search?q=` | `navigate(\`/search?q=...\`)` | `Header.jsx` | PASS | — |
| C10 | Home | Join the SBA Team | `/careers` | Link | `CareersBanner` | PASS | — |
| C11 | Home | Insight cards | `/insights/[slug]` | `getPublishedInsights()` | Home | PASS | — |
| C12 | Home | View All Insights | `/insights` | Link | Home | PASS | — |
| C13 | Solution heroes | Approved Schedule… labels | matching `#talk-to-*` | `hero.primaryCta` | six solution JS files | PASS | — |
| C14 | Solution heroes | Download brief | none | `secondaryCta: null` | data | PASS | — |
| C15 | Industry detail | LET’S CONNECT | `#contact` | unchanged | `industriesContent.js` | PASS | — |
| C16 | Careers hero | View Open Roles | `#open-roles` | `scrollToSection` | CareersPage | PASS | — |
| C17 | Careers hero | Life at SBA | `#life-at-sba` | `scrollToSection` | CareersPage | PASS | — |
| C18 | Careers | View Role | `/careers/[slug]` | Link | CareersPage | PASS | — |
| C19 | Job detail | Apply | `#apply` | href | JobDetailPage | PASS | — |
| C20 | Job apply | mailto:hr@sbainfo.in | HR inbox (manual) | Visible semantic mailto + subject | JobApplicationForm | PASS | — |
| C21 | Footer | Protect & Recover | `/solutions/protect-and-recover` | Footer `SOLUTIONS` | Footer.jsx | PASS | — |
| C22 | Footer | Operate with Assurance | `/solutions/operate-with-assurance` | Footer | Footer.jsx | PASS | — |
| C23 | Footer | Modernize the Core | `/solutions/modernize-the-core` | Footer | Footer.jsx | PASS | — |
| C24 | About / Video | Let’s Connect | `/contact#enquiry` | Links, not `/#capabilities` | AboutHero, AboutFinalCta, VideoHero | PASS | — |

Click/scroll in a real browser: **NOT TESTED** (does not change the code-level PASS for destination wiring).

## Anchors and Scroll-Spy

| Route | Nav Label | Target ID | Click/Scroll Result | Active State Result | Evidence | Status |
|---|---|---|---|---|---|---|
| `/industries/*` | Overview | `overview` | Not executed | Not executed | ID in IndustryHero | NOT TESTED |
| `/industries/*` | Industry Challenges | `industry-challenges` | Not executed | Not executed | Section component | NOT TESTED |
| `/industries/*` | Solution Areas | `solution-areas` | Not executed | Not executed | Pillars branch | NOT TESTED |
| `/industries/*` | Use Cases | `use-cases` | Not executed | Not executed | IndustryUseCaseGrid | NOT TESTED |
| `/industries/*` | Why SBA | `why-sba` | Not executed | Not executed | IndustryWhySBA | NOT TESTED |
| `/industries/*` | Let’s Connect | `talk-to-an-expert` | Not executed | Not executed | IndustryCTA | NOT TESTED |
| All 6 solutions | Subnav + hero CTAs | per `anchors` + `ctaSectionId` | Not executed | Not executed | IDs in source; `scroll-margin-top` in CSS | NOT TESTED |

## Content and Data Verification

| Route/Page Group | Test Case | Expected | Actual | Evidence | Status |
|---|---|---|---|---|---|
| Careers openings | 5 named roles | 5 Open jobs | `jobs.js` | PASS |
| Insights master | 4 CS + 3 blogs | 7 published | `content.js` | PASS |
| `/insights` | Blogs only | `getPublishedBlogs()` | InsightsPage | PASS |
| `/insights` filters | Chips with ≥1 blog | Digital Engineering, Security, Data & AI — no Modernization chip | InsightsPage `topicChips` | PASS |
| `/case-studies` | Case studies only | `getPublishedCaseStudies()` | CaseStudiesPage | PASS |
| Home insights | Real records | `getPublishedInsights()` | InsightsCarousel | PASS |
| Solution pain cards | 3 | length 3 | six files | PASS |
| Solution pillars | 3×3 | structure unchanged | six files | PASS |
| Solution proof | 4 scenarios | unchanged | six files | PASS |
| Connected offerings | 3 with hrefs | 3 / 3 / 3 / 3 / 3 / 3 | whySba.offerings | PASS |
| Protect connected | Ethana label | “Accelerate Business AI (Ethana)” → `/solutions/accelerate-business-ai` | protectAndRecover.js | PASS |
| Solution hero CTAs | Approved labels | six unique Schedule… labels | hero.primaryCta | PASS |
| Life at SBA | High-res only | 4 photos, width 1600 | lifeAtSbaPhotos.js | PASS |
| Search corpus | Local only | solutions, industries, jobs, insights | siteSearch.js | PASS |

## Image and Asset Verification

| Route/Component | Asset | Native/Rendered Check | Result | Evidence | Status | Severity |
|---|---|---|---|---|---|---|
| Industry heroes | public PNGs | File exists; render NT | Present | `public/images/industries` | PASS | — |
| Solution heroes | imported PNG | Build hashed assets | Present | dist/assets `*-hero-*` | PASS | — |
| Careers hero | careers-hero.png | Build | Present | dist | PASS | — |
| Insights/CS heroes | listing heroes | Build | Present | dist | PASS | — |
| Home insight thumbs | public insights PNGs | Files exist | Present | public/ | PASS | — |
| Life at SBA | 01,03,04,05 PNG | Build listed 1600-class files; 02 not in bundle | Active set excludes 680px jpg | dist + data module | PASS | — |
| Capability icons | public icons | Files exist | Present | public/ | PASS | — |
| Home capability slides | glob PNGs | Build | Present | dist | PASS | — |
| Insight detail heroes | mapped | Source map | Present | content.js | PASS | — |
| Rendered 404 images | live network | Not run | Unknown | — | NOT TESTED | — |

## Forms Verification

| Form/Route | Test Case | Expected | Actual | Evidence | Status | Severity |
|---|---|---|---|---|---|---|
| Job apply | Empty required | Errors | `validate()` | JobApplicationForm | PASS | — |
| Job apply | Invalid email | Reject | regex | same | PASS | — |
| Job apply | Consent | Required | code | same | PASS | — |
| Job apply | Resume type/size | PDF/DOC/DOCX, 5 MB | unchanged | same | PASS | — |
| Job apply | Success copy | Exact pending HR sentence | Exact string in SUCCESS_MESSAGE | JobApplicationForm | PASS | — |
| Job apply | mailto | Visible `hr@sbainfo.in`, subject `Application — [title]` | Present; no attach | JobApplicationForm | PASS | — |
| Job apply | No API | No fetch | stub | submitJobApplication.js | PASS | — |
| Job apply | Backend delivery | Email/upload | Still stub `pending_backend` | service | BLOCKED | — |
| Footer Let’s Connect | Honest pending | No delivery claim | Pending copy + mailto | ContactSection | PASS | — |
| Contact enquiry | Validation | Client validators | unchanged | ContactEnquiryForm | PASS | — |
| Contact enquiry | Honest pending | Specified message + mailto | Implemented | ContactEnquiryForm | PASS | — |
| Contact enquiry | External submit | No API | delay only | ContactEnquiryForm | PASS | — |
| Contact enquiry | External delivery | Backend | Not implemented | — | BLOCKED | — |
| Talent pool | Honest | Backend not connected | Hint + Contact link | CareersPage | PASS | — |

## Responsive and Accessibility Baseline

| Route/Component | Viewport or Test | Result | Evidence | Status | Severity |
|---|---|---|---|---|---|
| All major groups | 390–1920 overflow/nav | Not executed | No browser | NOT TESTED | — |
| All | 200% zoom | Not executed | No browser | NOT TESTED | — |
| Home | Exactly one H1 | First carousel slide `h1`, others `h2` | HeroCarousel.jsx | PASS | — |
| Careers / Insights / CS / jobs / articles | One H1 in source | Unchanged single h1 | page sources | PASS | — |
| About / Contact | One H1 | Source has one; live count NT | AboutHero / ContactHero | NOT TESTED | — |
| Job form | Labels | `htmlFor` | JobApplicationForm | PASS | — |
| Search | Labelled input | `htmlFor="header-search"` + mobile id | Header | PASS | — |
| Header menus | Keyboard / Escape | Escape wired for search; menus NT | Header | NOT TESTED | — |
| Mobile drawer | Focus trap | Not executed | — | NOT TESTED | — |
| Industry subnav | aria-current | Code | Industry subnav | PASS | — |
| Reduced motion | Framer hook | Used in several components | source | PASS | — |
| Focus visible | Outline classes | Present | source | PASS | — |
| Contrast | Tooling | Not run | — | NOT TESTED | — |
| Not Found | Keyboard link to `/` | Semantic `Link`; live NT | NotFoundPage | PASS | — |

## SEO and Metadata

| Route | Test Case | Expected | Actual | Evidence | Status |
|---|---|---|---|---|---|
| Six solutions | Unique title + description | Unchanged approved strings | `usePageMeta` + data | PASS |
| Careers listing | Unique meta | Unchanged | CareersPage | PASS |
| Insights / Case Studies | Unique meta | Unchanged | listing pages | PASS |
| Insight detail | Record meta | Unchanged | InsightDetailPage | PASS |
| Insight detail | Article JSON-LD | Unchanged | same | PASS |
| Job pages | No incomplete JobPosting | Not added | — | PASS |
| Home | Unique description | Specified sentence | HomeV2 `usePageMeta` | PASS |
| About | Unique description | Specified sentence | AboutPage | PASS |
| Contact | Unique description | Specified sentence | ContactPage | PASS |
| Catch-all | Not Home title | “Page Not Found \| SBA Info Solutions” | NotFoundPage | PASS |
| noindex | Accidental noindex | None found | usePageMeta | PASS |

Rendered `<head>` in a browser: **NOT TESTED**.

## Console and Network

| Route | Test Case | Actual Result | Evidence | Status | Severity |
|---|---|---|---|---|---|
| `/contact` enquiry | No PII console log | Log statements removed | ContactEnquiryForm.jsx | PASS | — |
| All | Runtime console errors | Not executed | No DevTools session | NOT TESTED | — |
| All | Image/font 404 | Build OK; live unknown | No network panel | NOT TESTED | — |
| Frontend secrets | API keys in src | None found | grep baseline | PASS | — |

## Remaining Defects

### Critical

No confirmed issues found.

### High

No confirmed issues found.

### Medium

No confirmed issues found.

### Low

No confirmed issues found.

(Advisory, not a FAIL: production hosting must configure SPA fallback so valid client routes do not 404 at the server before React can render. That was not tested on a host.)

## Blocked and Not Tested

| ID | Area | Status | Reason | What Is Required To Complete |
|---|---|---|---|---|
| B01 | Browser visual QA | NOT TESTED | No Playwright/Cypress/MCP browser | `npm run dev` + manual or add E2E tooling |
| B02 | Responsive 390–1920 | NOT TESTED | Same | Device/DevTools pass |
| B03 | Scroll-spy / sticky overlap | NOT TESTED | Requires scrolling | Manual on industry + solution pages |
| B04 | Keyboard/mobile menu | NOT TESTED | Requires browser | Keyboard + phone check |
| B05 | Live console/network | NOT TESTED | No runtime session | Chrome DevTools on preview |
| B06 | Careers resume upload and email delivery | BLOCKED | Stub by design; no backend in this task | Secure multipart API + HR notify |
| B07 | Contact form external delivery | BLOCKED | Client-only; no API | Contact backend |
| B08 | Email notification to hr@sbainfo.in | BLOCKED | mailto is manual only; no send from app | Staging mailbox after backend |
| B09 | Lint / unit / e2e | NOT TESTED | Scripts not in package.json | Add ESLint/Vitest/Playwright if required |
| B10 | Deep-link reload on host | NOT TESTED | Depends on nginx/Netlify/IIS SPA fallback | Deployed preview |

## Pre-Launch Checklist

- [x] Production build passes
- [ ] Valid public routes load
- [ ] Unknown route renders a Not Found page
- [ ] Header Search works or is intentionally removed
- [ ] Primary CTAs use approved labels and destinations
- [x] Footer Solution links point to dedicated Solution routes
- [ ] Hero/section anchors work
- [x] No duplicate critical IDs
- [ ] No broken local image assets
- [x] Careers frontend validation works
- [x] Careers fallback HR email path is available
- [x] No false form-delivery claims
- [x] No PII form payload logging
- [x] SEO title and meta descriptions reviewed
- [x] One H1 per audited page
- [ ] Responsive/browser checks completed
- [x] Backend form delivery completed or intentionally deferred
- [x] No critical/high defects remain
- [ ] Stakeholder final visual approval completed

Unchecked items need a real browser or stakeholder pass. Checked items have source and/or `npm run build` evidence from this run.

## Final Recommendation

**READY WITH MINOR FIXES**

In-scope V1 defects D-H1–D-H4, D-M1–D-M8, and D-L1–D-L4 were remediated in source. The production build is green and the main JS chunk is under the 500 kB warning threshold after route-level code splitting.

This is **not** a fully tested production release: no browser, responsive, scroll-spy, or live console/network session was run. Resume upload, application email, and contact enquiry delivery remain **intentionally deferred** (BLOCKED). Users are directed to `hr@sbainfo.in` via mailto; the application does not send mail or attach files.

Configure SPA fallback on the host so deep links serve `index.html`; unmatched routes then show `NotFoundPage` in the client. That host behavior was not tested.

Report file path: `WEBSITE_QA_TEST_REPORT_V2.md`  
V1 report left unchanged: `WEBSITE_QA_TEST_REPORT.md`
