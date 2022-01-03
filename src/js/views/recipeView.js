/* eslint-disable import/no-unresolved,class-methods-use-this,no-underscore-dangle */
import fracty from 'fracty';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import ParentView from './parentView';

class ViewRecipe extends ParentView {
  //  The parent element to house recipe-related elements in the DOM
  _parentEl = document.querySelector('.recipe');

  //  Default error message
  _errorMessage = "Specified recipe doesn't exist. Please, try another one.";

  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  //  Publisher method for a recipe render subscriber function
  addHandlerForRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  //  Publisher method for rendering a recipe with updated servings
  addHandlerForServings(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const { updatedServings } = btn.dataset;

      if (updatedServings > 0) handler(updatedServings);
    });
  }

  addHandlerForBookmark(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;

      handler();
    });
  }

  //  Reduce with a callback
  _generateIngredientsMarkup() {
    return this._data.ingredients.reduce(
      this._generateIngredientPreview.bind(this),
      ''
    );
  }

  _generateIngredientPreview(str, ingredient) {
    return `
      ${str}<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ingredient.quantity ? fracty(ingredient.quantity) : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${
            ingredient.unit ? ingredient.unit : ''
          }</span>
          ${ingredient.description}
        </div>
      </li>
   `;
  }

  // A private method to provide a complete recipe html element as a string based on the provided recipe object saved in #data
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button data-servings="minus" class="btn--tiny btn--update-servings" data-updated-servings="${
            +this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-servings="plus" class="btn--tiny btn--update-servings" data-updated-servings="${
            +this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this._generateIngredientsMarkup()}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
  }
}

export default new ViewRecipe();
