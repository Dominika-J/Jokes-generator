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
  $newJoke.dataset.jokeId= joke.id; // ulozeni data jokeId do elementu
}

// const newJokeId = $newJoke.dataset.jokeId;
// const myCurrentCookiesArr = getCookie('jokeIds').split(',');

// myCurrentCookiesArr.push(newJokeId);

// setCookie('jokeIds', myCurrentCookiesArr.join());
// console.log(myCurrentCookiesArr);


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

function saveJoke() {
  const $jokeItem = document.createElement("div"); // created div 
  $jokeItem.classList.add("joke-item");

  const $jokeText = document.createElement("p"); // created p
  $jokeText.innerText = $newJoke.innerText; //parametr
  $jokeText.classList.add("joke-text");
  $jokeItem.appendChild($jokeText);

  const $jokeDelete = document.createElement("button"); // created button
  $jokeDelete.innerHTML = "Delete";
  $jokeDelete.classList.add("btn-delete");
  const $jokeTrash = document.createElement("i");
  $jokeTrash.className = "far fa-trash-alt fa"; 

  $jokeDelete.appendChild($jokeTrash);
  $jokeItem.appendChild($jokeDelete);
  $columnsLeft.appendChild($jokeItem);

  $jokeDelete.addEventListener("click", deleteJoke); // eventListener

}


// delete joke

function deleteJoke(e) {
    const item = e.target;
    if(item.classList[0] === "btn-delete") {
        const $jokeItem = item.parentElement;
        $jokeItem.remove();
    }
}

// set jokes into cookies

function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

// get jokes into cookies

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

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
