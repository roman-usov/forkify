import ParentView from './parentView';
import PreviewView from './previewView'; // Parcel 2

class BookmarksView extends ParentView {
  // Parent element for bookmarks
  parentEl = document.querySelector('.bookmarks__list');

  errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';

  message = '';

  // eslint-disable-next-line class-methods-use-this
  addHandlerRenderBookmarksOnLoad(handler) {
    window.addEventListener('load', handler);
  }

  generateMarkup() {
    return this.data.reduce(
      (markup, recipeData) =>
        markup + PreviewView.generatePreviewMarkup(recipeData),
      ''
    );
  }
}

export default new BookmarksView();
