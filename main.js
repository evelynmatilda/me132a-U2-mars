"use strict";

// Functions to create a new film and add it to the database
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

function addFilmToDatabase(MCUdatabase, film) {
    console.log(`You are adding ${film.filmName} to the database`);
    MCUdatabase.push(film);
}

function onAddFilmSubmit(event) {
    event.preventDefault();

    let filmName = document.getElementById("filmName").value;
    let releaseYear = Number(document.getElementById("realeaseYear").value);
    let director = document.getElementById("director").value;
    let phase = Number(document.getElementById("phase").value);
    
    let film = createNewFilm(filmName, releaseYear, director, phase);
    film.id = MCUdatabase[MCUdatabase.length - 1].id + 1;

    addFilmToDatabase(MCUdatabase, film);
    renderFilms(MCUdatabase);

    let form = document.getElementById("add-film-form");
    form.reset();
}

function setAddFilmHandler() {
    let form = document.getElementById("add-film-form");
    form.addEventListener("submit", onAddFilmSubmit);
}
// Functions to remove films
function removeFilmByID(films, id) {
    for (let i = 0; i < films.length; i++) {
        let film = films[i];

        if (film.id == id) {
            films.splice(i, 1);
            return;
        }
    }
}

function clickToRemoveFilm(event) {
    let button = event.target;
    let filmName = button.parentElement.firstElementChild.textContent;

    removeFilmByID(MCUdatabase, filmName);

    renderFilms(MCUdatabase);
}

function setRemoveFilmHandlers() {
    let buttons = document.querySelectorAll(".film button");

    for (let button of buttons) {
        button.addEventListener("click", clickToRemoveFilm);
    }
}

// Functiond to make our films visible on our website 
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

// Here are my functions for filtering by different parameters
function getFilmsByReleaseYear(films, releaseYear) {
    let filmsByYear = [];

    for (let film of films) {
        if(film.realeaseYear == releaseYear) {
            filmsByYear.push(film);
        }
    }

    return filmsByYear;
}

function filterByRealeaseYear(event) {
    event.preventDefault();

    let realeaseYear = document.getElementById("filter-year");
    let filmsYear = getFilmsByReleaseYear(MCUdatabase, realeaseYear);

    renderFilms(filmsYear);
}

function getFilmsByPhase (films, phase) {
    let filmsByPhase = [];

    for (let film of films) {
        if(film.phase == phase) {
            filmsByPhase.push(film);
        }
    }

    return filmsByPhase;
}

function filterByPhase(event) {
    event.preventDefault();

    let phase = document.getElementById("filter-phase");
    let filmsPhase = getFilmsByPhase(MCUdatabase, phase);

    renderFilms(filmsPhase);
}

function clickToShowAll() {
    document.getElementById("filter-year").value = "";
    document.getElementById("filter-phase").value = "";
    renderFilms(MCUdatabase);
}

function setFilterFilmHandlers() {
    let yearFilter = document.getElementById("filter-by-releaseYear");
    let phaseFilter = document.getElementById("filter-by-phase");
    let showAll = document.getElementById("show-all");

    yearFilter.addEventListener("submit", filterByRealeaseYear);
    phaseFilter.addEventListener("submit", filterByPhase);
    showAll.addEventListener("click", clickToShowAll);
}

renderFilms(MCUdatabase);
setAddFilmHandler();
setFilterFilmHandlers();