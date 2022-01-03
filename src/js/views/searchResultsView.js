/* eslint-disable no-underscore-dangle */
import ParentView from './parentView';
import previewView from './previewView'; // Parcel 2

class SearchResultsView extends ParentView {
  _parentEl = document.querySelector('.results');

  _errorMessage = 'No recipes found.';

  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateMarkup() {
    return this._data.reduce(
      (markup, recipeData) => markup + previewView.render(recipeData, false),
      ''
    );
  }
}

export default new SearchResultsView();
