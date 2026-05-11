# Required local font assets

This project intentionally keeps the original Font Awesome implementation: templates render `fa-*` classes and the bundled `public/assets/css/legacy-styles.bundle.css` contains the original `@font-face` declarations.

No icon fallback layer is used. If these font files are missing in deployment, the affected Font Awesome icons will not render.

Restore these licensed font files from the original project before deploying:

- `public/assets/fonts/fa-brands-400.woff2`
- `public/assets/fonts/fa-brands-400.ttf`
- `public/assets/fonts/fa-light-300.woff2`
- `public/assets/fonts/fa-light-300.ttf`
- `public/assets/fonts/fa-regular-400.woff2`
- `public/assets/fonts/fa-regular-400.ttf`
- `public/assets/fonts/fa-solid-900.woff2`
- `public/assets/fonts/fa-solid-900.ttf`

The original archive also contained duplicated legacy paths under `public/assets/assets/fonts/`. If any deployed HTML or CSS still references `/assets/assets/fonts/*`, keep the same files there too.
