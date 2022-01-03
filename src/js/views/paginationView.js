/* eslint-disable import/no-unresolved,no-underscore-dangle */
import icons from 'url:../../img/icons.svg';
import ParentView from './parentView';

class PaginationView extends ParentView {
  _parentEl = document.querySelector('.pagination');

  addHandlerForPagination(handler) {
    this._parentEl.addEventListener('click', e => {
      e.preventDefault();
      //  const page = +e.target.closest('.btn--inline').innerText.slice(-1); //searches for the closest up the DOM tree - handy because there may be inaccurate clicks (e.g. on a span)
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const pageToGoTo = +btn.dataset.goto;
      handler(pageToGoTo);
    });
  }

  _generateMarkup() {
    const { results, page, resultsPerPage } = this._data;
    const totalPages = Math.ceil(results.length / resultsPerPage);

    // Case 1 - we just have 1 page to display, no other pages
    if (totalPages === 1) return '';

    // Case 2 - we are on page 1, and there are other pages
    if (page === 1) return this._generateNextButton(page + 1);

    // Case 3 - we are on the last page
    if (page === totalPages) {
      return this._generatePrevButton(page - 1);
    }
    // Case 4 - we are on a page between the first page and the last page
    return (
      this._generatePrevButton(page - 1) + this._generateNextButton(page + 1)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _generateNextButton(page) {
    return `
      <button data-goto='${page}' class="btn--inline pagination__btn--next">
        <span>Page ${page}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _generatePrevButton(page) {
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