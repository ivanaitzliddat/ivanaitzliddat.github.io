# Ivan Tan / Cybersecurity + Applied AI

A recruiter-focused, static React portfolio for GitHub Pages. The visual system uses dark ink, restrained cyan and green, and code-native illustrations of evaluation, trust boundaries, and operational workflows.

## Content structure

- Three selected public implementations: Phish Signal Lab, FrameVigil, and Miles Tracker. Each case study separates implementation, inspection evidence, limitations, and next validation.
- A separate final-year research overview, without invented results or unpublished artifacts.
- Supporting engineering work, current and upcoming experience, academic credentials, and contact links.
- A clearly labelled future direction. The potential CTF collection is not presented as implemented work.

Employment and academic information comes from the owner's supplied resume and role updates. Only reviewed public repositories are linked. Private project names, assessment content, original PDF documents, secrets, and internal screenshots are not included. The original research report and benchmark artifacts are not hosted here.

## Develop and build

```sh
npm ci
npm run dev
npm run build
```

Vite writes the static build to `docs/`. GitHub Pages serves that directory from the repository's `main` branch. The owner has authorized publication of this public-only portfolio. The build workflow installs the lockfile dependencies, type-checks and builds, validates the generated public bundle, and only then commits `docs/` and explicitly requests a branch-based Pages build. It does not change Pages hosting settings. A source-only push is not deployment success.

Edit `src/data.ts` to update project copy and experience. Only add project content or source links after the owner has approved the public wording. Do not use inclusion in the local draft as permission to change repository visibility.

## Interaction and accessibility

- `?focus=security`, `?focus=ai`, and `?focus=engineering` select a role-specific view.
- `?project=phish-signal-lab` opens a case study directly.
- Native modal dialogs provide keyboard focus containment and Escape dismissal. Closing restores focus to the invoking control; a direct-linked case falls back to the selected filter.
- Navigation and filtering use semantic links and buttons, with visible keyboard focus and a skip link.
- Responsive layouts support small screens. Reduced-motion preferences remove reveal motion and smooth scrolling.
- The page has a no-JavaScript summary and source links. Fonts have local fallbacks; no runtime API or account is required.

## Verification status

The dependency directory is incomplete. The Sites dependency helper initially resolved a missing checkout-local npm CLI. Using the explicit installed npm CLI reached package downloads, but they failed with `EACCES`; npm then exited with `Exit handler never called!`. The build command consequently fails because `tsc` is unavailable. This is a dependency/environment blocker, not a diagnosed source compilation error.

`git diff --check` passes. Syntax-only TypeScript transpilation of `src/App.tsx`, `src/data.ts`, `src/main.tsx`, and `vite.config.ts` using the already installed compiler in another local checkout reports zero syntax diagnostics. An additional strict TypeScript compatibility check of the application against already installed React, Motion, Lucide, and Vite declarations in other local checkouts also reports zero diagnostics. Content checks validate required fields, unique project IDs, and allowed GitHub URL owners; they do not test HTTP responses or establish that every linked page exists. The implementation deep links were corrected against the audited repository paths. Those dependency versions are not the portfolio's lockfile installation: the checks do not replace its own dependency-backed build or browser QA.

The remote build workflow is the canonical build route while local networking is restricted. Builds on `portfolio-cyber-ai` only validate and upload the static artifact; builds on `main` publish through the existing `main` / `docs` source. `docs/build.json` records the source revision used for a successful generated bundle. Publishing rejects stale source revisions, stages only generated files, uses a normal push, and requests Pages explicitly because bot commits do not automatically trigger branch-based Pages builds. Browser QA is still unverified until performed separately.

Before publication: restore dependencies, run the build, inspect desktop/mobile layouts and dialog keyboard behavior, recheck role dates and public wording, and replace `docs/` with the successfully generated output. Do not copy the source resume or profile PDF into public assets.

