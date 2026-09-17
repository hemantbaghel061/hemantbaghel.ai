# Hemant Baghel — Portfolio

AI & Computer Vision engineer portfolio. Next.js 16 (App Router) + TypeScript
+ Tailwind CSS v4 + React Three Fiber + GSAP + Lenis.

## Interactive additions

Inspired by crechetank.com's patterns (not its visual concept, which is a
whimsical illustrated aquarium — a different brand fit than this site):

- **Boot gate** (`src/components/Loader.tsx`): a real animated boot
  sequence with a progress bar, ending in a click-to-enter "ENTER SYSTEM"
  button rather than an auto-dismissing loader.
- **Floating 3D work shelf** (`src/components/scenes/WorkScene.tsx`): each
  project renders as a small 3D object (aircraft, ArUco marker, QR tag,
  detection cube) drifting above the Work list on desktop. Hovering a
  project in the list highlights its object in the 3D shelf.
- **Floating contact orbs**: Email / LinkedIn / GitHub / Resume in Contact
  are now gently floating circular buttons instead of flat links.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## Media assets

Your real assets are already wired in:

- **Hero background**: your video plays two ways — a blurred, very
  low-opacity ambient layer behind the 3D scene, and a small crisp
  "OPERATOR.FEED" panel (bottom-right on desktop) that shows it uncropped
  at its true portrait aspect ratio, so nothing gets stretched or cut off.
  The first ~2.3s of the source clip (a fake browser-chrome overlay baked
  into the file) was trimmed out, since it read as an ad template rather
  than real footage of you. It pauses automatically if the visitor's
  system has "reduce motion" enabled.
- **Portrait** (`public/images/profile/hemant-portrait.webp`) appears in the
  About section with a grayscale/duotone "scan frame" treatment matching the
  site's computer-vision aesthetic.
- **DRDO and IIT Jammu logos** (`public/images/logos/`) appear as
  affiliation badges next to their entries in the Experience timeline.
- **India flag** appears as a small accent next to the Research section's
  IIT Jammu tag.
- **Fighter jet photo** (`public/images/projects/fighter-jet.webp`) is
  composited with an animated HUD/detection overlay for both the Aircraft
  Classification System and Arrester Barrier case studies.
- **Resume**: your real PDF is at `public/resume/Hemant-Baghel-Resume.pdf`
  and already linked from the navbar and contact section.

All images were converted to `.webp` and resized for web performance; the
video was trimmed, re-encoded and had its audio stripped.

## Content sync note

This build's content was aligned to your uploaded resume. Two changes worth
knowing about:

- **Added**: the Aircraft Classification System (ACS) project, matching
  your AHOMLAMA role — now project 01 in Work.
- **Removed**: Signature Verification and the standalone "Adversarial AI
  Research" project card, since neither appears under "Technical Projects"
  in the current resume (the adversarial robustness work is still covered
  in the dedicated Research section, matching how the resume presents it
  under Experience rather than as a project). If you'd rather keep
  Signature Verification listed, it's easy to re-add.

## Notes on this build

- **Fonts are self-hosted** via `@fontsource` (Space Grotesk, Inter,
  JetBrains Mono) rather than `next/font/google`, because the environment
  this was built in couldn't reach `fonts.googleapis.com`. If your deploy
  target can reach Google Fonts and you'd prefer `next/font`, swap the
  imports in `src/app/layout.tsx` — everything else is unaffected.
- The hero's 3D scene (`src/components/scenes/HeroScene.tsx`) is procedural
  geometry — a low-poly aircraft and an ArUco-style marker — built directly
  in Three.js/R3F. No external `.glb` files are required for it to work.
- A right-hand "mission progress" rail (`src/components/SectionProgress.tsx`)
  tracks which section you're viewing and lets you jump between them —
  the site's one deliberate nod to a game-like HUD, kept subtle so it
  doesn't get in a recruiter's way.

## Adding more assets

- **Resume**: add `Hemant-Baghel-Resume.pdf` to `public/resume/`. The
  "Resume" links in the navbar and contact section already point to
  `/resume/Hemant-Baghel-Resume.pdf`.
- **More project screenshots**: `public/images/projects/` — wire into
  `src/components/ProjectVisual.tsx` or `src/data/projects.ts`.
- **3D models**: `public/models/` — if you'd rather load real `.glb` models
  instead of the procedural geometry, use `@react-three/drei`'s `useGLTF`
  inside the relevant scene component.

## Editing content

All copy lives in `src/data/`:

- `projects.ts` — the five case studies (title, description, tech, case
  study sections, GitHub links)
- `experience.ts` — the three roles on the timeline
- `skills.ts` — skill matrix + achievements

Section components (`src/components/*.tsx`) pull from these files, so
editing content doesn't require touching layout code.

## Structure

```
src/
├── app/
│   ├── page.tsx           # assembles all sections
│   ├── layout.tsx         # fonts, metadata
│   ├── sitemap.ts
│   └── work/[id]/page.tsx # case study pages
├── components/
│   ├── scenes/             # Three.js/R3F: Aircraft, ArucoMarker, HeroScene
│   ├── ui/BrandIcons.tsx   # GitHub/LinkedIn marks (lucide-react dropped brand icons)
│   └── *.tsx               # Navbar, Hero, Work, Experience, Research, Lab, etc.
└── data/                   # all editable content
```

## Known trade-offs

- No automated screenshot QA was possible in the build environment (no
  browser binary, and downloading one was network-restricted). The build
  passes, all routes return 200, ESLint is clean, and content was verified
  by inspecting rendered HTML — but a manual look in an actual browser is
  worth doing before you ship, especially for the 3D hero scene, the video
  background, and mobile layout.
