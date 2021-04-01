import { $columnsLeft } from './elements.js'

// create joke

export function saveJoke(jokeText) {
    const $jokeItem = document.createElement("div"); // created div 
    $jokeItem.classList.add("joke-item");
  
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
  
  export function deleteJoke(e) {
      const item = e.target;
      if(item.classList[0] === "btn-delete") {
          const $jokeItem = item.parentElement;
          $jokeItem.remove();
      }
  }