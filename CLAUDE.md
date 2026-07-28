# Veliq Agency Website

Next.js 16.2.9 marketing site for Veliq, a web dev & SEO agency.

## Stack

- **Framework:** Next.js 16.2.9 (App Router, React 19.2.4)
- **Styling:** Tailwind CSS 4 + PostCSS
- **Animation:** Framer Motion 12.40.0
- **Email:** Resend 6.16.0
- **Media:** FFmpeg (fluent-ffmpeg, ffmpeg-static for video processing)
- **E2E Tests:** Playwright 1.61.0
- **Linting:** ESLint 9

## Directory Structure

```
app/
├── (root pages)
│   ├── page.tsx                              # Home
│   ├── about/page.tsx                        # About company
│   ├── contact/page.tsx                      # Contact form
│   ├── reviews/page.tsx                      # Google Reviews
│   ├── pricing/page.tsx                      # Pricing plans
│   └── studio/page.tsx                       # Studio page
├── services/
│   ├── page.tsx                              # Services listing (3 services)
│   └── [slug]/page.tsx                       # Dynamic service detail
├── projects/
│   ├── page.tsx                              # Projects listing
│   └── [slug]/page.tsx                       # Dynamic project detail
├── blog/
│   ├── page.tsx                              # Blog listing
│   └── [slug]/page.tsx                       # Dynamic blog post
├── legal/
│   └── [slug]/page.tsx                       # Legal pages (privacy, terms)
├── website-development-with-seo/
│   ├── page.tsx                              # SEO landing page
│   └── AuditCtaSection.tsx                   # Audit form embedded
├── checkout/
│   └── [plan]/page.tsx                       # Plan checkout page
└── layout.tsx                                # Root layout (Navbar + Footer + GA)

components/
├── sections/
│   ├── HeroSection.tsx                       # Hero banner (home, pages)
│   ├── Navbar.tsx                            # Header navigation (global)
│   ├── Footer.tsx                            # Footer (global)
│   ├── ServicesSection.tsx                   # Services grid (home)
│   ├── ProjectsSection.tsx                   # Projects grid (home)
│   ├── ReviewsSection.tsx                    # Google Reviews (home)
│   ├── CtaSection.tsx                        # Final CTA (pages)
│   ├── FaqSection.tsx                        # FAQ accordion (pages)
│   ├── LeadMagnetSection.tsx                 # Lead magnet CTA
│   ├── ProcessJourneySection.tsx             # Process steps
│   └── ... (others)
├── ui/
│   ├── Button.tsx                            # Button component
│   ├── ClientOnly.tsx                        # Hydration wrapper (contains SplashScreen)
│   ├── Reveal.tsx                            # Scroll-triggered reveal (Framer Motion)
│   ├── ReviewCard.tsx                        # Review card
│   └── ... (others)
└── seo/
    └── JsonLd.tsx                            # Schema markup generators

lib/
├── services.ts                               # Service data (3 core services)
├── projects.ts                               # Project data + images
├── blog.ts                                   # Blog post data
├── team.ts                                   # Team member data
├── reviews.ts                                # Google Reviews data
└── ... (utilities: escape-html, captcha, country-codes)
```

## Data Sources

All data centralized in `lib/` as TypeScript constants. Queries via simple `find()`, no database.

- **`SERVICES`** — 3 services (website-development, website-support, seo) with full content (tiers, process, FAQs, features, technologies)
- **`PROJECTS`** — Portfolio projects with images, categories, links
- **`BLOG_POSTS`** — Blog articles with metadata
- **`TEAM`** — Team member info
- **`REVIEWS`** — Google reviews data

Access pattern:
```ts
import { SERVICES, getService } from "@/lib/services";
const service = getService("website-development");
```

## Page Navigation & Data Flow

### Home (`/`)
- **Renders:** Hero → Logos → Reviews → Services Grid → Projects Grid → Lead Magnet → FAQ → CTA → Footer
- **Links to:**
  - Services Grid → `/services/[slug]`
  - Projects Grid → `/projects`
  - Lead Magnet CTA → `/website-development-with-seo`
  - FAQ CTA → `/contact`
  - Review section → `/reviews`
- **Data:** Uses `SERVICES`, `PROJECTS`, `REVIEWS`, inline FAQ data
- **Analytics:** Google Analytics via script in layout.tsx

### Services Hub (`/services`)
- **Renders:** Services grid (3 cards) + cross-link to SEO landing + CTA section
- **Links to:**
  - Each service card → `/services/[slug]`
  - Cross-link → `/website-development-with-seo`
  - Book CTA → `/contact`
  - Blog CTA → `/blog`
- **Data:** `SERVICES` constant
- **Pattern:** Server-rendered grid for SEO crawlability

### Service Detail (`/services/[slug]`)
- **Dynamic routes:** `website-development`, `website-support`, `seo`
- **Renders:** Hero + Problem + Differentiators + Tiers (pricing) + Signature feature + FAQ + Related projects + CTA
- **Links to:**
  - Related projects → `/projects/[slug]`
  - FAQ → `/contact` (book discovery call)
  - Cross-service links → `/services/[other-slug]`
  - Blog → `/blog`
- **Data:** Service object from `getService(slug)` + related `PROJECTS`
- **Tech:** Uses `generateStaticParams()` for static generation, `generateMetadata()` for dynamic meta tags

### Projects Hub (`/projects`)
- **Renders:** Projects grid with category filters
- **Links to:**
  - Each project → `/projects/[slug]`
- **Data:** `PROJECTS` constant

### Project Detail (`/projects/[slug]`)
- **Renders:** Project hero + images + case study + related services + CTA
- **Links to:**
  - Related service → `/services/[slug]`
  - "Let's talk" CTA → `/contact`

### Blog (`/blog`)
- **Renders:** Blog post listing with search/filters
- **Links to:**
  - Each post → `/blog/[slug]`
- **Data:** `BLOG_POSTS`

### Blog Post (`/blog/[slug]`)
- **Renders:** Article content + related posts + author bio + CTA
- **Links to:**
  - Related posts → `/blog/[other-slug]`
  - Services mentioned → `/services/[slug]`
  - Contact CTA → `/contact`

### Pricing (`/pricing`)
- **Renders:** Plan grid + FAQ + feature comparison
- **Links to:**
  - Select plan → `/checkout/[plan]`
  - FAQ links → `/contact`

### Checkout (`/checkout/[plan]`)
- **Dynamic routes:** Each plan from `PLANS` constant
- **Renders:** Plan summary + checkout form (Resend integration)
- **Links to:**
  - Back → `/pricing`

### Contact (`/contact`)
- **Client component** ("use client")
- **Renders:** Contact form + FAQ accordion + contact info cards + social links
- **Form submission:** POST to Resend API (email to admin@veliq.co)
- **Links to:** None direct; embedded in CTAs from other pages

### About (`/about`)
- **Renders:** Company story + values + team section + CTA
- **Links to:**
  - Team member profiles (if exist)
  - Services → `/services`

### Website Development with SEO (`/website-development-with-seo`)
- **Special landing page** for SEO service with audit form
- **Renders:** Hero + Audit form (AuditCtaSection) + SEO benefits + comparison
- **Links to:**
  - Form submission → Email audit results
  - Service link → `/services/seo`
- **Form:** Embedded within page, submits via Resend

### Reviews (`/reviews`)
- **Renders:** Large Google Reviews section
- **Data:** `REVIEWS` constant
- **Links to:** Each review → external (Google, etc.)

## Cross-Page Navigation Patterns

```
HOME
├─ Click service card → /services/[slug]
│  └─ Click related project → /projects/[slug]
│     └─ Click service link → /services/[slug] (cycle)
├─ Click project → /projects
│  └─ Click project detail → /projects/[slug]
├─ Click "Get Free Audit" → /website-development-with-seo
│  └─ Submit audit → Email + /services/seo link
├─ Click CTA → /contact
└─ Click review → /reviews

/SERVICES → /services/[slug] → /projects/[slug] → /services/[slug]
/PRICING → /checkout/[plan] → Resend email

BLOG → /blog/[slug] → Related posts, service links
```

## Form Flows

### Contact Form (`/contact`)
- **Fields:** Name, Email, Phone, Service interest, Message
- **Submission:** Resend API → admin@veliq.co
- **Trigger points:** CTAs on every page

### Audit Form (`/website-development-with-seo`)
- **Fields:** Website URL, Email, Phone, Current challenges
- **Submission:** Resend API → Generate audit report
- **Trigger point:** Embedded in landing page + home page CTA

### Checkout Form (`/checkout/[plan]`)
- **Fields:** Name, Email, Company, Payment info (Stripe/PayPal via Resend)
- **Submission:** Resend API → Billing + confirmation
- **Trigger point:** Select plan on `/pricing`

## Component Reuse

- **Navbar** — Global header with links to all main pages
- **Footer** — Global footer (all pages)
- **HeroSection** — Used on home, about, service detail pages
- **CtaSection** — Final CTA section (multiple pages)
- **FaqSection** — FAQ accordion (service pages, contact)
- **Reveal** — Scroll-triggered animation wrapper (all pages)
- **ClientOnly** — Hydration safety wrapper (SplashScreen, interactive components)
- **JsonLd** — Schema markup (organizationSchema, localBusinessSchema, faqSchema, breadcrumbSchema, serviceSchema)

## Static vs. Dynamic Rendering

- **Static (build-time):** Home, services listing, blog listing, pricing, about, legal pages
- **Dynamic (request-time):** Service detail (`generateStaticParams()`), project detail, blog post, checkout
  - Uses `generateStaticParams()` for static pre-rendering of all routes
  - `generateMetadata()` for dynamic OG tags per page

## Analytics & SEO

- **Google Analytics:** Script in `layout.tsx`, ID `G-9ZJEFXDNWM`, strategy `afterInteractive`
- **JSON-LD Schema:**
  - `organizationSchema` (org info)
  - `localBusinessSchema` (location, contact)
  - `faqSchema` (FAQ data)
  - `breadcrumbSchema` (navigation breadcrumbs)
  - `serviceSchema` (service details)
- **Meta tags:** Dynamic per page via `generateMetadata()`
- **OG images:** Default `/og-image.png`, custom per page if needed

## Common Implementation Notes

- **Hydration issues:** Use `<ClientOnly>` wrapper for browser-only logic (SplashScreen, animations, forms)
- **Dynamic imports:** `dynamic(() => import(...))` for code-splitting (LeadMagnetSection, FaqSection lazy-loaded on home)
- **Suspense:** Wraps lazy-loaded sections to show loading state
- **Link prefetching:** Next.js auto-prefetches `<Link>` routes on hover
- **Image optimization:** Use Next.js `<Image>` component (auto-compress, lazy-load, responsive)
- **Fonts:** Inter (body) + Poppins (headings) via `next/font/google`

## Recent Changes & Context

- Google Analytics integrated (G-9ZJEFXDNWM via `next/script`)
- Google Reviews section added above Services on home
- Fixed hydration crash in SplashScreen (was breaking form submissions)
- Fixed audit popup labels to left-align on SEO dev page
- Email sending via Resend (contact form, checkout, audit form)

## Before Touching Code

1. Next.js 16.2.9 has breaking changes — read `node_modules/next/dist/docs/` for API differences
2. React 19.2.4 has updates — check for deprecated hooks/patterns
3. Tailwind CSS 4 uses new PostCSS integration (not Tailwind CLI directly)
4. Check for hydration issues when adding interactive components (use `<ClientOnly>` if needed)
5. Form submissions: verify Resend API key is set in environment, test Resend integration before deploying
6. Dynamic routes: always use `generateStaticParams()` for SEO and performance
7. Meta tags: update `generateMetadata()` for each new page

## Git Conventions

Standard commits. Check recent commits for message style.

@AGENTS.md
