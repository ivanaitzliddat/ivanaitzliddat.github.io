# Ivan Tan · portfolio

A static React portfolio built with [Motion for React](https://motion.dev/docs/react) and Vite. It highlights selected public source repositories across security, AI, and product engineering. Project copy is intentionally limited to capabilities visible in those public repositories.

## Develop

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
```

The build writes `docs/`, which GitHub Pages serves from the `main` branch. Commit the rebuilt `docs/` files when changing the site. The site uses no runtime API, secrets, or private repository content. Edit `src/data.ts` to change project copy and links. Only add a link after its repository is public and reviewed.

Motion supports hover, filter, reveal, and dialog animations. Reduced-motion preferences remove nonessential movement; all content remains available through keyboard and touch.
