/* eslint-disable no-underscore-dangle */
import ParentView from './parentView';

class SearchBarView extends ParentView {
  // Parent element for search - the search form
  _parentEl = document.querySelector('.search');

  // Search field element inside the search form
  _searchField = this._parentEl.querySelector('.search__field');

  // A method to get a user's input from the search field
  getQuery() {
    const query = this._searchField.value;
    this._clearSearchBar();
    return query;
  }

  // A publisher method to handle search submit events
  addHandlerForSearch(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }

  // A method to clear the search bar
  _clearSearchBar() {
    this._searchField.value = '';
  }
}

export default new SearchBarView();
