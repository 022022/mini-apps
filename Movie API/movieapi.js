const container = document.querySelector('.container');
const apikey = document.querySelector('.api-key');
const searchword = document.querySelector('.search-word');
const searchbutton = document.querySelector('.search-button');
const message = document.querySelector('.message');

import * as randomQuoteFunctions from './randomQuoteFunctions.js';

function search() {
    if (searchword.value && apikey.value) {
        container.innerHTML = '';
        getData();
    }
}

async function getData() {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchword.value}&api_key=${apikey.value}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
    render(data);
}

function render(data) {
    const movieList = data.results
        .map(
            item => `
		<div class="movie-container">
			<img class="movie" src="https://image.tmdb.org/t/p/w1280${item.poster_path}" alt="image">
			<div>${item.original_title}(${item.release_date.slice(0, 4)}) - Rating: ${item.vote_average}
			</div>
		</div>
		`
        )
        .join('');

    container.insertAdjacentHTML('beforeend', movieList);
}

function searchOnEnter(event) {
    if (event.keyCode === 13) {
        search();
    }
    return;
}

function setLocalStorage() {
    localStorage.setItem('apikey', apikey.value);
    localStorage.setItem('searchword', searchword.value);
}

function getLocalStorage() {
    if (localStorage.getItem('apikey') && localStorage.getItem('searchword')) {
        apikey.value = localStorage.getItem('apikey');
        searchword.value = localStorage.getItem('searchword');
        search();
    }
}

search();

searchbutton.addEventListener('click', search);
document.addEventListener('keydown', searchOnEnter);

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', randomQuoteFunctions.getQuote);
