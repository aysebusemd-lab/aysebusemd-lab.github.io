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

Desktop text and links are in each root HTML file. The sixteen original Wix mobile layouts are preserved separately in `mobile/`; update the matching mobile document when changing copy or links. Keep all `data-mesh-id` attributes, which control the original Wix grid layouts.

Below 768px, each root page loads its matching mobile document in an isolated, automatically sized frame. The original 320px mobile canvas scales to the available phone width. Navigation keeps the root page URLs. The frame isolates mobile styling from the recovered desktop designs.

- `portable.css` contains the added responsive layout and gallery styles.
- `layout-fixes.css` keeps project headings, tags and introductions together and styles the shared contact footer. It loads after the captured Wix styles in both desktop and mobile pages.
- `portable.js` controls carousels, image enlargement, desktop fitting, and the mobile page loader.
- `mobile/mobile.css` supplies mobile media controls and the menu behavior styles.
- `mobile/mobile.js` scales the original mobile layouts, reports their height, and handles mobile menus and project media.
- The contact footer uses the same markup on every desktop and mobile page, including the internship note, email, social links and copyright. Mobile height reports include the footer and update when it changes size; directly opened mobile pages can scroll normally.
- Homepage autoplay advances only the visible gallery nearest the screen center, every three seconds; manual navigation restarts the timer. Menus, lightboxes, and hidden tabs pause autoplay.
- `assets/` contains local media, fonts and preserved styles.
- `content.json` is a reference catalog of captured copy and links.
- `asset-manifest.json` records public source URLs and their local filenames.

The files in this folder are the deployable source. Keep the `assets/` folder beside the HTML files.

## Migration details

The sixteen original pages, collage artwork, CV, linked PDFs, image galleries, GIFs and Wix-hosted video clips were migrated. Both desktop and mobile styling are retained locally from their original Wix layouts. Phone layouts, carousel controls and image enlargement run without Wix services. The mobile restoration was checked on all sixteen pages at 320px, 390px, and 430px, including navigation, media controls, missing local references, and horizontal overflow.

Eight unavailable Harry Potter gallery images were restored from your October 14–15, 2026 screenshots. The original screen recordings and screenshots on your laptop were not modified.

The Harry Potter cinematic remains the original YouTube embed. Project links to YouTube, ArtStation, itch.io, CrazyGames and social profiles remain external. Email and telephone links open the visitor's own apps.

The unused blog page contained Wix demo-post links rather than original portfolio posts; those external article links are retained. Live blog comments, account features and like counters are not connected to a backend.

Copyright © 2026 Busem Deniz. Artwork is not licensed for reuse by this repository.

