import { setCookie, getCookie } from './cookies.js'
import { saveJoke } from './jokes.js'
import { $newJoke, $getJoke, $saveJoke } from './elements.js'
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
  const newJokeId = $newJoke.dataset.jokeId;
  saveJoke($newJoke.innerText, newJokeId);
  const myCurrentJokeId = getCookie('jokeIds');
  setCookie('jokeIds',newJokeId + ',' + myCurrentJokeId, 100); 

  console.log(myCurrentJokeId);

});


// fetch joke

async function fetchJokeById(jokeId) {
  const jokeResponse = await fetch(`https://icanhazdadjoke.com/j/${jokeId}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const joke = await jokeResponse.json();
  
  saveJoke(joke.joke, joke.id);

}


// vytvoř funkci getSavedJokeIds, která vrátí jokeIds

const jokeIds = getCookie('jokeIds').split(',').filter(id => id && id !== 'undefined');
jokeIds.forEach(fetchJokeById);

// jokeIds.forEach(id => {
//   fetchJokeById(id)
// });

