"use strict";

// https://github.com/evelynmatilda/me132a-U2-mars.git <-- link to the repository

// 1. Functions to create a new film and add it to the database

// Function to create a new film
function createNewFilm (filmName, releaseYear, director, phase) {
    let film = {
        filmName: filmName,
        releaseYear: releaseYear,
        director: director,
        phase: phase
    };

    return film;
}

// Add the new film to the database
function addFilmToDatabase(MCUdatabase, film) {
    let wantToSaveFilm = confirm(`Are you sure you want to add ${film.filmName} to the list?`);

    if (wantToSaveFilm) {
        MCUdatabase.push(film);
    }

}

// What should happen when you push the "add" button
function onAddFilmSubmit(event) {
    event.preventDefault();

    let filmName = document.getElementById("filmName").value;
    let releaseYear = Number(document.getElementById("releaseYear").value);
    let director = document.getElementById("director").value;
    let phase = Number(document.getElementById("phase").value);

    if (filmName == "") {
        alert(`You have to fill out the form to add a film!`);
        return false;
    } 
    else if (releaseYear == "") {
        alert(`You have to fill out the form to add a film!`);
        return false;
    } 
    else if (director == "") {
        alert(`You have to fill out the form to add a film!`);
        return false;
    } 
    else if (phase == "") {
        alert(`You have to fill out the form to add a film!`);
        return false;
    }
    
    let film = createNewFilm(filmName, releaseYear, director, phase);
    film.id = MCUdatabase[MCUdatabase.length - 1].id + 1;

    addFilmToDatabase(MCUdatabase, film);
    renderFilms(MCUdatabase);

    let form = document.getElementById("add-film-form");
    form.reset();
}

// The handler for the add button
function setAddFilmHandler() {
    let form = document.getElementById("add-film-form");
    form.addEventListener("submit", onAddFilmSubmit);
}

// 2. Functions to delete films

// Delete a film by it's id
function deleteFilmById(films, id) {
    for (let i = 0; i < films.length; i++) {
        let film = films[i];

        if (film.id == id) {
            films.splice(i, 1);
            return;
        }
    }
}

// What happens when you click the delete button
function clickToDeleteFilm(event) {
    let button = event.target;
    let id = button.parentElement.id;

    if (confirm(`Are you sure you want to delete this film?`) == true) {
        deleteFilmById(MCUdatabase, id);
    } 
    else {
        return false;
    }

    renderFilms(MCUdatabase);
}

// The handler for the delete button
function setDeleteFilmHandlers() {
    let buttons = document.querySelectorAll(".film button");

    for (let button of buttons) {
        button.addEventListener("click", clickToDeleteFilm);
    }
}

// 3. Functions to make the films visible on the website

// Create an element and take the info from the object and fill the element with that info
function renderFilm(film) {
    let li = document.createElement("li");
    li.classList.add("film");
    li.id = film.id;
    
    li.innerHTML = `
        <li>${film.filmName}</li>
        <div>${film.releaseYear}</div>
        <div>${film.director}</div>
        <div>${film.phase}</div>
        <button>Delete</button>
        `;

    return li;
}

// Appends the newly created element to an already existing HTML-element by using a loop to go through the entire array
function renderFilms(films) {
    let filmsElement = document.getElementById("films");
    filmsElement.innerHTML = "";

    for (let film of films) {
        let filmElement = renderFilm(film);
        filmsElement.appendChild(filmElement);
    }

    setDeleteFilmHandlers();
}

// 4. Here are the functions for filtering by different criterias

// Get films by their release year and adds it to an arrray so that only that will show when filtered on that
function getFilmsByReleaseYear(films, releaseYear) {
    let filmsByYear = [];

    for (let film of films) {
        if(film.releaseYear == releaseYear) {
            filmsByYear.push(film);
        }
    }

    return filmsByYear;
}

// This works so that only the films with that specific year are shown
function filterByReleaseYear(event) {
    event.preventDefault();

    let releaseYear = document.getElementById("filter-year").value;
    let filmsYear = getFilmsByReleaseYear(MCUdatabase, releaseYear);

    renderFilms(filmsYear);

    document.getElementById("filter-phase").value = "";
}

// Get films by their MCU phase and adds it to an arrray so that only that will show when filtered on that
function getFilmsByPhase (films, phase) {
    let filmsByPhase = [];

    for (let film of films) {
        if(film.phase == phase) {
            filmsByPhase.push(film);
        }
    }

    return filmsByPhase;
}

// This works so that only the films with that specific phase are shown
function filterByPhase(event) {
    event.preventDefault();

    let phase = document.getElementById("filter-phase").value;
    let filmsPhase = getFilmsByPhase(MCUdatabase, phase);

    renderFilms(filmsPhase);

    document.getElementById("filter-year").value = "";
}

// What happens when you click show all
function clickToShowAll() {
    document.getElementById("filter-year").value = "";
    document.getElementById("filter-phase").value = "";
    renderFilms(MCUdatabase);
}

// The handlers for our filtering form and buttons
function setFilterFilmHandlers() {
    let yearFilter = document.getElementById("filter-by-releaseYear");
    let phaseFilter = document.getElementById("filter-by-phase");
    let showAll = document.getElementById("show-all");

    yearFilter.addEventListener("submit", filterByReleaseYear);
    phaseFilter.addEventListener("submit", filterByPhase);
    showAll.addEventListener("click", clickToShowAll);
}

// Initializes the website(direct code)
renderFilms(MCUdatabase);
setAddFilmHandler();
setFilterFilmHandlers();