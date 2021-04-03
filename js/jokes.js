import { $columnsLeft } from "./elements.js";
import { setCookie, getCookie } from "./cookies.js";
import { $newJoke } from './elements.js'


// create joke

export function saveJoke(jokeText, jokeId) {
  const $jokeItem = document.createElement("div"); // created div
  $jokeItem.classList.add("joke-item");
  $jokeItem.dataset.jokeId = jokeId;

  const $jokeText = document.createElement("p"); // created p
  $jokeText.innerText = jokeText; //parametr
  $jokeText.classList.add("joke-text");
  $jokeItem.appendChild($jokeText);

  const $jokeDelete = document.createElement("button"); // created button
  $jokeDelete.innerHTML = "Delete";
  $jokeDelete.classList.add("btn-delete");
  const $jokeTrash = document.createElement("i"); // created button icon
  $jokeTrash.className = "far fa-trash-alt fa";

  $jokeDelete.appendChild($jokeTrash);
  $jokeItem.appendChild($jokeDelete);
  $columnsLeft.appendChild($jokeItem);

  $jokeDelete.addEventListener("click", deleteJoke);
}

// delete joke

export function deleteJoke(event) {
  const $clickedElement = event.target;
  if ($clickedElement.classList[0] === "btn-delete") {
    const $jokeItem = $clickedElement.parentElement;

    const jokeId = $jokeItem.dataset.jokeId;
    let myCurrentJokeId = getSavedJokeIds();
    console.log(jokeId);
    // debugger;

    console.log("before", myCurrentJokeId);

    myCurrentJokeId = myCurrentJokeId
      .filter((cookie) => cookie !== jokeId)
      .join(",");
    setCookie("jokeIds", myCurrentJokeId, 100);

    $jokeItem.remove();
  }
}

// fetch joke

export async function fetchJokeById(jokeId) {
  const jokeResponse = await fetch(`https://icanhazdadjoke.com/j/${jokeId}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const joke = await jokeResponse.json();

  saveJoke(joke.joke, joke.id);
}

export const getSavedJokeIds = () => {
  return getCookie("jokeIds")
    .split(",")
    .filter((id) => id && id !== "undefined");
};

// get joke API

export async function fetchRandomJoke() {
  const jokeResponse = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const joke = await jokeResponse.json();
  $newJoke.innerHTML = joke.joke;
  $newJoke.dataset.jokeId = joke.id; // ulozeni data jokeId do elementu
}
 