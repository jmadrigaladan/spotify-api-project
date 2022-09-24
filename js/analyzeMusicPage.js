import { enterKeyListener } from "./enterKey.js";
import { displaySearchResults } from "./renderResults.js";

console.log("Hello");

const ANALYZEMUSIC_SEARCHBAR_PHRASE = document.getElementById(
  "analyzeMusicSearchBar"
);

ANALYZEMUSIC_SEARCHBAR_PHRASE.addEventListener("keydown", function (event) {
  enterKeyListener(event);
});

const ANALYZEMUSIC_SEARCHBTN = document.getElementById("analyzeMusicSearchBtn");
ANALYZEMUSIC_SEARCHBTN.addEventListener("click", displaySearchResults);
