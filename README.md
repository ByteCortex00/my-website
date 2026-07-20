# Personal Portfolio Website

Portfolio site for Peter Njuguna — full-stack software engineer (MERN, Python AI/ML), based in Nairobi. Built with plain HTML, CSS, and vanilla JavaScript. No build step, no dependencies.

## Deployment

https://peternjuguna.netlify.app/ — deploys from `main`.

## Design

Editorial minimal: a warm off-white canvas, a single bronze accent, and large Archivo display type doing the work instead of colour. Body copy is Inter; labels and tags are JetBrains Mono.

## Sections

1. **Hero** — rotating role line (typing effect), availability badge, primary CTAs
2. **About** — professional summary with animated statistic counters
3. **Services** — what the work actually covers
4. **Skills** — grouped by category, with proficiency bars that fill on scroll
5. **Work** — project cards, filterable by category, with tech-stack tags
6. **Contact** — Netlify-backed contact form, plus direct email

## Tech

- HTML5, CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript — no framework
- Google Fonts (Archivo, Inter, JetBrains Mono)
- Font Awesome 6 for icons
- Netlify Forms for the contact form

## Running locally

No build step. Either open `index.html` directly, or serve the folder:

```bash
py -m http.server 5500
# then visit http://localhost:5500
```

For live reload, the "Live Server" VS Code extension works well.

## File structure

```
my-website/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Notes

- The contact form relies on Netlify Forms. It needs the hidden `<form name="contact" netlify ...>` detection stub in `index.html` and the `form-name` hidden input inside the visible form — removing either silently breaks submissions.
- Project images are hotlinked from Pexels, so an internet connection is required to see them.
- Responsive breakpoints are at 900px, 768px, and 480px.
- Scroll-triggered animations use `IntersectionObserver`.

## Browser support

Current versions of Chrome, Firefox, Safari, and Edge.

## Contact

Via the contact form on the site, or njungush444@gmail.com.
