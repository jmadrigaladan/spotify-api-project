import { displaySearchResults } from "./spotifyApiData.js";

const HOME_SEARCHBAR_PHRASE = document.getElementById("homeSearchBar");
HOME_SEARCHBAR_PHRASE.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    localStorage.setItem("searchPhrase", event.target.value);
    redirectToAnalyzeMusic();
  }
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
  let searchKeyword = localStorage.getItem("searchPhrase");
  //Github scenario
  if (window.location.origin.includes("spotify-api-project")) {
    window.location.href = `${window.location.origin}/spotify-api-project/analyzeMusic.html`;
  }
  // local machine scenario
  else {
    window.location.href = `${window.location.origin}/analyzeMusic.html`;
  }
  console.log(displaySearchResults(searchKeyword));
}

export { redirectToAnalyzeMusic };
