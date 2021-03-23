const $joke = document.getElementById('joke-new-text');

const $getJoke = document.getElementById('btn-another');
const $saveJoke = document.getElementById('btn-save');
cosnt $deleteJoke = document.getElementById('btn-delete');

// get joke API
getJoke();

async function getJoke() {
    const getData = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
    const joke = await getData.json();
    $joke.innerHTML = joke.joke;
}

$getJoke.onclick = getJoke;

// delete joke

