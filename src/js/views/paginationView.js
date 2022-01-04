// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';
import ParentView from './parentView';

class PaginationView extends ParentView {
  parentEl = document.querySelector('.pagination');

  addHandlerForPagination(handler) {
    this.parentEl.addEventListener('click', e => {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const pageToGoTo = +btn.dataset.goto;
      handler(pageToGoTo);
    });
  }

  generateMarkup() {
    const { results, page, resultsPerPage } = this.data;
    const totalPages = Math.ceil(results.length / resultsPerPage);

    // TODO
    // Case 0 - no search results
    if (totalPages === 0) {
      this.clear();
      return '';
    }

    // Case 1 - we just have 1 page to display, no other pages
    if (totalPages === 1) return '';

    // Case 2 - we are on page 1, and there are other pages
    if (page === 1) return PaginationView.generateNextButton(page + 1);

    // Case 3 - we are on the last page
    if (page === totalPages) {
      return PaginationView.generatePrevButton(page - 1);
    }
    // Case 4 - we are on a page between the first page and the last page
    return (
      PaginationView.generatePrevButton(page - 1) +
      PaginationView.generateNextButton(page + 1)
    );
  }

  static generateNextButton(page) {
    return `
      <button data-goto='${page}' class="btn--inline pagination__btn--next">
        <span>Page ${page}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  static generatePrevButton(page) {
    return `
      <button data-goto='${page}' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page}</span>
      </button>
    `;
  }
}

export default new PaginationView();
