/* eslint-disable no-underscore-dangle */
import ParentView from './parentView';
import previewView from './previewView'; // Parcel 2

class BookmarksView extends ParentView {
  // Parent element for bookmarks
  _parentEl = document.querySelector('.bookmarks__list');

  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';

  _message = '';

  // eslint-disable-next-line class-methods-use-this
  addHandlerRenderBookmarksOnLoad(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.reduce(
      (markup, recipeData) => markup + previewView.render(recipeData, false),
      ''
    );
  }
}

export default new BookmarksView();
