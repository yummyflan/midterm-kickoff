const axios = require('axios');

// API key template
const axiosTemplate = (url, params, host) => {
  return axios.get(url, {
          params,
          headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': host
          }
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        })
}

//--- retrieve food API
const food = (text) => {
  const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/suggest';
  const params = { query: `${text}`, number: '10' };
  const host = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
  const axiosResponse = axiosTemplate(url, params, host);

  axiosResponse
  .then((response) => {
    console.log('food length: ', response.results.length);

    if (response.results.length !== 0) {
      return console.log('it do be a food');
    }
    else {
      console.log('checking other catergories now!');
      book(text);
    }
  })
}

// ----- retrieve book API
const book = (text) => {
  const url = 'https://book-finder1.p.rapidapi.com/api/search';
  const params = { title: `${text}`, results_per_page: '2', page: '1' };
  const host = 'book-finder1.p.rapidapi.com';
  const axiosResponse = axiosTemplate(url, params, host);

  axiosResponse
  .then((response) => {
    console.log('book length: ', response.results.length);

    if (response.results.length !== 0) {
      return console.log('it do be a book');
    }
    else {
      console.log('checking other catergories now!');
      movie(text);
    }
  })
}

// ------ retrieve movie API
const movie = (text) => {
  const url = 'https://movie-database-alternative.p.rapidapi.com/';
  const params = { s: `${text}`, r: 'json', page: '1' };
  const host = 'movie-database-alternative.p.rapidapi.com';
  const axiosResponse = axiosTemplate(url, params, host);

  axiosResponse
  .then((response) => {
    console.log('is movie: ', response.Response);

    if (response.Response) {
      return console.log('it do be a movie');
    }
    else {
      console.log('checking other catergories now!');
      product(text);
    }
  })
}

const text = 'Django Unchained';
food(text);
