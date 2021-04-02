import { $columnsLeft } from "./elements.js";

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
  console.log(jokeId);
}

// delete joke

export function deleteJoke(event) {
  const $clickedElement = event.target;
  if ($clickedElement.classList[0] === "btn-delete") {
    const $jokeItem = $clickedElement.parentElement;
    const jokeId = $jokeItem.dataset.jokeId;
    $jokeItem.remove();
  }
}
//pred smazanim
// TvzdxXSCdFd,L6UnyP7Unyd,dasdafsf

//po smazani vtipu L6UnyP7Unyd
// TvzdxXSCdFd,dasdafsf

