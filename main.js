"use strict";

function createNewFilm (filmName, releaseYear, director, phase) {
    let film = {
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

    let newFilm = createNewFilm(filmName, Number(releaseYear), Number(phase));
    return newFilm;
}

function addFilmToDatabase(database, film) {
    console.log(`You are adding ${film.filmName}`);
    database.push(film);
}

addFilmToDatabaseFromPrompt(database) {
    let film = createNewFilmFromPrompt();
    let wantToSaveFilm = confirm(`Are you sure you want to add: ${film.filmName}, ${film.releaseYear}, ${film.director}, ${film.phase}?`);

    if (wantToSaveFilm) {
        addFilmToDatabase(MCUdatabase, film);
    }
}

function renderFilm(film) {
    let filmElement = document.getElementById("films")
}