import { setCookie, getCookie } from './cookies.js'
import { saveJoke, fetchJokeById, fetchRandomJoke, getSavedJokeIds } from './jokes.js'
import { $newJoke, $getJoke, $saveJoke } from './elements.js'

fetchRandomJoke();

$getJoke.onclick = fetchRandomJoke;

// add joke

$saveJoke.addEventListener("click", () => {
  const newJokeId = $newJoke.dataset.jokeId;
  saveJoke($newJoke.innerText, newJokeId);
  const myCurrentJokeId = getCookie('jokeIds');
  setCookie('jokeIds',newJokeId + ',' + myCurrentJokeId, 100); 

  console.log(myCurrentJokeId);

});

const jokeIds = getSavedJokeIds();
jokeIds.forEach(fetchJokeById);

// jokeIds.forEach(id => {
//   fetchJokeById(id)
// });

