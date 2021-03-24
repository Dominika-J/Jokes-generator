const $newJoke = document.getElementById("joke-new-text");
const $columnsLeft = document.getElementById("columns-left");

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
}

$getJoke.onclick = getJoke;

// add joke
$saveJoke.addEventListener("click", saveJoke);

function saveJoke() {
  const $jokeItem = document.createElement("div");
  $jokeItem.classList.add("joke-item");

  const $jokeText = document.createElement("p");
  $jokeText.innerText = $newJoke.innerText;
  $jokeText.classList.add("joke-text");
  $jokeItem.appendChild($jokeText);

  const $jokeDelete = document.createElement("button");
  $jokeDelete.innerHTML = "delete";
  $jokeDelete.classList.add("btn-delete");
  $jokeItem.appendChild($jokeDelete);

  $columnsLeft.appendChild($jokeItem);

  $jokeDelete.addEventListener("click", deleteJoke);

}

// delete joke
function deleteJoke(e) {
    const item = e.target;
    if(item.classList[0] === "btn-delete") {
        const $jokeItem = item.parentElement;
        $jokeItem.remove();
    }
}

// 