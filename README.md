# MBBS Book Library 🩺 📖

A fast, lightweight medical textbook reader for MBBS students, running directly on **GitHub Pages** with zero build configuration.

---

## ✨ Features

- **Realistic 3D Page Turn**: Smooth paper curl physics and curved shadows on Next/Prev clicks.
- **Finger Touch Pinch & Pan**: Freely pinch-to-zoom (up to 4.0x) and pan across pages with fingers without accidental page flips.
- **HD Diagram Magnifier**: Inspect fine anatomical labels and histological diagrams with multi-touch pinch zoom, pan swipe, and quick page navigation.
- **Natural Paper Sound**: Lightweight procedural page-turning audio via Web Audio API (with 1-click mute).
- **Responsive Spread**: Automatic two-page spread on desktop/tablets and single-page view on mobile.
- **Study Tools**: Table of Contents, visual thumbnails, bookmarks, progress auto-resume (`localStorage`), and custom reading themes (Midnight, Warm Parchment, Crisp Paper).

---

## 📂 Project Structure

```text
mbbs-books/
├── index.html                   # Main application entry point
├── assets/
│   ├── css/style.css            # Android 17 Material Design 3 UI
│   ├── js/
│   │   ├── catalog.js           # MBBS curriculum & book list
│   │   ├── reader.js            # Flipbook, gesture zoom & magnifier
│   │   ├── audio.js             # Web Audio sound synthesizer
│   │   └── app.js               # Portal search & shelf controller
│   └── vendor/
│       └── page-flip.browser.js # StPageFlip engine
└── books/                       # WebP textbook pages by year & subject
```

---

## ➕ Adding New Books

1. Convert PDF pages to WebP (`1.webp`, `2.webp`, etc.).
2. Place them into `books/<year>/<subject>/<book-id>/`.
3. Register the book in `assets/js/catalog.js`:
   ```javascript
   {
     id: "guyton-hall",
     title: "Guyton and Hall Textbook of Medical Physiology",
     totalPages: 1150,
     basePath: "books/1st-year-mbbs/physiology/guyton-hall/",
     cover: "books/1st-year-mbbs/physiology/guyton-hall/1.webp",
     available: true
   }
   ```

---

## ⌨️ Shortcuts

| Key | Action |
| --- | --- |
| `→` / `Space` / `PgDn` | Next Page |
| `←` / `PgUp` | Previous Page |
| `Z` | Toggle HD Diagram Magnifier |
| `Double Tap / Click` | Toggle 2.2x Zoom |
| `M` | Toggle Page Turn Sound |
| `F` | Fullscreen |
| `Esc` | Close Magnifier / Exit Reader |
