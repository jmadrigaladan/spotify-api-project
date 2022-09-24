import { displaySearchResults } from "./renderResults.js";

import { redirectToAnalyzeMusic } from "./homePage.js";

/**
 *
 * Listener for the 'Enter' Keyboard Press
 * @param {*} event
 *
 */
function enterKeyListener(event) {
  // searching in analyze music page and pressed enter key on search bar
  if (event.code === "Enter") {
    if (document.getElementById("home__search-btn") == null) {
      console.log(event.target.value);
      displaySearchResults(event.target.value);
    }
    //searching in the home page and pressed enter key on search bar
    else {
      let homePageSearchBarValue = event.target.value;
      localStorage.setItem("searchWord", homePageSearchBarValue);
      redirectToAnalyzeMusic();
    }
  }
}

export { enterKeyListener };
