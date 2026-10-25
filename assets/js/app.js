// MBBS Book Library - Portal & Catalog Application

class MBBSLibraryApp {
  constructor() {
    this.catalog = window.MBBS_CATALOG;
    this.activeYearFilter = 'all';
    this.searchQuery = '';

    this.initDOM();
    this.attachEvents();
    this.renderStats();
    this.renderRecentBooks();
    this.renderCatalog();
    this.checkInitialURLHash();
  }

  initDOM() {
    this.statsAvailableEl = document.getElementById('stat-books-available');
    this.statsPagesEl = document.getElementById('stat-total-pages');
    this.recentShelfEl = document.getElementById('continue-shelf');
    this.recentContainerEl = document.getElementById('recent-cards-container');
    this.catalogContainerEl = document.getElementById('catalog-container');
    this.searchInputEl = document.getElementById('search-input');
    this.yearPillsEl = document.getElementById('filter-pills');
  }

  attachEvents() {
    // Search input
    this.searchInputEl?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderCatalog();
    });

    // Year filter pills
    this.yearPillsEl?.querySelectorAll('.year-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        this.yearPillsEl.querySelectorAll('.year-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeYearFilter = pill.dataset.year;
        this.renderCatalog();
      });
    });

    // Hash change handler
    window.addEventListener('hashchange', () => this.checkInitialURLHash());
  }

  renderStats() {
    let totalAvailable = 0;
    let totalPages = 0;

    this.catalog.years.forEach(year => {
      year.subjects.forEach(subject => {
        subject.books.forEach(book => {
          if (book.available) {
            totalAvailable++;
            totalPages += book.totalPages || 0;
          }
        });
      });
    });

    if (this.statsAvailableEl) this.statsAvailableEl.textContent = totalAvailable;
    if (this.statsPagesEl) this.statsPagesEl.textContent = `${totalPages.toLocaleString()}+`;
  }

  findBookById(bookId) {
    for (const year of this.catalog.years) {
      for (const subject of year.subjects) {
        for (const book of subject.books) {
          if (book.id === bookId) return book;
        }
      }
    }
    return null;
  }

  renderRecentBooks() {
    if (!this.recentShelfEl || !this.recentContainerEl) return;

    const recentBooks = [];
    for (const year of this.catalog.years) {
      for (const subject of year.subjects) {
        for (const book of subject.books) {
          const lastPage = localStorage.getItem(`mbbs_last_page_${book.id}`);
          const lastTime = localStorage.getItem(`mbbs_last_read_time_${book.id}`);
          if (lastPage && book.available) {
            recentBooks.push({
              book,
              page: parseInt(lastPage, 10),
              time: parseInt(lastTime, 10) || 0
            });
          }
        }
      }
    }

    if (recentBooks.length === 0) {
      this.recentShelfEl.style.display = 'none';
      return;
    }

    recentBooks.sort((a, b) => b.time - a.time);
    this.recentShelfEl.style.display = 'block';
    this.recentContainerEl.innerHTML = '';

    recentBooks.slice(0, 3).forEach(item => {
      const { book, page } = item;
      const percent = Math.min(100, Math.round((page / book.totalPages) * 100));

      const card = document.createElement('div');
      card.className = 'recent-card';
      card.innerHTML = `
        <img src="${book.cover}" alt="${book.title}" class="recent-thumb" />
        <div class="recent-details">
          <div class="recent-title" title="${book.title}">${book.title}</div>
          <div class="recent-progress-info">
            <span>Page ${page} of ${book.totalPages}</span>
            <span style="font-weight:600; color:#38bdf8;">${percent}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${percent}%;"></div>
          </div>
          <button class="btn-resume" data-book-id="${book.id}" data-page="${page}">
            <i class="fa-solid fa-book-open"></i> Resume Reading
          </button>
        </div>
      `;

      card.querySelector('.btn-resume').addEventListener('click', () => {
        window.mbbsReader.openBook(book, page);
      });

      this.recentContainerEl.appendChild(card);
    });
  }

  renderCatalog() {
    if (!this.catalogContainerEl) return;
    this.catalogContainerEl.innerHTML = '';

    let matchCount = 0;

    this.catalog.years.forEach(year => {
      // Filter by year if selected
      if (this.activeYearFilter !== 'all' && this.activeYearFilter !== year.id) {
        return;
      }

      // Filter subjects and books by search query
      const matchingSubjects = [];
      year.subjects.forEach(subject => {
        const matchingBooks = subject.books.filter(book => {
          if (!this.searchQuery) return true;
          const searchCorpus = `${book.title} ${book.subtitle} ${book.author} ${subject.title} ${book.category}`.toLowerCase();
          return searchCorpus.includes(this.searchQuery);
        });

        if (matchingBooks.length > 0) {
          matchingSubjects.push({
            ...subject,
            books: matchingBooks
          });
        }
      });

      if (matchingSubjects.length === 0) return;

      matchCount += matchingSubjects.reduce((acc, s) => acc + s.books.length, 0);

      // Render Year Section
      const yearBlock = document.createElement('section');
      yearBlock.className = 'year-block';
      yearBlock.innerHTML = `
        <div class="year-header">
          <div class="year-header-title">
            <h2>${year.title}</h2>
            <span class="year-header-badge">${year.badge}</span>
          </div>
          <span class="year-header-desc">${year.description}</span>
        </div>
      `;

      // Render Subjects within Year
      matchingSubjects.forEach(subject => {
        const subjectBlock = document.createElement('div');
        subjectBlock.className = 'subject-block';
        subjectBlock.innerHTML = `
          <div class="subject-header">
            <h3 class="subject-title">
              <i class="fa-solid ${subject.icon}" style="color:${subject.accent};"></i>
              <span>${subject.title}</span>
            </h3>
            <span class="subject-tagline">${subject.tagline}</span>
          </div>
          <div class="books-grid"></div>
        `;

        const grid = subjectBlock.querySelector('.books-grid');

        // Render Books in Subject
        subject.books.forEach(book => {
          const bookCard = document.createElement('article');
          bookCard.className = `book-card ${!book.available ? 'is-unavailable' : ''}`;

          const metaParts = [];
          if (book.edition) metaParts.push(book.edition);
          if (book.totalPages > 0) metaParts.push(`${book.totalPages} pages`);
          const metaString = metaParts.join(' • ');

          const coverHTML = book.cover ? `
            <div class="book-card-cover-wrap">
              <div class="book-cover-frame" data-book-id="${book.id}">
                <img src="${book.cover}" alt="${book.title}" loading="lazy" />
                <div class="book-cover-glare"></div>
              </div>
            </div>
          ` : `
            <div class="book-card-cover-wrap">
              <div class="book-placeholder-cover">
                <i class="fa-solid ${subject.icon}" style="font-size:2.2rem; color:${subject.accent}; opacity:0.8;"></i>
                <div class="placeholder-title">${book.title}</div>
                <div class="placeholder-author">${book.author}</div>
              </div>
            </div>
          `;

          const lastReadPage = MBBSReader.getLastReadPage(book.id);

          bookCard.innerHTML = `
            ${coverHTML}
            <div class="book-info">
              <div class="book-meta-top">
                <span class="book-edition-tag">${metaString}</span>
                ${!book.available ? `<span class="badge-status badge-coming">${book.badge || 'Coming Soon'}</span>` : ''}
              </div>
              <h4 class="book-title" title="${book.title}">${book.title}</h4>
              <p class="book-author">${book.author}</p>
              <div class="book-actions">
                <button class="btn-read-book" data-book-id="${book.id}" ${!book.available ? 'disabled' : ''}>
                  <i class="fa-solid ${book.available ? (lastReadPage > 1 ? 'fa-arrow-rotate-right' : 'fa-book-open') : 'fa-lock'}"></i>
                  <span>${book.available ? (lastReadPage > 1 ? `Resume p. ${lastReadPage}` : 'Read') : 'Coming Soon'}</span>
                </button>
              </div>
            </div>
          `;

          // Click on card or Read button opens reader
          if (book.available) {
            bookCard.addEventListener('click', (e) => {
              window.mbbsReader.openBook(book, lastReadPage);
            });
          }

          grid.appendChild(bookCard);
        });

        yearBlock.appendChild(subjectBlock);
      });

      this.catalogContainerEl.appendChild(yearBlock);
    });

    if (matchCount === 0) {
      this.catalogContainerEl.innerHTML = `
        <div style="text-align:center; padding:4rem 1rem; color:#94a3b8;">
          <i class="fa-solid fa-book-skull" style="font-size:3rem; margin-bottom:1rem; opacity:0.5;"></i>
          <h3>No medical textbooks found matching "${this.searchQuery}"</h3>
          <p style="margin-top:0.5rem; font-size:0.9rem;">Try searching for "Anatomy", "BDC", "Physiology", or "Upper Limb".</p>
        </div>
      `;
    }
  }

  checkInitialURLHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const bookId = params.get('book');
    const page = parseInt(params.get('page'), 10) || 1;

    if (bookId) {
      const book = this.findBookById(bookId);
      if (book) {
        window.mbbsReader.openBook(book, page);
      }
    }
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.libraryApp = new MBBSLibraryApp();
});
