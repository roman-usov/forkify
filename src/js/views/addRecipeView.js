// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';
import ParentView from './parentView';
import { wait } from '../helpers';
import { CLOSE_WINDOW_DELAY, RESTORE_FORM_DELAY } from '../config';

class AddRecipeView extends ParentView {
  parentEl = document.querySelector('.upload');

  addRecipeWindowEl = document.querySelector('.add-recipe-window');

  overlay = document.querySelector('.overlay');

  openAddRecipeBtnEl = document.querySelector('.nav__add--bookmark');

  closeAddRecipeBtnEl = document.querySelector('.btn--close-modal');

  message = 'Your recipe has been successfully uploaded. Enjoy!';

  constructor() {
    super();
    // eslint-disable-next-line no-underscore-dangle
    this.addHandlerShowAddRecipeWindow();
    this.addHandlerCloseAddRecipeWindow();
  }

  // Public method for opening or closing the modal
  controlModal() {
    this.overlay.classList.toggle('hidden');
    this.addRecipeWindowEl.classList.toggle('hidden');
  }

  // Private method for closing the modal by Escape
  closeModalByEscape(e) {
    if (e.key === 'Escape') {
      this.overlay.classList.add('hidden');
      this.addRecipeWindowEl.classList.add('hidden');
    }
  }

  addHandlerShowAddRecipeWindow() {
    this.openAddRecipeBtnEl.addEventListener(
      'click',
      this.controlModal.bind(this)
    );
  }

  addHandlerCloseAddRecipeWindow() {
    // Event listener for closing the Modal Window by Close button
    this.closeAddRecipeBtnEl.addEventListener(
      'click',
      this.controlModal.bind(this)
    );
    // Event listener for closing the Modal Window by clicking on the Overlay
    this.overlay.addEventListener('click', this.controlModal.bind(this));

    // Event listener for closing the Modal Window by Escape
    document.addEventListener('keydown', this.closeModalByEscape.bind(this));
  }

  addHandlerUploadBtn(handler) {
    this.parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);

      handler(data);
    });
  }

  // A public method that is called by the Controller to close the success message and then restore the Add New Recipe Form in the Modal
  closeAddRecipeForm() {
    wait(CLOSE_WINDOW_DELAY)
      .then(() => this.controlModal())
      .then(() => wait(RESTORE_FORM_DELAY))
      .then(() => {
        const markup = AddRecipeView.generateMarkup();
        this.parentEl.innerHTML = '';
        this.parentEl.insertAdjacentHTML('afterbegin', markup);
      });
  }

  //  A private method that generates the Add New Recipe Form Markup
  static generateMarkup() {
    const markup = `
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="TEST" required name="title" type="text" />
        <label>URL</label>
        <input value="https://gfreefoodie.com/gluten-free-lasagna-sheets-or-cut-pasta-gluten-free-pasta-recipe/" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80" required name="image" type="text" />
        <label>Publisher</label>
        <input value="TEST" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="23" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="4" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          value="0.5,kg,Rice"
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 2</label>
        <input
          value="1,,Avocado"
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          value=",,salt"
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
