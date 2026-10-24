# MBBS Book Library 🩺 📖

An interactive, 3D realistic medical textbook reader built specifically for MBBS students, designed to run smoothly on **GitHub Pages** with zero build configuration.

![MBBS Book Library](books/1st-year-mbbs/anatomy/bdc-vol-1/1.webp)

---

## ✨ Features

- **Realistic 3D Page Turn Animation**: Authentic page curling, curved shadows, and tactile paper physics powered by `StPageFlip`.
- **Natural Paper Sound Effects**: Real-time organic page rustle synthesized with the Web Audio API (zero audio download delay, works 100% offline, with 1-click mute).
- **Physical Book Thickness Simulation**: Dynamic layered paper edges on the left and right stacks showing realistic page thickness as you progress.
- **Center Spine Crease**: Realistic center valley fold shadow when open in double-page spread.
- **Dual & Single Page Modes**: Automatic 2-page spread on desktop/laptops and single-page flip on mobile phones.
- **HD Diagram Magnifier**: Double-click or click the zoom button on any page to open a pan-and-zoom inspection viewer for fine anatomical labels, nerve paths, and histological diagrams.
- **Auto-Resume & Reading Progress**: Remembers your last read page per book via `localStorage` with a "Continue Reading" shelf.
- **Search & Catalog Navigation**: Instant search by book title, subject, author, or organ system with year filter tabs.
- **Table of Contents & Thumbnails**: Instant jump to any chapter or browse visual page thumbnails.
- **Bookmarks**: Save important dissection diagrams, clinical notes, or high-yield exam pages with 1 click.
- **Eye-Comfort Reading Themes**:
  - **Midnight Slate**: Dark OLED-friendly contrast.
  - **Warm Parchment**: Sepia tone with mahogany desk background for late-night study sessions.
  - **Crisp Paper**: Clean, high-contrast daylight mode.

---

## 📂 Folder Structure

```text
mbbs-books/
├── index.html                           # Main web application entry point
├── assets/
│   ├── css/
│   │   └── style.css                    # Material 3 UI and book reader styling
│   └── js/
│       ├── catalog.js                   # Master MBBS curriculum metadata
│       ├── audio.js                     # Realistic Web Audio paper rustle synthesizer
│       ├── reader.js                    # High-res reader, gesture zoom, bookmarks controller
│       └── app.js                       # Library portal & search application
└── books/
    ├── 1st-year-mbbs/
    │   ├── anatomy/
    │   │   ├── bdc-vol-1/               # BD Chaurasia Vol 1 (378 pages)
    │   │   ├── bdc-vol-2/               # BD Chaurasia Vol 2 (562 pages)
    │   │   └── bdc-vol-3-4/             # BD Chaurasia Vol 3 & 4 (640 pages)
    │   ├── physiology/                  # Guyton & Hall, Ganong, AK Jain
    │   └── biochemistry/                # Satyanarayana, Vasudevan
    ├── 2nd-year-mbbs/                   # Pathology, Pharmacology, Microbiology
    ├── 3rd-year-mbbs/                   # Ophthalmology, ENT, PSM, Forensic
    └── 4th-year-mbbs/                   # Medicine, Surgery, OBGYN, Pediatrics
```

---

## 🚀 How to Deploy to GitHub Pages

1. **Commit and push** the repository:
   ```bash
   git add .
   git commit -m "Initialize MBBS Book Library with 3D Flipbook Reader"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub: `https://github.com/CuriousNom/mbbs-books`
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Branch**:
     - Select branch: `main`
     - Select folder: `/ (root)`
     - Click **Save**.
   - Your site will be live at:
     ```
     https://curiousnom.github.io/mbbs-books/
     ```

---

## ➕ How to Add More Books

1. Convert your PDF pages to WebP format:
   ```bash
   # Example using pdftoppm + cwebp:
   pdftoppm -png -r 150 book.pdf page
   for f in page-*.png; do
     num=$(echo $f | sed 's/page-0*//' | sed 's/\.png//')
     cwebp -q 80 "$f" -o "${num}.webp"
     rm "$f"
   done
   ```
2. Place the resulting files into the appropriate folder:
   `books/1st-year-mbbs/physiology/guyton-hall/1.webp`, `2.webp`, etc.
3. Open [assets/js/catalog.js](file:///home/aryan/mbbs-books/assets/js/catalog.js) and update the book's properties:
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

## ⌨️ Keyboard Shortcuts in Reader

- **`Right Arrow` / `Space` / `Page Down`**: Next Page
- **`Left Arrow` / `Page Up`**: Previous Page
- **`Home` / `End`**: Cover Page / Last Page
- **`Z`**: Toggle High-Definition Diagram Magnifier
- **`M`**: Mute / Unmute Page Turn Sound
- **`F`**: Toggle Fullscreen
- **`Esc`**: Exit Reader or Close Active Drawer
