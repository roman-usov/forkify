// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';
import ParentView from './parentView';
import { wait } from '../helpers';
import { CLOSE_WINDOW_DELAY } from '../config';

class AddRecipeView extends ParentView {
  parentEl = document.querySelector('.upload');

  addRecipeWindowEl = document.querySelector('.add-recipe-window');

  overlay = document.querySelector('.overlay');

  openAddRecipeBtnEl = document.querySelector('.nav__add--bookmark');

  closeAddRecipeBtnEl = document.querySelector('.btn--close-modal');

  message = 'Your recipe has been successfully uploaded. Enjoy!';

  constructor() {
    super();
    this.addHandlerShowAddRecipeWindow();
    this.addHandlerCloseAddRecipeWindow();
  }

  //  Private method for opening the modal
  openModal() {
    const markup = AddRecipeView.generateMarkup();
    this.parentEl.innerHTML = '';
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
    this.overlay.classList.remove('hidden');
    this.addRecipeWindowEl.classList.remove('hidden');
  }

  // A universal method for closing the modal
  closeModal(e) {
    if (e) {
      if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Escape')) {
        this.overlay.classList.add('hidden');
        this.addRecipeWindowEl.classList.add('hidden');
      }
    } else {
      this.overlay.classList.add('hidden');
      this.addRecipeWindowEl.classList.add('hidden');
    }
  }

  //  Private method for adding an event listener to the Add Recipe navigation bar button
  addHandlerShowAddRecipeWindow() {
    this.openAddRecipeBtnEl.addEventListener(
      'click',
      this.openModal.bind(this)
    );
  }

  // Private method for adding event listeners for closing the modal to the close button, the overlay and the Escape key
  addHandlerCloseAddRecipeWindow() {
    // Event listener for closing the Modal Window by Close button
    this.closeAddRecipeBtnEl.addEventListener(
      'click',
      this.closeModal.bind(this)
    );
    // Event listener for closing the Modal Window by clicking on the Overlay
    this.overlay.addEventListener('click', this.closeModal.bind(this));

    // Event listener for closing the Modal Window by Escape
    document.addEventListener('keydown', this.closeModal.bind(this));
  }

  // Public method for initiating a new recipe upload upon triggering the submit button
  addHandlerUploadBtn(handler) {
    this.parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);

      handler(data);
    });
  }

  //  Public method for closing the modal after uploading a user's recipe
  closeAddRecipeForm() {
    wait(CLOSE_WINDOW_DELAY).then(() => this.closeModal());
  }

  //  A private method that generates the Add New Recipe Form Markup
  static generateMarkup() {
    const markup = `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input required name="title" type="text" />
        <label>URL</label>
        <input value="https://gfreefoodie.com/gluten-free-lasagna-sheets-or-cut-pasta-gluten-free-pasta-recipe/" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80" required name="image" type="text" />
        <label>Publisher</label>
        <input required name="publisher" type="text" />
        <label>Prep time</label>
        <input required name="cookingTime" type="number" />
        <label>Servings</label>
        <input required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 2</label>
        <input
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          type="text"
          name="ingredient-3"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
      </div>
      <button class="btn upload__btn">
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    `;

    return markup;
  }
}

export default new AddRecipeView();
