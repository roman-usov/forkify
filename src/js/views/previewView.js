// eslint-disable-next-line import/no-unresolved
import icons from 'url:../../img/icons.svg';
import ParentView from './parentView';

export default class PreviewView extends ParentView {
  static generatePreviewMarkup(recipeData) {
    const id = window.location.hash.slice(1);
    console.log('id', id);
    console.log('recipe id', recipeData.id);
    console.log('id = recipe id', id === recipeData.id);

    return `
      <li class="preview">
        <a class="preview__link ${
          recipeData.id === id ? 'preview__link--active' : ''
        }"  href="#${recipeData.id}">
          <figure class="preview__fig">
            <img src="${recipeData.image}" alt="${recipeData.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipeData.title}</h4>
            <p class="preview__publisher">${recipeData.publisher}</p>
            <div class="preview__user-generated ${
              recipeData.key ? '' : 'hidden'
            }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
   `;
  }
}
