// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class ParentView {
  // An attribute to hold input passed into the render() public method for rendering an HTML element
  data;

  // A private helper method to clear the parent element
  clear() {
    this.parentEl.innerHTML = '';
  }

  // A public method to render an HTML element based on provided input
  /**
   * Render the received object to the DOM
   * @param {Object | Object[] } data The data to be rendered (e.g. a recipe)
   * @param {boolean} [render=true] If false, create a markup string instead of rendering it to the DOM
   * @returns {void|string} A markup string is returned if render=false
   * @this {Object} ParentView instance object
   * @author Roman Usov
   */

  displayInDOM(markup) {
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  render(data) {
    this.data = data;

    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.renderError();
    } else {
      this.displayInDOM(this.generateMarkup());
    }
  }

  // A public method to update an HTML element based on provided input
  update(data) {
    this.data = data;

    const newMarkup = this.generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    const currentElements = Array.from(this.parentEl.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];

      // Updates changed TEXT
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim()
      ) {
        currentElement.textContent = newElement.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attr =>
          currentElement.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  // A public method to render a spinner
  renderSpinner() {
    const spinnerMarkup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;

    this.displayInDOM(spinnerMarkup);
  }

  renderError(message = this.errorMessage) {
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this.displayInDOM(errorMarkup);
  }

  renderMessage(message = this.message) {
    const messageMarkup = `
      <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;

    this.displayInDOM(messageMarkup);
  }
}
