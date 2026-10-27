# Busem Deniz — Portfolio

Standalone portfolio website for **Busem Deniz**, prepared for GitHub Pages.

**Website:** https://aysebusemd-lab.github.io/

## Hosting

This is a static website: HTML, CSS, JavaScript, images, videos and PDFs. No Wix account, subscription, backend, build step or package installation is required.

In this repository, open **Settings → Pages**, choose **Deploy from a branch**, then **main** and **/ (root)**.

To preview locally, serve this folder with any static web server. Use a local web server when checking mobile layouts and embedded media.

## Pages

- `index.html` — homepage and selected work
- `portfolio-1.html` — all eleven portfolio projects
- `about.html` — biography, social links and downloadable CV
- `contact.html` — email and social contact links
- `room1.html` — College Student Bedroom
- `harry-potter.html` — Wingardium Leviosa in LEGO
- `zooble.html` — Piece by Piece eyeshadow palette
- `paranoia-1.html` — Paranoia
- `aura-1.html` — AURA Light
- `anitkabir.html` — Anıtkabir: The Revival
- `copy-of-zoobleanim.html` — Mortal Balance
- `copy-of-gamegraphics.html` — Motion Graphics
- `copy-of-motiongraphs.html` — 3D VFX
- `wanderwood.html` — WanderWood
- `zoobleanim.html` — ongoing character and product animation
- `blog.html` — the unused legacy demo blog listing

Original project slugs also work through redirects. `404.html` provides a return link if someone opens an unknown URL.

## Editing

Desktop text and links are in each root HTML file. Responsive mobile content is in the `.mobile-site` section of each root HTML file, with matching standalone views in `mobile/`; update both when changing copy or links. Keep all `data-mesh-id` attributes, which control the original Wix grid layouts.

Below 1024px, the mobile content is part of the page itself and reflows with the available width. It uses normal document flow, flexible media, wrapping controls, and automatic-height project title cards. No scaling canvas or iframe is used. The footer follows the page content. Standalone mobile URLs remain usable.

- `portable.css` contains the added responsive layout and gallery styles.
- `portable.js` controls carousels, image enlargement, desktop fitting, and the mobile page loader.
- `mobile/mobile.css` supplies mobile media controls and the menu behavior styles.
- `mobile/mobile.js` handles responsive mobile menus, keyboard navigation, and project media.
- Homepage autoplay advances only the visible gallery nearest the screen center, every three seconds; manual navigation restarts the timer. Menus, lightboxes, and hidden tabs pause autoplay.
- `assets/` contains local media, fonts and preserved styles.
- `content.json` is a reference catalog of captured copy and links.
- `asset-manifest.json` records public source URLs and their local filenames.

The files in this folder are the deployable source. Keep the `assets/` folder beside the HTML files.

## Migration details

The sixteen original pages, collage artwork, CV, linked PDFs, image galleries, GIFs and Wix-hosted video clips were migrated. Both desktop and mobile styling are retained locally from their original Wix layouts. Phone layouts, carousel controls and image enlargement run without Wix services. The mobile restoration was checked on all sixteen pages across 128 page/viewport combinations from 280px to 1280px, including landscape phones, including navigation, media controls, missing local references, and horizontal overflow.

Eight unavailable Harry Potter gallery images were restored from your October 14–15, 2026 screenshots. The original screen recordings and screenshots on your laptop were not modified.

The Harry Potter cinematic remains the original YouTube embed. Project links to YouTube, ArtStation, itch.io, CrazyGames and social profiles remain external. Email and telephone links open the visitor's own apps.

The unused blog page contained Wix demo-post links rather than original portfolio posts; those external article links are retained. Live blog comments, account features and like counters are not connected to a backend.

Copyright © 2026 Busem Deniz. Artwork is not licensed for reuse by this repository.

