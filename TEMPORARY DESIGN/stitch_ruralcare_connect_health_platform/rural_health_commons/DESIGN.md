---
name: Rural Health Commons
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#784b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin-mobile: 16px
  container-margin-desktop: 48px
  gutter: 16px
---

## Brand & Style
The design system is centered on **Reliability, Accessibility, and Compassion**. Designed for a rural healthcare ecosystem, it bridges the gap between sophisticated clinical data and human-centric patient care. 

The aesthetic follows a **Modern Corporate** approach with a **Tactile** warmth. It prioritizes high legibility and clear information hierarchy to reduce cognitive load for stressed patients and busy practitioners. The interface uses generous whitespace to prevent "information crowding," ensuring that even data-dense administrative views remain navigable and calm.

## Colors
This palette is anchored in **Blue-600** to project institutional trust and medical authority. **Emerald-500** serves as the secondary color, symbolizing health and vitality, used primarily for "positive" actions and growth metrics. 

The background utilizes **Slate-50**, providing a cool, sterile but welcoming canvas that reduces eye strain compared to pure white. **Amber-500** is reserved for alerts and warm highlights, providing a clear visual cue for items requiring attention without triggering the immediate panic of a red error state. Triage states must strictly follow the Green/Yellow/Red convention for safety.

## Typography
The design system exclusively uses **Inter** for its exceptional legibility and systematic neutral tone. 

- **Headlines:** Use Bold weights with slight negative letter-spacing for a modern, grounded feel.
- **Body Text:** Standard weight is 400. For patient-facing instructions, use `body-lg` to ensure accessibility for elderly users or those with visual impairments.
- **Labels:** Use Medium or Semibold weights to differentiate metadata from body content.
- **Mobile Adjustments:** Headlines must scale down significantly on mobile to avoid awkward line breaks in medical terminology.

## Layout & Spacing
The layout uses a **Fluid Grid** model with two distinct density profiles:
1.  **Patient/Worker View:** Wide margins (`xl` spacing), large touch targets, and a single-column stack on mobile.
2.  **Clinician/Admin View:** High-density 12-column grid on desktop, utilizing `sm` and `md` spacing to maximize information density for EHR (Electronic Health Record) management.

**Breakpoints:**
- **Mobile (<640px):** Single column, 16px margins, bottom-tab navigation.
- **Tablet (640px - 1024px):** 2-column layout for dashboard cards.
- **Desktop (>1024px):** 12-column layout with a fixed left-hand navigation sidebar for admins.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Ambient Shadows**. This design system avoids harsh borders in favor of soft, diffused shadows that lift interactive components off the Slate-50 background.

- **Level 0 (Background):** Slate-50.
- **Level 1 (Cards/Containers):** White background with a subtle 1px border (#E2E8F0) and a soft, low-opacity shadow (4px blur, 2% opacity).
- **Level 2 (Active/Hover):** Increased shadow spread (12px blur, 6% opacity) to indicate interactivity.
- **Level 3 (Modals/Popovers):** Highest elevation with a deep, diffused shadow and a background backdrop-blur (12px) to focus user attention.

## Shapes
The shape language is friendly and approachable. 
- **Standard UI Elements:** (Buttons, Inputs) use `rounded-md` (8px).
- **Cards & Primary Containers:** Use `rounded-xl` (24px) to create a soft, non-clinical feel that reduces patient anxiety.
- **Segmented Controls:** Use a "pill" style or `rounded-lg` for role selection to clearly differentiate them from standard action buttons.

## Components
- **Elevated Cards:** The primary container for health data. Must include a clear header, padding of `lg` (24px), and use the Level 1 elevation profile.
- **Segmented Controls:** Used for role switching (e.g., Doctor vs. Admin). Features a sliding background transition and high-contrast text for the active state.
- **Mobile Bottom Navigation:** Large icons (24px) with `label-sm` text. The active state uses a Primary Blue tint for the icon and a small 4px dot indicator.
- **Action Buttons:**
    - *Primary:* Solid Blue-600 with white text. High contrast (7:1+).
    - *Secondary:* Ghost style with Blue-600 border and text.
    - *Triage:* Small, circular badges (Green, Yellow, Red) placed at the top right of patient cards.
- **Input Fields:** Large tap targets (48px height minimum). Labels are always visible (no floating labels) to aid users with cognitive impairments.
- **Triage Indicators:** Use a semantic "Light" system. Red for "Critical/Urgent," Yellow for "Observation," Green for "Stable." Ensure these include text labels or icons for color-blind accessibility.