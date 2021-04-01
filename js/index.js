import { setCookie, getCookie } from './cookies.js'
import { saveJoke, deleteJoke } from './jokes.js'

const $newJoke = document.getElementById("joke-new-text");
const $getJoke = document.getElementById("btn-another");
const $saveJoke = document.getElementById("btn-save");


// get joke API

getJoke();

async function getJoke() {
  const jokeResponse = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const joke = await jokeResponse.json();
  $newJoke.innerHTML = joke.joke;
  $newJoke.dataset.jokeId= joke.id; // ulozeni data jokeId do elementu
}

$getJoke.onclick = getJoke;

// add joke

$saveJoke.addEventListener("click", () => {
  saveJoke();
  const newJokeId = $newJoke.dataset.jokeId;
  console.log(newJokeId);
  const myCurrentJokeId = getCookie('jokeIds');
  setCookie('jokeIds',newJokeId + ',' + myCurrentJokeId, 100); 
});

console.log(getCookie('jokeIds'));

// fetch joke

async function fetchJokeById(jokeId) {
  const jokeResponse = await fetch(`https://icanhazdadjoke.com/j/${jokeId}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const joke = await jokeResponse.json();

  console.log(joke);
}

const jokeIds = getCookie('jokeIds').split(',').filter(id => id && id !== 'undefined');
jokeIds.forEach(fetchJokeById);

// jokeIds.forEach(id => {
//   fetchJokeById(id)
// });
