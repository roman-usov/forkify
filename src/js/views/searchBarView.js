import ParentView from './parentView';

class SearchBarView extends ParentView {
  // Parent element for search - the search form
  parentEl = document.querySelector('.search');

  // Search field element inside the search form
  searchField = this.parentEl.querySelector('.search__field');

  // A method to get a user's input from the search field
  getQuery() {
    const query = this.searchField.value;
    this.clearSearchBar();
    return query;
  }

  // A publisher method to handle search submit events
  addHandlerForSearch(handler) {
    this.parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }

  // A method to clear the search bar
  clearSearchBar() {
    this.searchField.value = '';
  }
}

export default new SearchBarView();
