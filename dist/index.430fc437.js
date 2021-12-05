const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
/*const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = '1';
};

const handleGeoApiError = function (data) {
  if (data.error.code !== '018')
    throw new Error(`${data.error.code} ${data.error.message}`);
  if (data.error.code === '018')
    throw new Error(`${data.error.code} ${data.error.description}`);
};

function handleCountryApiError(responseData) {
  if (responseData.status === 404)
    throw new Error(`${responseData.status} Country not found`);
  if (/^4([0-3]|[5-9]){2}/g.test(responseData.status))
    throw new Error(
      `${responseData.status} Handling Error: ${responseData.message}`
    );
}

const getJSON = function (url, errorMsg) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`)
    .then(data => {
      console.log(data);
      if (data.status) handleCountryApiError(data);
      renderCountry(data[0]);
      const neighbor = data[0].borders ? data[0].borders[0] : null;
      //const neighbor = 'edssgdsgdtr';
      if (!neighbor) throw new Error('No neighbor found');
      return getJSON(`https://restcountries.com/v2/alpha/${neighbor}`);
    })
    .then(data => {
      console.log(data);
      //if (data === undefined) return;
      if (data.status) handleCountryApiError(data);
      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = '1'));
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flag}" alt=""/>
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
    +data.population / 1000000
  ).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${
    data.languages[0].name
  }</p>
              <p class="country__row"><span>💰</span>${
    data.currencies[0].code
  }</p>
            </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
};

const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const geolocation = await getPosition();
    const { latitude: lat, longitude: lng } = geolocation.coords;
    const geocodeResponse = await fetch(
      `https://geocode.xyz/${lat},${lng}?json=1`
    );
    //const geocodeResponse = await fetch(`https://geocode.xyz/${0},${1}?json=1`);
    console.log(geocodeResponse);
    const geocodeResponseBody = await geocodeResponse.json();
    if (geocodeResponseBody.error) handleGeoApiError(geocodeResponseBody);
    if (!geocodeResponseBody.country || !geocodeResponseBody.city)
      throw new Error('Your request did not produce any results');
    const countriesResponse = await fetch(
      `https://restcountries.com/v2/name/${geocodeResponseBody.country}`
    );
    const countriesResponseBody = await countriesResponse.json();
    if (countriesResponseBody.status)
      handleCountryApiError(countriesResponseBody);
    renderCountry(countriesResponseBody[0]);
    return `You are in ${geocodeResponseBody.city}, ${geocodeResponseBody.country}`;
  } catch (err) {
    console.log(err);
    renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    throw new Error(`Something went wrong 💥💥 ${err.message}. Try again!`);
  }
};*/ const renderIngredients = function(ingredients) {
    return ingredients.map((ingredient)=>{
        return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="src/img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ingredient.quantity}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>
   `;
    }).join('');
};
const renderRecipe = function(recipe) {
    const recipeHtml = `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="src/img/icons.svg#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="src/img/icons.svg#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="src/img/icons.svg#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="src/img/icons.svg#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="src/img/icons.svg#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="src/img/icons.svg#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${renderIngredients(recipe.ingredients)}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', recipeHtml);
    console.log(recipeHtml);
};
const showRecipe = async function() {
    try {
        const recipeResponse = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40');
        console.log(recipeResponse);
        const recipeData = await recipeResponse.json();
        console.log(recipeData);
        if (!recipeResponse.ok) throw new Error(`${recipeResponse.status} ${recipeData.message}`);
        let { recipe  } = recipeData.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            ingredients: recipe.ingredients,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time
        };
        console.log(recipe);
        renderRecipe(recipe);
    } catch (err) {
        alert(`Something went wrong: ${err.message}`);
    // console.log(`Something went wrong ${err.message}. Try again!`);
    // throw new Error(`Something went wrong ${err.message}`);
    }
};
showRecipe(); // fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886')

//# sourceMappingURL=index.430fc437.js.map
