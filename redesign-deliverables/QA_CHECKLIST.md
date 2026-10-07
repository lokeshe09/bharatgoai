> Historical design reference. Superseded by the current light-theme informational website; these instructions do not apply to the current implementation.

# BharatGoAI Premium Redesign - QA & Testing Checklist
## Comprehensive Quality Assurance Protocol

**Version:** 3.0.0
**Test Coverage Target:** 100% of user-facing pages
**Performance Target:** Lighthouse score >= 90 across all metrics

---

## TABLE OF CONTENTS

1. [Device & Viewport Testing](#1-device--viewport-testing)
2. [Responsive Behavior Tests](#2-responsive-behavior-tests)
3. [Emoji Removal Verification](#3-emoji-removal-verification)
4. [Accessibility Testing](#4-accessibility-testing)
5. [Performance Testing (Lighthouse)](#5-performance-testing-lighthouse)
6. [Cross-Browser Testing](#6-cross-browser-testing)
7. [Interaction & Animation Tests](#7-interaction--animation-tests)
8. [Content & Copy Verification](#8-content--copy-verification)
9. [Edge Case Testing](#9-edge-case-testing)
10. [Regression Testing](#10-regression-testing)

---

## 1. DEVICE & VIEWPORT TESTING

### 1.1 Required Test Viewports

| Device Category | Width × Height | Device Examples |
|-----------------|---------------|-----------------|
| **XS Mobile** | 360×800 | Samsung Galaxy S20, Pixel 5 |
| **Mobile** | 375×812 | iPhone 12/13/14, iPhone X |
| **Large Mobile** | 412×915 | Samsung Galaxy S21, Pixel 6 |
| **Tablet Portrait** | 768×1024 | iPad Mini, iPad Air (portrait) |
| **Tablet Landscape** | 1024×1366 | iPad Pro (landscape) |
| **Laptop** | 1280×800 | MacBook Air, Standard Laptop |
| **Desktop** | 1440×900 | 15" MacBook Pro, iMac 24" |
| **Large Desktop** | 1920×1080 | 27" Monitor, Full HD |

### 1.2 Test Each Viewport

**For each viewport size, verify:**

- [ ] No horizontal scrollbar appears
- [ ] All content is visible (not clipped or hidden)
- [ ] Text is readable (not too small or overlapping)
- [ ] Buttons and CTAs are properly sized and clickable
- [ ] Images and graphics scale appropriately
- [ ] Glass effects render correctly
- [ ] Navigation remains accessible

**Browser Dev Tools:**
```
Chrome DevTools → Device Toolbar (Cmd+Shift+M)
Set custom dimensions for each viewport
Test in both portrait and landscape orientations
```

---

## 2. RESPONSIVE BEHAVIOR TESTS

### 2.1 Hero Section (CRITICAL)

**Desktop (>= 1024px):**
- [ ] 60/40 grid layout visible
- [ ] Left content takes ~60% width
- [ ] Chat panel takes ~40% width
- [ ] Chat panel height: 600px max
- [ ] No horizontal overflow
- [ ] Stats grid: 3 columns

**Tablet (768-1023px):**
- [ ] 55/45 grid layout
- [ ] Chat panel height: 500px max
- [ ] Stats grid: 2×2 or 3 columns (responsive)

**Mobile (< 768px):**
- [ ] **CRITICAL:** Vertical stack order:
  1. Premium badge
  2. Headline
  3. Subhead
  4. Description
  5. CTA buttons (full-width)
  6. Stats grid (single column)
  7. Chat panel (stacked BELOW)
- [ ] Chat panel width: 100% of container
- [ ] Chat panel max-width: calc(100vw - 32px)
- [ ] Chat panel max-height: 400px
- [ ] Internal scroll ONLY (within .chat-messages)
- [ ] NO horizontal overflow

**Test Procedure:**
1. Open homepage on each viewport
2. Inspect hero layout
3. Verify stack order on mobile
4. Scroll within chat panel on mobile (should scroll internally, not trigger page scroll)

---

### 2.2 Navbar (CRITICAL)

**Desktop (>= 1024px):**
- [ ] All nav links visible
- [ ] "Get Started" button: 36px height, text visible
- [ ] Logo left-aligned, links center, CTA right-aligned
- [ ] No collision between elements

**Tablet (768-1023px):**
- [ ] Primary links visible (Features, Solutions, Pricing)
- [ ] Secondary links moved to hamburger menu
- [ ] "Get Started" button: 32px height
- [ ] No collision

**Mobile (< 768px):**
- [ ] Logo visible (left)
- [ ] Hamburger menu icon (center-right)
- [ ] "Get Started" icon-only button (right): 36×36px
- [ ] Text "Get Started" hidden (icon only)
- [ ] Hamburger menu opens full-screen overlay
- [ ] No layout shift when menu opens

**Test Clicks:**
- [ ] Logo navigates to homepage
- [ ] Each nav link navigates correctly
- [ ] "Get Started" navigates to /chat
- [ ] Hamburger menu toggles open/close

---

### 2.3 Solutions Page Tiles

**Desktop (>= 1024px):**
- [ ] 2 columns layout
- [ ] 24px gap between tiles
- [ ] All 6 solutions visible (3 rows × 2 columns)

**Tablet (768-1023px):**
- [ ] 2 columns layout
- [ ] 20px gap

**Mobile (< 768px):**
- [ ] **Single column** layout
- [ ] 24px vertical gap
- [ ] Tiles take full width (minus 16px margin each side)
- [ ] No horizontal overflow
- [ ] Icons: 48×48px (reduced from 64×64px)

**Per Tile:**
- [ ] Custom SVG icon visible (NO EMOJIS)
- [ ] Category badge visible
- [ ] Title readable
- [ ] Summary text: max 2 lines (line-clamp)
- [ ] 3 feature bullets visible
- [ ] "Learn More" link clickable

---

### 2.4 Feature Grid

**Desktop (>= 1024px):**
- [ ] 3 columns layout
- [ ] All 6 features visible (2 rows × 3 columns)

**Tablet (768-1023px):**
- [ ] 2 columns layout
- [ ] 3 rows × 2 columns

**Mobile (< 768px):**
- [ ] **Single column** layout
- [ ] 6 rows × 1 column
- [ ] No overflow

---

### 2.5 Pricing Cards

**Desktop:**
- [ ] 3 columns (Starter, Professional, Enterprise)
- [ ] Middle tier (Professional) slightly elevated (featured)

**Mobile:**
- [ ] Single column stack
- [ ] Featured tier still distinguishable (border/glow)

---

## 3. EMOJI REMOVAL VERIFICATION

### 3.1 Automated Scan

**Run grep search:**
```bash
grep -r "[\u{1F300}-\u{1F6FF}]" src/
grep -r "[\u{1F900}-\u{1F9FF}]" src/
grep -r "[\u{2600}-\u{26FF}]" src/
```

**Expected Result:** 0 matches

### 3.2 Visual Inspection (All Pages)

**Pages to inspect:**
- [ ] Homepage
- [ ] Solutions page
- [ ] Features page
- [ ] Pricing page
- [ ] Security page
- [ ] FAQ page
- [ ] Docs page
- [ ] Chat page
- [ ] 404 page

**For each page:**
- [ ] No emoji characters visible in headings
- [ ] No emoji characters in body text
- [ ] No emoji characters in buttons or badges
- [ ] All icons are SVG-based (lucide-react)

### 3.3 Specific Component Checks

**Hero Trust Badges:**
- [ ] India flag emoji replaced with Shield/MapPin icon
- [ ] Lightning emoji replaced with Zap icon
- [ ] Lock emoji replaced with Lock icon

**FAQ Categories:**
- [ ] All category emojis replaced with SVG icons
- [ ] Icons render at 24×24px
- [ ] Icon color matches design system (cyan accent)

**Solution Tiles:**
- [ ] All 6 industry solution icons are SVG
- [ ] No emoji glyphs anywhere on tiles

---

## 4. ACCESSIBILITY TESTING

### 4.1 Keyboard Navigation

**Test Flow:**
1. Load homepage
2. Press Tab key repeatedly
3. Verify tab order:
   - [ ] Skip to content (hidden link)
   - [ ] Logo
   - [ ] Nav links (Features → Solutions → ... → FAQ)
   - [ ] Get Started CTA
   - [ ] Hero CTAs (Try Free → Read Docs)
   - [ ] Feature cards
   - [ ] Footer links

**For Each Interactive Element:**
- [ ] Focus ring visible (2px cyan, 2px offset)
- [ ] Element highlighted clearly
- [ ] Enter key activates links/buttons
- [ ] Esc key closes modals/menus

**Hamburger Menu (Mobile):**
- [ ] Tab focuses hamburger button
- [ ] Enter opens menu
- [ ] Focus trap within menu when open
- [ ] Esc closes menu
- [ ] Focus returns to hamburger button after close

### 4.2 Screen Reader Testing

**Tools:**
- VoiceOver (Mac): Cmd+F5
- NVDA (Windows): Free download
- JAWS (Windows): Commercial

**Test Procedure:**
1. Enable screen reader
2. Navigate homepage
3. Verify announcements:

**Hero Section:**
- [ ] H1 announced: "India's Most Trusted AI Platform"
- [ ] Buttons announced with role and label
- [ ] Chat panel announced as "AI Chat Preview" dialog

**Icons:**
- [ ] Icon-only buttons have aria-label
- [ ] Example: "Get Started" aria-label on mobile icon button

**Images:**
- [ ] All images have alt text
- [ ] Decorative images: alt="" (empty)

**Landmark Regions:**
- [ ] `<nav>` announced as "navigation"
- [ ] `<main>` announced as "main content"
- [ ] `<footer>` announced as "footer"

### 4.3 Color Contrast

**Use Tool:** Chrome DevTools Accessibility Panel or https://webaim.org/resources/contrastchecker/

**Required Ratios:**
- Normal text (< 18px): >= 4.5:1
- Large text (>= 18px): >= 3:1
- UI components: >= 3:1

**Test Combinations:**
- [ ] Primary text (#F6F7F8) on background (#0B0D0F): **Expected 16.8:1** ✓
- [ ] Secondary text (#AEB6BD) on background (#0B0D0F): **Expected 8.2:1** ✓
- [ ] Accent cyan (#3ABAD6) on background (#0B0D0F): **Expected 5.4:1** ✓
- [ ] Button text (white) on cyan (#3ABAD6): **Expected >= 4.5:1** ✓

### 4.4 Semantic HTML Audit

**Run validator:** https://validator.w3.org/

**Manual checks:**
- [ ] Proper heading hierarchy (H1 → H2 → H3, no skipped levels)
- [ ] Navigation wrapped in `<nav>`
- [ ] Main content in `<main>`
- [ ] Sections use `<section>` or `<article>`
- [ ] Buttons use `<button>` (not `<div>` with click handlers)
- [ ] Links use `<a>` with href

---

## 5. PERFORMANCE TESTING (LIGHTHOUSE)

### 5.1 Run Lighthouse Audit

**For Each Page:**
```bash
# Build production version
npm run build
npm run preview  # Serve on localhost:4173

# Run Lighthouse (Chrome DevTools)
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select:
   - Device: Desktop & Mobile (run both)
   - Categories: Performance, Accessibility, Best Practices, SEO
   - Mode: Navigation
4. Click "Analyze page load"
```

**Target Scores (Desktop):**
- [ ] Performance: >= 90
- [ ] Accessibility: >= 95
- [ ] Best Practices: >= 95
- [ ] SEO: >= 90

**Target Scores (Mobile):**
- [ ] Performance: >= 85
- [ ] Accessibility: >= 95
- [ ] Best Practices: >= 95
- [ ] SEO: >= 90

### 5.2 Core Web Vitals

**Required Thresholds:**
- [ ] **LCP (Largest Contentful Paint):** < 2.5s
- [ ] **CLS (Cumulative Layout Shift):** < 0.1
- [ ] **TTFB (Time to First Byte):** < 600ms
- [ ] **FCP (First Contentful Paint):** < 1.8s
- [ ] **TTI (Time to Interactive):** < 3.8s

**Test on:**
- [ ] Homepage
- [ ] Solutions page
- [ ] Pricing page

### 5.3 Performance Optimization Checks

**Images:**
- [ ] All images lazy-loaded (loading="lazy")
- [ ] Images served in modern formats (WebP/AVIF)
- [ ] Hero images < 200KB
- [ ] Icons embedded as SVG (not raster)

**CSS/JS:**
- [ ] Critical CSS inlined (if applicable)
- [ ] Non-critical CSS deferred
- [ ] Third-party scripts deferred or async
- [ ] No render-blocking resources

**Fonts:**
- [ ] Fonts preconnected (`<link rel="preconnect">`)
- [ ] Font-display: swap or optional

**Animations:**
- [ ] Max 3-5 glass elements with backdrop-filter per viewport
- [ ] Animations use GPU-accelerated properties (transform, opacity)
- [ ] No animating blur filters (static only)

---

## 6. CROSS-BROWSER TESTING

### 6.1 Required Browsers

**Desktop:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Mobile:**
- [ ] Safari iOS (iPhone 12+)
- [ ] Chrome Android (Pixel/Samsung)

### 6.2 Per Browser Test

**For Each Browser:**
1. Load homepage
2. Verify:
   - [ ] Glass effects render correctly (backdrop-filter supported)
   - [ ] Gradients display properly
   - [ ] Animations play smoothly (60fps)
   - [ ] No console errors
   - [ ] Fonts load correctly

**Safari-Specific:**
- [ ] Backdrop-filter works (requires -webkit- prefix)
- [ ] Smooth scrolling enabled

**Firefox-Specific:**
- [ ] backdrop-filter enabled (may require flag)
- [ ] Custom scrollbar styles applied

---

## 7. INTERACTION & ANIMATION TESTS

### 7.1 Button Hover States

**For Each Button:**
- [ ] Hover triggers translateY(-3px) on primary buttons
- [ ] Hover triggers translateY(-2px) on secondary buttons
- [ ] Shadow increases on hover
- [ ] Transition duration: 180ms
- [ ] Active state resets translateY(0)

**Test Buttons:**
- [ ] "Try It Free" (hero)
- [ ] "Read Documentation" (hero)
- [ ] "Get Started" (navbar)
- [ ] Pricing "Get Started" buttons
- [ ] Feature "Learn More" links

### 7.2 Card Hover States

**Feature Cards:**
- [ ] Hover triggers translateY(-6px)
- [ ] Border opacity increases
- [ ] Icon scales 1.1 and rotates 3deg
- [ ] Transition: 360ms

**Solution Tiles:**
- [ ] Same hover behavior as feature cards
- [ ] "Learn More" arrow shifts right on hover (gap increases)

### 7.3 Entrance Animations

**Hero Content:**
- [ ] Badge fades in + translates up (0ms delay)
- [ ] Headline fades in (100ms delay)
- [ ] Subhead fades in (200ms delay)
- [ ] Description fades in (300ms delay)
- [ ] CTAs fade in (400ms delay)
- [ ] Stats fade in (500ms delay)
- [ ] Chat panel fades in (600ms delay)

**Feature Grid:**
- [ ] Cards fade in sequentially (80ms stagger)
- [ ] All 6 cards animate in smoothly

### 7.4 Ambient Animations

**Floating Gradient Blobs (Hero Background):**
- [ ] 3 blobs visible (subtle, low opacity)
- [ ] Float animation: 8s duration, infinite loop
- [ ] Staggered delays (0s, 2s, 4s)
- [ ] No jank or stuttering

### 7.5 Reduced Motion

**Test:**
1. Enable reduced motion:
   - **Mac:** System Preferences → Accessibility → Display → Reduce motion
   - **Windows:** Settings → Ease of Access → Display → Show animations
2. Reload page

**Verify:**
- [ ] All animations disabled or drastically shortened (< 0.01s)
- [ ] Transitions still provide feedback (instant, no delay)
- [ ] No parallax effects
- [ ] No floating blobs

---

## 8. CONTENT & COPY VERIFICATION

### 8.1 AI-Cliché Removal

**Verify NO instances of:**
- [ ] "Built with AI" (casual tone)
- [ ] "Smart. Fast. Reliable." (generic triplet)
- [ ] "Experience the future"
- [ ] "Next-generation platform"
- [ ] Any emoji characters

### 8.2 Enterprise Tone

**Verify presence of:**
- [ ] "India's Most Trusted AI Platform"
- [ ] "Enterprise-grade"
- [ ] "Mission-critical applications"
- [ ] "ISO 27001 Certified"
- [ ] "99.9% Uptime SLA"
- [ ] "On-premise deployment options"

### 8.3 Button Copy

**Verify:**
- [ ] "Try It Free" (not "Get Started Free")
- [ ] "Read Documentation" (not "Learn More")
- [ ] "Contact Enterprise Sales" (not "Talk to Sales")

---

## 9. EDGE CASE TESTING

### 9.1 Extremely Large Text (Zoom)

**Test:**
1. Zoom browser to 200% (Cmd/Ctrl + +)
2. Verify:
   - [ ] Text remains readable
   - [ ] No horizontal overflow
   - [ ] Buttons remain clickable
   - [ ] Layout adapts gracefully

### 9.2 Long Content

**Test:**
1. Add extra feature bullets (beyond 3)
2. Verify:
   - [ ] line-clamp truncates text correctly
   - [ ] "..." ellipsis appears
   - [ ] Card height remains consistent

### 9.3 Slow Network

**Test:**
1. Chrome DevTools → Network → Throttle to "Slow 3G"
2. Reload page
3. Verify:
   - [ ] Loading spinners appear
   - [ ] Images lazy-load progressively
   - [ ] No broken layout during load
   - [ ] Fonts fallback gracefully

### 9.4 Offline Mode

**Test:**
1. Chrome DevTools → Network → Offline
2. Reload page
3. Verify:
   - [ ] Custom offline page OR graceful error message
   - [ ] No broken UI

---

## 10. REGRESSION TESTING

### 10.1 Existing Functionality

**Verify no regressions:**
- [ ] Chat page loads correctly
- [ ] Pricing tier selection works
- [ ] FAQ accordion expands/collapses
- [ ] Contact forms submit
- [ ] All routes navigate correctly

### 10.2 Third-Party Integrations

**If applicable:**
- [ ] Analytics tracking works (Google Analytics, etc.)
- [ ] retired-provider AI integration functional
- [ ] Payment gateways connected

---

## TEST EXECUTION REPORT TEMPLATE

**Tester:** _________________
**Date:** _________________
**Environment:** [ ] Localhost [ ] Staging [ ] Production

### Summary

| Category | Pass | Fail | Blocked | Notes |
|----------|------|------|---------|-------|
| Device Testing | __ / __ | __ | __ | |
| Responsive Behavior | __ / __ | __ | __ | |
| Emoji Removal | __ / __ | __ | __ | |
| Accessibility | __ / __ | __ | __ | |
| Performance (Lighthouse) | __ / __ | __ | __ | |
| Cross-Browser | __ / __ | __ | __ | |
| Interactions | __ / __ | __ | __ | |
| Content Verification | __ / __ | __ | __ | |
| Edge Cases | __ / __ | __ | __ | |
| Regression | __ / __ | __ | __ | |

### Critical Issues Found

1. _______________________________________________________________
2. _______________________________________________________________
3. _______________________________________________________________

### Sign-Off

**QA Lead:** _________________
**Date:** _________________
**Status:** [ ] Approved for Production [ ] Requires Fixes

---

**END OF QA CHECKLIST**
