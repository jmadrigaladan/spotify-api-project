import { displaySearchResults } from "./spotifyApiData.js";

const LOADER = document.getElementById("loading");
const ANALYZEMUSIC_SEARCHBAR_PHRASE = document.getElementById(
  "analyzeMusicSearchBar"
);

ANALYZEMUSIC_SEARCHBAR_PHRASE.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    display();
  }
});

const ANALYZE_MUSIC_SEARCHBTN = document.getElementById(
  "analyzeMusicSearchBtn"
);
ANALYZE_MUSIC_SEARCHBTN.addEventListener("click", function () {
  display();
});

/**
 *
 * Displays a Loading State will then display results after 2 seconds
 *
 */
function display() {
  LOADER.classList.add("display");
  setTimeout(() => {
    LOADER.classList.remove("display");
  }, 2000);
  displaySearchResults(ANALYZEMUSIC_SEARCHBAR_PHRASE.value);
}

