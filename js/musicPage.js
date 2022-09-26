import { displaySearchResults } from "./spotifyApiData.js";

const ANALYZEMUSIC_SEARCHBAR_PHRASE = document.getElementById(
  "analyzeMusicSearchBar"
);

ANALYZEMUSIC_SEARCHBAR_PHRASE.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    displaySearchResults(event.target.value);
  }
});

const ANALYZE_MUSIC_SEARCHBTN = document.getElementById(
  "analyzeMusicSearchBtn"
);
ANALYZE_MUSIC_SEARCHBTN.addEventListener("click", function () {
  displaySearchResults(ANALYZEMUSIC_SEARCHBAR_PHRASE.value);
});
