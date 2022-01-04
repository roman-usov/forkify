import ParentView from './parentView';
import previewView from './previewView'; // Parcel 2

class SearchResultsView extends ParentView {
  parentEl = document.querySelector('.results');

  errorMessage = 'No recipes found.';

  message = 'Start by searching for a recipe or an ingredient. Have fun!';

  generateMarkup() {
    return this.data.reduce(
      (markup, recipeData) => markup + previewView.render(recipeData, false),
      ''
    );
  }
}

export default new SearchResultsView();
