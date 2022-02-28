"use strict";

function createNewFilm (filmName, releaseYear, director, phase) {
    let film = {
        id: id,
        filmName: filmName,
        releaseYear: releaseYear,
        director: director,
        phase: phase
    };

    return film;
}

function createNewFilmFromPrompt() {
    let filmName = prompt("Enter the name of the film");
    let releaseYear = prompt("Enter the release year");
    let director = prompt("Enter the name of the director");
    let phase = prompt("Enter the MCU phase");

    let newFilm = createNewFilm(filmName, Number(releaseYear), director, Number(phase));
    return newFilm;
}

function addFilmToDatabase(MCUdatabase, film) {
    console.log(`You are adding ${film.filmName} to the database`);
    MCUdatabase.push(film);
}

function addFilmToDatabaseFromPrompt(MCUdatabase) {
    let film = createNewFilmFromPrompt();
    let wantsToSaveFilm = confirm(`Are you sure you want to add: ${film.filmName}, ${film.releaseYear}, ${film.director}, ${film.phase} ?`);

    if (wantsToSaveFilm) {
        addFilmToDatabase(MCUdatabase, film);
    }
}


function removeFilmByID(films, id) {
    for (let i = 0; i < films.length; i++) {
        let film = films[i];

        if (film.id == id) {
            films.splice(i, 1);
            return;
        }
    }
}

function renderFilm(film) {
    let div = document.createElement("div");
    div.classList.add("film");
    div.id = film.id;
    
    div.innerHTML = `
        <div>${film.id}</div>
        <div>${film.filmName}</div>
        <div>${film.releaseYear}</div>
        <div>${film.director}</div>
        <div>${film.phase}</div>
        <button type="button">Remove</button>
        `;

    return div;
}

function renderFilms(films) {
    let filmsElement = document.getElementById("films");
    filmsElement.innerHTML = "";

    for (let film of films) {
        let filmElement = renderFilm(film);
        filmsElement.appendChild(filmElement);
    }

    setRemoveFilmHandlers();
}

function onAddFilmClick() {
    addFilmToDatabaseFromPrompt(MCUdatabase);
    renderFilms(MCUdatabase);
}

function setAddFilmHandler() {
    let button = document.getElementById("add");
    button.addEventListener("click", onAddFilmClick);
}

function clickToRemoveFilm(event) {
    let button = event.target;
    let filmName = button.parentElement.firstElementChild.textContent;

    removeFilmByName(MCUdatabase, filmName);

    renderFilms(MCUdatabase);
}

function setRemoveFilmHandlers() {
    let buttons = document.querySelectorAll(".film button");

    for (let button of buttons) {
        button.addEventListener("click", clickToRemoveFilm);
    }
}

renderFilms(MCUdatabase);
setAddFilmHandler();