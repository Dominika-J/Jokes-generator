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

$getJoke.onclick = getJoke;

// add joke
$saveJoke.addEventListener("click", saveJoke);

function saveJoke() {
  const $jokeItem = document.createElement("div"); // created div 
  $jokeItem.classList.add("joke-item");

  const $jokeText = document.createElement("p"); // created p
  $jokeText.innerText = $newJoke.innerText;
  $jokeText.classList.add("joke-text");
  $jokeItem.appendChild($jokeText);

  const $jokeDelete = document.createElement("button"); // created button
  $jokeDelete.innerHTML = "delete";
  $jokeDelete.classList.add("btn-delete");
  $jokeItem.appendChild($jokeDelete);

  $columnsLeft.appendChild($jokeItem);

  const newJokeId = $newJoke.dataset.jokeId;
  const myCurrentJokeId = getCookie('jokeIds');
  setCookie('jokeIds',newJokeId + ',' + myCurrentJokeId, 100);


// const newJokeId = $newJoke.dataset.jokeId;
// const myCurrentCookiesArr = getCookie('jokeIds').split(',');

// myCurrentCookiesArr.push(newJokeId);

// setCookie('jokeIds', myCurrentCookiesArr.join());
// console.log(myCurrentCookiesArr);

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


//save this joke here!!!!!!!!!!!!!!!!!!!!

}

const jokeIds = getCookie('jokeIds').split(',').filter(id => id && id !== 'undefined');

// jokeIds.forEach(id => {
//   fetchJokeById(id)
// });

jokeIds.forEach(fetchJokeById);