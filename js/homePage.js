import { enterKeyListener } from "./enterKey.js";
import { displaySearchResults } from "./renderResults.js";

const HOME_SEARCHBAR_PHRASE = document.getElementById("homeSearchBar");
HOME_SEARCHBAR_PHRASE.addEventListener("keydown", function (event) {
  enterKeyListener(event);
});

const HOME_SEARCHBTN = document.getElementById("home__search-btn");
HOME_SEARCHBTN.addEventListener("click", redirectToAnalyzeMusic);

/**
 *
 * Redirects to the Analyze Music Page, search results should display but it is
 * currently not working
 *
 */
function redirectToAnalyzeMusic() {
  let searchKeyword = localStorage.getItem("searchWord");
  //Github location
  if (window.location.origin.includes("spotify-api-project")) {
    window.location.href = `${window.location.origin}/spotify-api-project/analyzeMusic.html`;
  } else {
    window.location.href = `${window.location.origin}/analyzeMusic.html`;
  }
  console.log(displaySearchResults(searchKeyword));
}

export { redirectToAnalyzeMusic };
