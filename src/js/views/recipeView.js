import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional';

class ViewRecipe {
  // The parent element to house recipe-related elements in the DOM
  #parentEl = document.querySelector('.recipe');

  // An attribute to hold input passed into the render() public method for rendering an HTML element
  #data;

  // A public method to render an HTML element based on provided input
  render(data) {
    this.#data = data;
    const markup = this.#generateRecipeMarkup();
    this.#clear();
    this.#parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // A public method to render a spinner
  renderSpinner() {
    const spinnerHtml = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `
    this.#clear();
    this.#parentEl.insertAdjacentHTML('afterbegin', spinnerHtml);
  }

  // A private helper method to clear the parent element
  #clear() {
    this.#parentEl.innerHTML = '';
  }

  // A private helper method to convert a float number into a fraction for display in the DOM
  #toFraction(num) {
    return num ? new Fraction(num).toString() : "";
  }

  // A private method to provide ingredient list elements as a string based on the ingredient array inside the provided recipe object saved in #data
  #generateIngredientsMarkup () {
    return this.#data.ingredients.reduce((str, ingredient) => str +=  `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${this.#toFraction(ingredient.quantity)}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>
   `, '');
  }

  // A private method to provide a complete recipe html element as a string based on the provided recipe object saved in #data
  #generateRecipeMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this.#data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this.#generateIngredientsMarkup()}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.#data.sourceUrl}"
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