const jsonFile = 'movie-quotes.json';
const randomQuote = document.querySelector('.random-quote');

export async function getQuote() {
    const res = await fetch(jsonFile);
    const data = await res.json();
    addQuote(data);
}

function addQuote(data) {
    const randomNum = Math.round(Math.random() * (data.length - 1));
    const quote = `<p class="the-quote">${data[randomNum].quote}</p><p>${(data[randomNum].author) ? data[randomNum].author : ''} (${data[randomNum].source})</p>`
    randomQuote.insertAdjacentHTML('beforeend', quote);
}