# MBBS Book Library 🩺 📖

An online medical textbook library with realistic page-turning for MBBS students.

---

## ✨ Features

- **3D Page Turn**: Smooth, realistic page-turning when clicking Next/Prev buttons.
- **Pinch to Zoom & Pan**: Pinch to zoom in on any page and drag freely to pan around.
- **HD Diagram Magnifier**: Inspect detailed anatomical diagrams and illustrations up close.
- **Page Sound**: Realistic paper flip sound effect (with mute toggle).
- **Desktop & Mobile Friendly**: 2-page book spread on desktop, single-page view on phones.
- **Reading Tools**: Chapters list, page thumbnails, bookmarks, and night/sepia reading themes.
- **Saves Progress**: Automatically remembers your last read page.

---

## ⌨️ Shortcuts

| Key | Action |
| --- | --- |
| `→` / `Space` / `PgDn` | Next Page |
| `←` / `PgUp` | Previous Page |
| `Z` | Open Diagram Magnifier |
| `Double Tap / Click` | Quick Zoom |
| `M` | Mute / Unmute Sound |
| `F` | Fullscreen |
| `Esc` | Close / Exit |

---

## ➕ Adding Books

1. Place page images (`1.webp`, `2.webp`, etc.) in `books/<year>/<subject>/<book-name>/`.
2. Add book details to `assets/js/catalog.js`:
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
