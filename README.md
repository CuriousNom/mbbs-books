# MBBS Book Library

An online medical textbook library designed for MBBS students.

---

## 📖 How to Use

- **Turning Pages**: Click the Next (<kbd>→</kbd>) or Prev (<kbd>←</kbd>) arrow buttons, or use the keyboard arrow keys.
- **Zooming & Panning**: Pinch with two fingers to zoom in and out freely, or double-tap anywhere on the page to quickly toggle 2x zoom. Drag with one finger to pan around when zoomed in.
- **HD Diagram Magnifier**: Click the magnifying glass icon (or press `Z`) on any page to open the diagram magnifier for detailed anatomy and histology views.
- **Navigation Tools**: Use the bottom bar slider to scrub through pages, or open the side drawer to jump to specific chapters, view page thumbnails, or manage bookmarks.
- **Themes & Sound**: Toggle between Midnight, Warm Parchment, and Daylight reading modes from the top bar. Click the speaker icon to mute or unmute the page turn sound.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `→` / `Space` / `PgDn` | Next Page |
| `←` / `PgUp` | Previous Page |
| `Z` | Open Diagram Magnifier |
| `Double Click / Tap` | Quick Zoom |
| `M` | Mute / Unmute Sound |
| `F` | Fullscreen |
| `Esc` | Close Reader / Drawer |

---

## ➕ Adding New Books

1. Place the book's page images (`1.webp`, `2.webp`, etc.) in:
   `books/<year>/<subject>/<book-name>/`
2. Add the book entry in `assets/js/catalog.js`:
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
