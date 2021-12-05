import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function() {
  try {
    const recipeId = window.location.hash.slice(1);
    if(!recipeId) return;
    recipeView.renderSpinner();
    await model.loadRecipe(recipeId);
    recipeView.render(model.state.recipe);
  } catch(err) {
    //alert(`Something went wrong: ${err.message}`);
    console.log(`Something went wrong ${err.message}. Try again!`);
    // throw new Error(`Something went wrong ${err.message}`);
  }
};

controlRecipes();

// fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886')

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

/*
window.addEventListener('hashchange', showRecipe);
window.addEventListener('load', showRecipe);*/

//////////// Drafts

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
};*/


/*const renderIngredients = function(ingredients) {
  return ingredients.map(ingredient => {
   return  `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ingredient.quantity}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>
   `;
  }).join('');
};*/
