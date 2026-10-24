// MBBS Book Library - Realistic 3D Book Reader Controller

class MBBSReader {
  constructor() {
    this.currentBook = null;
    this.currentPage = 0; // 0-indexed for PageFlip
    this.totalPages = 0;
    this.pageFlip = null;
    // HD Magnifier Zoom & Pan properties
    this.zoomScale = 1.0;
    this.zoomPanX = 0;
    this.zoomPanY = 0;
    this.zoomIsPanning = false;
    this.zoomIsPinching = false;
    this.zoomPinchStartDist = 0;
    this.zoomPinchStartScale = 1.0;
    this.zoomPanStartX = 0;
    this.zoomPanStartY = 0;
    this.zoomLastTapTime = 0;
    this.zoomLastTapX = 0;
    this.zoomLastTapY = 0;

    this.currentTheme = localStorage.getItem('mbbs_reader_theme') || 'default';
    this.activeDrawer = null;
    this.isSinglePage = false;

    // Stage Zoom & Pan properties
    this.stageZoom = 1.0;
    this.stagePanX = 0;
    this.stagePanY = 0;
    this.isPanning = false;
    this.isPinching = false;
    this.isFlipping = false;
    this.panStartX = 0;
    this.panStartY = 0;
    this.initialPinchDistance = 0;
    this.initialPinchZoom = 1.0;
    this.pinchCenterX = 0;
    this.pinchCenterY = 0;
    this.lastTapTime = 0;
    this.lastTapX = 0;
    this.lastTapY = 0;

    this.initDOMElements();
    this.attachEventListeners();
    this.applyTheme(this.currentTheme);
  }

  initDOMElements() {
    this.modal = document.getElementById('reader-modal');
    this.bookContainer = document.getElementById('book-flip-container');
    this.bookTitleEl = document.getElementById('reader-book-title');
    this.bookChapterEl = document.getElementById('reader-book-chapter');
    this.pageIndicatorEl = document.getElementById('reader-page-indicator');
    this.pageSlider = document.getElementById('reader-page-slider');
    this.jumpInput = document.getElementById('reader-jump-input');
    this.jumpTotalEl = document.getElementById('reader-jump-total');
    
    // Depth stacks & Spine
    this.depthStackLeft = document.getElementById('book-depth-left');
    this.depthStackRight = document.getElementById('book-depth-right');
    this.spineCrease = document.getElementById('book-spine-crease');

    this.stageContainer = document.querySelector('.reader-stage-container');
    this.stageWrapper = document.getElementById('book-3d-wrapper');
    this.zoomLevelText = document.getElementById('zoom-level-text');

    // Drawers
    this.chaptersDrawer = document.getElementById('drawer-chapters');
    this.thumbnailsDrawer = document.getElementById('drawer-thumbnails');
    this.bookmarksDrawer = document.getElementById('drawer-bookmarks');
    this.chaptersListEl = document.getElementById('drawer-chapters-list');
    this.thumbnailsGridEl = document.getElementById('drawer-thumbnails-grid');
    this.bookmarksListEl = document.getElementById('drawer-bookmarks-list');

    // HD Zoom
    this.zoomModal = document.getElementById('zoom-modal');
    this.zoomImage = document.getElementById('zoom-image');
    this.zoomTitle = document.getElementById('zoom-title');
  }

  attachEventListeners() {
    // Back button
    document.getElementById('btn-reader-back')?.addEventListener('click', () => this.closeReader());

    // Navigation arrows
    document.getElementById('btn-flip-prev')?.addEventListener('click', () => this.flipPrev());
    document.getElementById('btn-flip-next')?.addEventListener('click', () => this.flipNext());

    // Floating Stage Zoom Dock Buttons
    document.getElementById('btn-stage-zoom-in')?.addEventListener('click', () => this.adjustStageZoom(0.35));
    document.getElementById('btn-stage-zoom-out')?.addEventListener('click', () => this.adjustStageZoom(-0.35));
    document.getElementById('btn-stage-zoom-reset')?.addEventListener('click', () => this.resetStageZoom());

    // Initialize Hand / Touch Gesture Zoom Engine
    this.initHandGestureZoom();

    // Slider scrubbing
    this.pageSlider?.addEventListener('input', (e) => {
      const targetPage = parseInt(e.target.value, 10);
      this.turnToPage(targetPage - 1);
    });

    // Jump form
    document.getElementById('form-jump')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = parseInt(this.jumpInput.value, 10);
      if (!isNaN(val) && val >= 1 && val <= this.totalPages) {
        this.turnToPage(val - 1);
      }
    });

    // Theme toggle
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
      const themes = ['default', 'sepia', 'light'];
      const nextIndex = (themes.indexOf(this.currentTheme) + 1) % themes.length;
      this.applyTheme(themes[nextIndex]);
    });

    // Audio sound toggle
    const btnSound = document.getElementById('btn-sound-toggle');
    btnSound?.addEventListener('click', () => {
      const enabled = window.soundManager.toggle();
      this.updateSoundButtonUI(enabled);
    });
    this.updateSoundButtonUI(window.soundManager.enabled);

    // Fullscreen toggle
    document.getElementById('btn-fullscreen-toggle')?.addEventListener('click', () => this.toggleFullscreen());

    // HD Zoom open & navigation
    document.getElementById('btn-zoom-toggle')?.addEventListener('click', () => this.openHDZoom());
    document.getElementById('btn-zoom-close')?.addEventListener('click', () => this.closeHDZoom());
    document.getElementById('btn-zoom-prev')?.addEventListener('click', () => this.prevHDZoomPage());
    document.getElementById('btn-zoom-next')?.addEventListener('click', () => this.nextHDZoomPage());
    document.getElementById('btn-zoom-in')?.addEventListener('click', () => this.adjustZoom(0.35));
    document.getElementById('btn-zoom-out')?.addEventListener('click', () => this.adjustZoom(-0.35));
    document.getElementById('btn-zoom-reset')?.addEventListener('click', () => this.resetZoom());

    // Window resize / orientation change (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      if (this.modal?.classList.contains('active')) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.initFlipbook();
        }, 250);
      }
    });

    // Bookmark toggle
    document.getElementById('btn-bookmark-toggle')?.addEventListener('click', () => this.toggleCurrentBookmark());

    // Drawer triggers
    document.getElementById('btn-toggle-chapters')?.addEventListener('click', () => this.toggleDrawer('chapters'));
    document.getElementById('btn-toggle-thumbnails')?.addEventListener('click', () => this.toggleDrawer('thumbnails'));
    document.getElementById('btn-toggle-bookmarks')?.addEventListener('click', () => this.toggleDrawer('bookmarks'));

    // Drawer close buttons
    document.querySelectorAll('.btn-drawer-close').forEach(btn => {
      btn.addEventListener('click', () => this.closeAllDrawers());
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.target.tagName === 'INPUT') return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'PageUp':
          if (this.zoomModal?.classList.contains('active')) {
            this.prevHDZoomPage();
          } else {
            this.flipPrev();
          }
          break;
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          if (this.zoomModal?.classList.contains('active')) {
            this.nextHDZoomPage();
          } else {
            this.flipNext();
          }
          break;
        case 'Home':
          this.turnToPage(0);
          break;
        case 'End':
          this.turnToPage(this.totalPages - 1);
          break;
        case 'f':
        case 'F':
          this.toggleFullscreen();
          break;
        case 'm':
        case 'M':
          const enabled = window.soundManager.toggle();
          this.updateSoundButtonUI(enabled);
          break;
        case 'z':
        case 'Z':
          this.openHDZoom();
          break;
        case 'Escape':
          if (this.zoomModal.classList.contains('active')) {
            this.closeHDZoom();
          } else if (this.activeDrawer) {
            this.closeAllDrawers();
          } else {
            this.closeReader();
          }
          break;
      }
    });

    // Zoom dragging
    this.initZoomDraggable();
  }

  openBook(book, initialPage = 1) {
    if (!book || !book.available) {
      alert('This book is currently being prepared and will be available soon!');
      return;
    }

    this.currentBook = book;
    this.totalPages = book.totalPages;
    this.currentPage = Math.max(0, Math.min(initialPage - 1, this.totalPages - 1));

    // Update UI headers
    this.bookTitleEl.textContent = book.title;
    this.bookChapterEl.textContent = book.subtitle || book.edition;
    this.jumpTotalEl.textContent = `/ ${this.totalPages}`;
    this.pageSlider.max = this.totalPages;
    this.pageSlider.value = this.currentPage + 1;
    this.jumpInput.max = this.totalPages;
    this.jumpInput.value = this.currentPage + 1;

    // Show modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.resetStageZoom();

    // Populate drawers
    this.renderChaptersDrawer();
    this.renderBookmarksDrawer();

    // Initialize 3D Flipbook
    this.initFlipbook();

    // Update URL hash for direct shareable linking
    window.location.hash = `book=${book.id}&page=${this.currentPage + 1}`;
  }

  closeReader() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    this.closeAllDrawers();
    this.closeHDZoom();
    this.resetStageZoom();

    // Save reading progress
    if (this.currentBook) {
      this.saveLastReadPage(this.currentBook.id, this.currentPage + 1);
      window.libraryApp?.renderRecentBooks();
    }

    // Reset hash without reloading
    history.pushState('', document.title, window.location.pathname + window.location.search);
  }

  initFlipbook() {
    // Clear existing flipbook instance if any
    if (this.pageFlip) {
      try {
        this.pageFlip.destroy();
      } catch (e) {
        console.warn('Destroy flipbook err:', e);
      }
      this.pageFlip = null;
    }

    // Ensure bookContainer exists in DOM
    const wrapper = document.getElementById('book-3d-wrapper');
    let container = document.getElementById('book-flip-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'book-flip-container';
      wrapper.appendChild(container);
    }
    container.innerHTML = '';
    this.bookContainer = container;

    // Calculate responsive page dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let pageHeight = Math.min(Math.max(viewportHeight - 130, 480), 860);
    let pageWidth = Math.round(pageHeight / 1.32);

    if (viewportWidth < 800) {
      pageWidth = Math.min(viewportWidth - 24, 520);
      pageHeight = Math.round(pageWidth * 1.32);
      this.isSinglePage = true;
      this.bookContainer.style.width = `${pageWidth}px`;
      this.bookContainer.style.height = `${pageHeight}px`;
    } else {
      if (pageWidth * 2 > viewportWidth - 80) {
        pageWidth = Math.floor((viewportWidth - 80) / 2);
        pageHeight = Math.round(pageWidth * 1.32);
      }
      this.isSinglePage = false;
      this.bookContainer.style.width = `${pageWidth * 2}px`;
      this.bookContainer.style.height = `${pageHeight}px`;
    }

    // Create PageFlip instance with realistic 3D paper curl physics
    // Disabling mouse/touch drag on pages so hands are strictly for zooming/panning
    const usePortrait = viewportWidth < 800;
    this.pageFlip = new St.PageFlip(this.bookContainer, {
      width: pageWidth,
      height: pageHeight,
      size: 'fixed',
      minWidth: 280,
      maxWidth: 1200,
      minHeight: 380,
      maxHeight: 1400,
      drawShadow: true,
      maxShadowOpacity: 0.5,
      showCover: false,
      usePortrait: usePortrait,
      startPage: this.currentPage,
      flippingTime: 650,
      useMouseEvents: false,     // <-- Disables hand drag to turn pages
      showPageCorners: false,    // <-- Disables corner peeling on hover/touch
      disableFlipByClick: true,   // <-- Only flip when clicking navigation icons
      mobileScrollSupport: false
    });

    // Generate image URLs
    const imageUrls = [];
    for (let i = 1; i <= this.totalPages; i++) {
      imageUrls.push(`${this.currentBook.basePath}${i}.webp`);
    }

    // Load into PageFlip Canvas renderer
    this.pageFlip.loadFromImages(imageUrls);

    // Event listener: On page flip
    this.pageFlip.on('flip', (e) => {
      this.onPageFlipped(e.data);
    });

    // Event listener: On change state (for sound)
    this.pageFlip.on('changeState', (e) => {
      if (e.data === 'flipping') {
        window.soundManager.playPageFlip();
      }
    });

    this.updatePageInfoUI(this.currentPage);
  }

  onPageFlipped(pageIndex) {
    const prevPage = this.currentPage;
    this.currentPage = pageIndex;

    window.soundManager.playPageFlip(pageIndex >= prevPage ? 'forward' : 'backward');
    this.updatePageInfoUI(pageIndex);

    if (this.currentBook) {
      this.saveLastReadPage(this.currentBook.id, pageIndex + 1);
    }

    this.highlightCurrentChapter();
    this.updateBookmarkButtonUI();
  }

  flipPrev() {
    if (this.pageFlip) {
      this.pageFlip.flipPrev();
    }
  }

  flipNext() {
    if (this.pageFlip) {
      this.pageFlip.flipNext();
    }
  }

  turnToPage(pageIndex) {
    if (this.pageFlip) {
      const target = Math.max(0, Math.min(pageIndex, this.totalPages - 1));
      this.pageFlip.turnToPage(target);
    }
  }

  updatePageInfoUI(pageIndex) {
    const displayPage = pageIndex + 1;
    this.pageSlider.value = displayPage;
    this.jumpInput.value = displayPage;

    if (this.pageFlip && this.pageFlip.getOrientation() === 'landscape' && displayPage > 1 && displayPage < this.totalPages) {
      const left = pageIndex % 2 === 0 ? displayPage : displayPage - 1;
      const right = left + 1;
      this.pageIndicatorEl.textContent = `Pages ${left} - ${right} of ${this.totalPages}`;
    } else {
      this.pageIndicatorEl.textContent = `Page ${displayPage} of ${this.totalPages}`;
    }

    const currentChapter = this.getCurrentChapter(displayPage);
    if (currentChapter) {
      this.bookChapterEl.textContent = currentChapter.title;
    }

    this.highlightCurrentChapter();
    this.updateBookmarkButtonUI();
  }

  updateDepthStacks(pageIndex) {
    // Deprecated: faux-3D depth stacks removed in modern Material 3 UI
  }

  getCurrentChapter(page) {
    if (!this.currentBook || !this.currentBook.chapters) return null;
    const chapters = this.currentBook.chapters;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (page >= chapters[i].startPage) {
        return chapters[i];
      }
    }
    return chapters[0] || null;
  }

  // =========================================================================
  // Drawers (Chapters, Thumbnails, Bookmarks)
  // =========================================================================

  toggleDrawer(drawerName) {
    if (this.activeDrawer === drawerName) {
      this.closeAllDrawers();
      return;
    }
    this.closeAllDrawers();
    this.activeDrawer = drawerName;

    if (drawerName === 'chapters') {
      this.chaptersDrawer.classList.add('open');
      document.getElementById('btn-toggle-chapters')?.classList.add('active');
      this.highlightCurrentChapter();
    } else if (drawerName === 'thumbnails') {
      this.thumbnailsDrawer.classList.add('open');
      document.getElementById('btn-toggle-thumbnails')?.classList.add('active');
      this.renderThumbnailsGrid();
    } else if (drawerName === 'bookmarks') {
      this.bookmarksDrawer.classList.add('open');
      document.getElementById('btn-toggle-bookmarks')?.classList.add('active');
      this.renderBookmarksDrawer();
    }
  }

  closeAllDrawers() {
    this.activeDrawer = null;
    this.chaptersDrawer?.classList.remove('open');
    this.thumbnailsDrawer?.classList.remove('open');
    this.bookmarksDrawer?.classList.remove('open');

    document.getElementById('btn-toggle-chapters')?.classList.remove('active');
    document.getElementById('btn-toggle-thumbnails')?.classList.remove('active');
    document.getElementById('btn-toggle-bookmarks')?.classList.remove('active');
  }

  renderChaptersDrawer() {
    if (!this.chaptersListEl) return;
    this.chaptersListEl.innerHTML = '';

    const chapters = this.currentBook?.chapters || [];
    if (chapters.length === 0) {
      this.chaptersListEl.innerHTML = '<p class="text-muted" style="padding:1rem;">No chapter markers defined for this book.</p>';
      return;
    }

    chapters.forEach(ch => {
      const item = document.createElement('div');
      item.className = 'chapter-item';
      item.dataset.page = ch.startPage;
      item.innerHTML = `
        <span class="chapter-title">${ch.title}</span>
        <span class="chapter-page-badge">p. ${ch.startPage}</span>
      `;
      item.addEventListener('click', () => {
        this.turnToPage(ch.startPage - 1);
        this.closeAllDrawers();
      });
      this.chaptersListEl.appendChild(item);
    });

    this.highlightCurrentChapter();
  }

  highlightCurrentChapter() {
    const cur = this.getCurrentChapter(this.currentPage + 1);
    if (!cur || !this.chaptersListEl) return;

    this.chaptersListEl.querySelectorAll('.chapter-item').forEach(el => {
      if (parseInt(el.dataset.page, 10) === cur.startPage) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  renderThumbnailsGrid() {
    if (!this.thumbnailsGridEl || this.thumbnailsGridEl.children.length > 0) return;
    this.thumbnailsGridEl.innerHTML = '';

    for (let i = 1; i <= this.totalPages; i++) {
      const item = document.createElement('div');
      item.className = 'thumb-item';
      if (i === this.currentPage + 1) item.classList.add('active');

      const img = document.createElement('img');
      img.loading = 'lazy';
      img.src = `${this.currentBook.basePath}${i}.webp`;
      img.alt = `Page ${i}`;

      const num = document.createElement('div');
      num.className = 'thumb-num';
      num.textContent = `Page ${i}`;

      item.appendChild(img);
      item.appendChild(num);

      item.addEventListener('click', () => {
        this.turnToPage(i - 1);
        this.closeAllDrawers();
      });

      this.thumbnailsGridEl.appendChild(item);
    }
  }

  // =========================================================================
  // Bookmarks System
  // =========================================================================

  getBookmarksKey() {
    return `mbbs_bookmarks_${this.currentBook?.id}`;
  }

  getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(this.getBookmarksKey())) || [];
    } catch {
      return [];
    }
  }

  saveBookmarks(list) {
    localStorage.setItem(this.getBookmarksKey(), JSON.stringify(list));
  }

  toggleCurrentBookmark() {
    const page = this.currentPage + 1;
    let list = this.getBookmarks();
    const existingIndex = list.findIndex(b => b.page === page);

    if (existingIndex >= 0) {
      list.splice(existingIndex, 1);
    } else {
      list.push({
        page: page,
        title: this.getCurrentChapter(page)?.title || `Page ${page}`,
        createdAt: new Date().toLocaleDateString()
      });
      list.sort((a, b) => a.page - b.page);
    }

    this.saveBookmarks(list);
    this.updateBookmarkButtonUI();
    this.renderBookmarksDrawer();
  }

  updateBookmarkButtonUI() {
    const btn = document.getElementById('btn-bookmark-toggle');
    if (!btn) return;
    const page = this.currentPage + 1;
    const list = this.getBookmarks();
    const isBookmarked = list.some(b => b.page === page);

    if (isBookmarked) {
      btn.classList.add('active');
      btn.style.color = '#fbbf24';
      btn.title = 'Remove Bookmark';
    } else {
      btn.classList.remove('active');
      btn.style.color = '';
      btn.title = 'Bookmark this Page';
    }
  }

  renderBookmarksDrawer() {
    if (!this.bookmarksListEl) return;
    this.bookmarksListEl.innerHTML = '';

    const list = this.getBookmarks();
    if (list.length === 0) {
      this.bookmarksListEl.innerHTML = '<p class="text-muted" style="padding:1rem; font-size:0.85rem;">No bookmarks saved yet. Click the ribbon icon on the top bar to bookmark this page.</p>';
      return;
    }

    list.forEach(bm => {
      const item = document.createElement('div');
      item.className = 'chapter-item';
      item.innerHTML = `
        <div>
          <div class="chapter-title"><i class="fa-solid fa-bookmark" style="color:#fbbf24; margin-right:6px;"></i> ${bm.title}</div>
          <div style="font-size:0.7rem; color:#94a3b8; margin-top:2px;">Saved ${bm.createdAt}</div>
        </div>
        <span class="chapter-page-badge">p. ${bm.page}</span>
      `;
      item.addEventListener('click', () => {
        this.turnToPage(bm.page - 1);
        this.closeAllDrawers();
      });
      this.bookmarksListEl.appendChild(item);
    });
  }

  // =========================================================================
  // Hand & Touch Gesture Stage Zoom Engine
  // =========================================================================

  initHandGestureZoom() {
    if (!this.stageContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    // --- Touch Gestures (Pinch to Zoom & One-Finger Pan & Swipe to Turn) ---
    this.stageContainer.addEventListener('touchstart', (e) => {
      if (e.target.closest('.floating-zoom-pill') || e.target.closest('.btn-nav-arrow')) return;

      if (e.touches.length >= 2) {
        // Multi-touch pinch zoom initiation with fingers
        e.preventDefault();
        e.stopPropagation();
        this.isPinching = true;
        this.isPanning = false;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        this.initialPinchDistance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        this.initialPinchZoom = this.stageZoom;
        this.pinchCenterX = (t1.clientX + t2.clientX) / 2;
        this.pinchCenterY = (t1.clientY + t2.clientY) / 2;
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        const now = Date.now();
        const dist = Math.hypot(touch.clientX - this.lastTapX, touch.clientY - this.lastTapY);

        // Double-tap to zoom detection (< 320ms, < 40px)
        if (now - this.lastTapTime < 320 && dist < 40) {
          e.preventDefault();
          e.stopPropagation();
          this.toggleStageZoom(touch.clientX, touch.clientY);
          this.lastTapTime = 0;
          return;
        }
        this.lastTapTime = now;
        this.lastTapX = touch.clientX;
        this.lastTapY = touch.clientY;

        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchStartTime = now;

        if (this.stageZoom > 1.05) {
          // In zoomed mode, drag pans freely
          e.preventDefault();
          e.stopPropagation();
          this.isPanning = true;
          this.panStartX = touch.clientX - this.stagePanX;
          this.panStartY = touch.clientY - this.stagePanY;
          this.stageContainer.classList.add('panning');
        }
      }
    }, { capture: true, passive: false });

    this.stageContainer.addEventListener('touchmove', (e) => {
      if (e.touches.length >= 2 || this.isPinching) {
        e.preventDefault();
        e.stopPropagation();
        if (e.touches.length >= 2) {
          const t1 = e.touches[0];
          const t2 = e.touches[1];
          const curDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
          const curCenterX = (t1.clientX + t2.clientX) / 2;
          const curCenterY = (t1.clientY + t2.clientY) / 2;
          if (this.initialPinchDistance > 10) {
            const factor = curDist / this.initialPinchDistance;
            const targetZoom = Math.min(Math.max(this.initialPinchZoom * factor, 1.0), 4.0);
            this.setStageZoom(targetZoom, curCenterX, curCenterY, false);
          }
        }
      } else if (e.touches.length === 1 && this.stageZoom > 1.05 && this.isPanning) {
        e.preventDefault();
        e.stopPropagation();
        this.stagePanX = e.touches[0].clientX - this.panStartX;
        this.stagePanY = e.touches[0].clientY - this.panStartY;
        this.constrainPanBounds();
        this.applyStageTransform(false);
      }
    }, { capture: true, passive: false });

    const endTouch = (e) => {
      if (this.isPinching) {
        if (e.touches.length < 2) {
          this.isPinching = false;
          this.initialPinchDistance = 0;
        }
      }
      if (this.isPanning && e.touches.length === 0) {
        this.isPanning = false;
        this.stageContainer?.classList.remove('panning');
        this.constrainPanBounds();
        this.applyStageTransform(true);
      }
    };

    this.stageContainer.addEventListener('touchend', endTouch, { capture: true, passive: false });
    this.stageContainer.addEventListener('touchcancel', endTouch, { capture: true, passive: false });

    // --- Mouse & Trackpad Gestures (Drag Pan & Wheel/Trackpad Pinch) ---
    this.stageContainer.addEventListener('mousedown', (e) => {
      if (e.target.closest('.floating-zoom-pill') || e.target.closest('.btn-nav-arrow')) return;
      if (this.stageZoom > 1.05 && (e.button === 0 || e.button === 1)) {
        e.preventDefault();
        this.isPanning = true;
        this.panStartX = e.clientX - this.stagePanX;
        this.panStartY = e.clientY - this.stagePanY;
        this.stageContainer.classList.add('panning');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isPanning || this.stageZoom <= 1.05) return;
      e.preventDefault();
      this.stagePanX = e.clientX - this.panStartX;
      this.stagePanY = e.clientY - this.panStartY;
      this.constrainPanBounds();
      this.applyStageTransform(false);
    });

    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        this.stageContainer?.classList.remove('panning');
        this.constrainPanBounds();
        this.applyStageTransform(true);
      }
    });

    // Double-click to quick zoom
    this.stageContainer.addEventListener('dblclick', (e) => {
      if (e.target.closest('.floating-zoom-pill') || e.target.closest('.btn-nav-arrow')) return;
      e.preventDefault();
      this.toggleStageZoom(e.clientX, e.clientY);
    });

    // Mouse wheel or trackpad pinch zoom
    this.stageContainer.addEventListener('wheel', (e) => {
      if (e.ctrlKey || this.stageZoom > 1.05) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.25 : -0.25;
        this.adjustStageZoom(delta, e.clientX, e.clientY);
      }
    }, { passive: false });
  }

  setStageZoom(targetZoom, clientX, clientY, animated = false) {
    const oldZoom = this.stageZoom;
    const newZoom = Math.min(Math.max(targetZoom, 1.0), 4.0);

    if (Math.abs(newZoom - oldZoom) < 0.001) return;

    if (newZoom <= 1.02) {
      this.stageZoom = 1.0;
      this.stagePanX = 0;
      this.stagePanY = 0;
    } else {
      if (clientX !== undefined && clientY !== undefined && this.stageContainer) {
        const rect = this.stageContainer.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = (clientX - cx) - this.stagePanX;
        const ry = (clientY - cy) - this.stagePanY;
        const ratio = newZoom / oldZoom;
        this.stagePanX -= rx * (ratio - 1);
        this.stagePanY -= ry * (ratio - 1);
      }
      this.stageZoom = newZoom;
      this.constrainPanBounds();
    }

    this.applyStageTransform(animated);
  }

  adjustStageZoom(delta, clientX, clientY) {
    const newZoom = Math.min(Math.max(this.stageZoom + delta, 1.0), 4.0);
    this.setStageZoom(newZoom, clientX, clientY, true);
  }

  resetStageZoom() {
    this.stageZoom = 1.0;
    this.stagePanX = 0;
    this.stagePanY = 0;
    this.isPanning = false;
    this.stageContainer?.classList.remove('panning');
    this.applyStageTransform(true);
  }

  toggleStageZoom(clientX, clientY) {
    if (this.stageZoom > 1.1) {
      this.resetStageZoom();
    } else {
      this.setStageZoom(2.2, clientX, clientY, true);
    }
  }

  constrainPanBounds() {
    if (this.stageZoom <= 1.05 || !this.stageContainer || !this.stageWrapper) {
      this.stagePanX = 0;
      this.stagePanY = 0;
      return;
    }

    const rect = this.stageContainer.getBoundingClientRect();
    const wrapRect = this.stageWrapper.getBoundingClientRect();
    const maxPanX = Math.max(0, (wrapRect.width - rect.width) / 2 + 100);
    const maxPanY = Math.max(0, (wrapRect.height - rect.height) / 2 + 100);

    this.stagePanX = Math.max(-maxPanX, Math.min(maxPanX, this.stagePanX));
    this.stagePanY = Math.max(-maxPanY, Math.min(maxPanY, this.stagePanY));
  }

  applyStageTransform(animated = false) {
    if (!this.stageWrapper) return;

    if (animated) {
      this.stageWrapper.style.transition = 'transform 0.22s cubic-bezier(0.2, 0, 0, 1)';
    } else {
      this.stageWrapper.style.transition = 'none';
    }

    this.stageWrapper.style.transform = `translate3d(${this.stagePanX}px, ${this.stagePanY}px, 0) scale(${this.stageZoom})`;

    if (this.zoomLevelText) {
      this.zoomLevelText.textContent = `${Math.round(this.stageZoom * 100)}%`;
    }

    if (this.stageContainer) {
      if (this.stageZoom > 1.05) {
        this.stageContainer.classList.add('zoomed');
        this.bookContainer?.classList.add('disable-flip-pointers');
      } else {
        this.stageContainer.classList.remove('zoomed');
        this.bookContainer?.classList.remove('disable-flip-pointers');
      }
    }
  }

  // =========================================================================
  // High-Definition Diagram Zoom Modal (HD Magnifier) with Multi-Touch & Swipe
  // =========================================================================

  openHDZoom() {
    if (!this.currentBook) return;
    this.updateHDZoomImage();
    this.zoomModal.classList.add('active');
  }

  closeHDZoom() {
    this.zoomModal.classList.remove('active');
    this.resetZoom();
  }

  prevHDZoomPage() {
    if (!this.currentBook || this.currentPage <= 0) return;
    this.turnToPage(this.currentPage - 1);
    this.updateHDZoomImage();
  }

  nextHDZoomPage() {
    if (!this.currentBook || this.currentPage >= this.totalPages - 1) return;
    this.turnToPage(this.currentPage + 1);
    this.updateHDZoomImage();
  }

  updateHDZoomImage() {
    if (!this.currentBook) return;
    const page = this.currentPage + 1;
    this.zoomImage.src = `${this.currentBook.basePath}${page}.webp`;
    this.zoomTitle.innerHTML = `<i class="fa-solid fa-magnifying-glass-plus"></i> HD Magnifier: ${this.currentBook.title} (Page ${page} of ${this.totalPages})`;
    this.resetZoom();
  }

  adjustZoom(delta, focalX, focalY) {
    const targetScale = Math.min(Math.max(this.zoomScale + delta, 0.75), 4.5);
    this.setZoomScale(targetScale, focalX, focalY, true);
  }

  resetZoom() {
    this.zoomScale = 1.0;
    this.zoomPanX = 0;
    this.zoomPanY = 0;
    this.zoomIsPanning = false;
    this.zoomIsPinching = false;
    const viewport = document.getElementById('zoom-viewport');
    viewport?.classList.remove('panning');
    this.updateZoomTransform(true);
  }

  setZoomScale(targetScale, focalX, focalY, animated = false) {
    const oldScale = this.zoomScale;
    const newScale = Math.min(Math.max(targetScale, 0.75), 4.5);

    if (Math.abs(newScale - oldScale) < 0.001) return;

    if (newScale <= 1.02) {
      this.zoomScale = 1.0;
      this.zoomPanX = 0;
      this.zoomPanY = 0;
    } else {
      if (focalX !== undefined && focalY !== undefined) {
        const viewport = document.getElementById('zoom-viewport');
        const rect = viewport ? viewport.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = (focalX - cx) - this.zoomPanX;
        const ry = (focalY - cy) - this.zoomPanY;
        const ratio = newScale / oldScale;
        this.zoomPanX -= rx * (ratio - 1);
        this.zoomPanY -= ry * (ratio - 1);
      }
      this.zoomScale = newScale;
      this.constrainZoomPan();
    }
    this.updateZoomTransform(animated);
  }

  constrainZoomPan() {
    const viewport = document.getElementById('zoom-viewport');
    if (!viewport || !this.zoomImage) return;

    if (this.zoomScale <= 1.05) {
      this.zoomPanX = 0;
      this.zoomPanY = 0;
      return;
    }

    const vpRect = viewport.getBoundingClientRect();
    const imgRect = this.zoomImage.getBoundingClientRect();

    const maxPanX = Math.max(0, (imgRect.width - vpRect.width) / 2 + 100);
    const maxPanY = Math.max(0, (imgRect.height - vpRect.height) / 2 + 100);

    this.zoomPanX = Math.max(-maxPanX, Math.min(maxPanX, this.zoomPanX));
    this.zoomPanY = Math.max(-maxPanY, Math.min(maxPanY, this.zoomPanY));
  }

  updateZoomTransform(animated = false) {
    if (!this.zoomImage) return;
    if (animated) {
      this.zoomImage.style.transition = 'transform 0.22s cubic-bezier(0.2, 0, 0, 1)';
    } else {
      this.zoomImage.style.transition = 'none';
    }
    this.zoomImage.style.transform = `translate3d(${this.zoomPanX}px, ${this.zoomPanY}px, 0) scale(${this.zoomScale})`;
  }

  initZoomDraggable() {
    const viewport = document.getElementById('zoom-viewport');
    if (!viewport) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    // --- Multi-Touch Pinch Zoom & Finger Drag Scroll / Swipe ---
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length >= 2) {
        // Two-finger Pinch to Zoom
        e.preventDefault();
        this.zoomIsPinching = true;
        this.zoomIsPanning = false;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        this.zoomPinchStartDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        this.zoomPinchStartScale = this.zoomScale;
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        const now = Date.now();
        const dist = Math.hypot(t.clientX - this.zoomLastTapX, t.clientY - this.zoomLastTapY);

        // Double-tap to toggle zoom (< 320ms, < 40px)
        if (now - this.zoomLastTapTime < 320 && dist < 40) {
          e.preventDefault();
          if (this.zoomScale > 1.1) {
            this.resetZoom();
          } else {
            this.setZoomScale(2.5, t.clientX, t.clientY, true);
          }
          this.zoomLastTapTime = 0;
          return;
        }

        this.zoomLastTapTime = now;
        this.zoomLastTapX = t.clientX;
        this.zoomLastTapY = t.clientY;

        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchStartTime = now;

        this.zoomIsPanning = true;
        this.zoomPanStartX = t.clientX - this.zoomPanX;
        this.zoomPanStartY = t.clientY - this.zoomPanY;
        viewport.classList.add('panning');
      }
    }, { capture: true, passive: false });

    viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length >= 2 && this.zoomIsPinching) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const curDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const focalX = (t1.clientX + t2.clientX) / 2;
        const focalY = (t1.clientY + t2.clientY) / 2;
        if (this.zoomPinchStartDist > 10) {
          const factor = curDist / this.zoomPinchStartDist;
          this.setZoomScale(this.zoomPinchStartScale * factor, focalX, focalY, false);
        }
      } else if (e.touches.length === 1 && this.zoomIsPanning) {
        e.preventDefault();
        const t = e.touches[0];
        this.zoomPanX = t.clientX - this.zoomPanStartX;
        this.zoomPanY = t.clientY - this.zoomPanStartY;
        this.constrainZoomPan();
        this.updateZoomTransform(false);
      }
    }, { capture: true, passive: false });

    const endTouch = (e) => {
      if (this.zoomIsPinching) {
        if (e.touches.length < 2) {
          this.zoomIsPinching = false;
          this.zoomPinchStartDist = 0;
        }
      }
      if (this.zoomIsPanning && e.touches.length === 0) {
        this.zoomIsPanning = false;
        viewport.classList.remove('panning');

        // If at normal fit (1.0x), horizontal finger swipe navigates between pages
        if (this.zoomScale <= 1.05) {
          const changed = e.changedTouches[0];
          if (changed) {
            const dx = changed.clientX - touchStartX;
            const dy = changed.clientY - touchStartY;
            const dt = Date.now() - touchStartTime;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 450) {
              if (dx < 0) {
                this.nextHDZoomPage();
              } else {
                this.prevHDZoomPage();
              }
            }
          }
        }

        this.constrainZoomPan();
        this.updateZoomTransform(true);
      }
    };

    viewport.addEventListener('touchend', endTouch, { capture: true, passive: false });
    viewport.addEventListener('touchcancel', endTouch, { capture: true, passive: false });

    // --- Mouse & Trackpad Gestures (Drag Pan & Wheel/Trackpad Pinch) ---
    viewport.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 1) {
        e.preventDefault();
        this.zoomIsPanning = true;
        this.zoomPanStartX = e.clientX - this.zoomPanX;
        this.zoomPanStartY = e.clientY - this.zoomPanY;
        viewport.classList.add('panning');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.zoomIsPanning) return;
      e.preventDefault();
      this.zoomPanX = e.clientX - this.zoomPanStartX;
      this.zoomPanY = e.clientY - this.zoomPanStartY;
      this.constrainZoomPan();
      this.updateZoomTransform(false);
    });

    window.addEventListener('mouseup', () => {
      if (this.zoomIsPanning) {
        this.zoomIsPanning = false;
        viewport.classList.remove('panning');
        this.constrainZoomPan();
        this.updateZoomTransform(true);
      }
    });

    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      this.adjustZoom(delta, e.clientX, e.clientY);
    }, { passive: false });

    viewport.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (this.zoomScale > 1.1) {
        this.resetZoom();
      } else {
        this.setZoomScale(2.5, e.clientX, e.clientY, true);
      }
    });
  }

  // =========================================================================
  // Themes & UI Utilities
  // =========================================================================

  applyTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('mbbs_reader_theme', theme);
    this.modal.classList.remove('theme-default', 'theme-sepia', 'theme-light');
    this.modal.classList.add(`theme-${theme}`);

    const btnTheme = document.getElementById('btn-theme-toggle');
    if (btnTheme) {
      if (theme === 'sepia') {
        btnTheme.innerHTML = '<i class="fa-solid fa-scroll"></i>';
        btnTheme.title = 'Reading Theme: Warm Parchment (Click for Light)';
      } else if (theme === 'light') {
        btnTheme.innerHTML = '<i class="fa-solid fa-sun"></i>';
        btnTheme.title = 'Reading Theme: Crisp Paper (Click for Midnight)';
      } else {
        btnTheme.innerHTML = '<i class="fa-solid fa-moon"></i>';
        btnTheme.title = 'Reading Theme: Midnight Slate (Click for Sepia)';
      }
    }
  }

  updateSoundButtonUI(enabled) {
    const btn = document.getElementById('btn-sound-toggle');
    if (!btn) return;
    if (enabled) {
      btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      btn.title = 'Page Flip Sound: ON (Click to Mute)';
      btn.style.color = '#38bdf8';
    } else {
      btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      btn.title = 'Page Flip Sound: OFF (Click to Unmute)';
      btn.style.color = '#94a3b8';
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.warn(err));
    } else {
      document.exitFullscreen().catch(err => console.warn(err));
    }
  }

  saveLastReadPage(bookId, page) {
    localStorage.setItem(`mbbs_last_page_${bookId}`, page);
    localStorage.setItem(`mbbs_last_read_time_${bookId}`, Date.now());
  }

  static getLastReadPage(bookId) {
    return parseInt(localStorage.getItem(`mbbs_last_page_${bookId}`), 10) || 1;
  }
}

window.mbbsReader = new MBBSReader();
