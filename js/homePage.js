const HOME_SEARCHBAR_PHRASE = document.getElementById("homeSearchBar");
const magnifyingGlassIcon = document.querySelector(".static__state--icon");
const loadIcon = document.querySelector(".load__state--icon");

HOME_SEARCHBAR_PHRASE.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    localStorage.setItem("searchPhrase", event.target.value);
    replaceSubmitButtonIcon();
    setTimeout(() => {
      redirectToAnalyzeMusic();
    }, 1500);
  }
});

const HOME_SEARCHBTN = document.getElementById("home__search-btn");
HOME_SEARCHBTN.addEventListener("click", function () {
  localStorage.setItem("searchPhrase", HOME_SEARCHBAR_PHRASE.value);
  replaceSubmitButtonIcon();
  setTimeout(() => {
    redirectToAnalyzeMusic();
  }, 1500);
});

function replaceSubmitButtonIcon() {
  magnifyingGlassIcon.classList.toggle("hide");
  loadIcon.classList.toggle("show");
}

/**
 *
 * Redirects to the Analyze Music Page, search results should display but it is
 * currently not working
 *
 */
function redirectToAnalyzeMusic() {
  //Github scenario
  if (window.location.origin.includes("github")) {
    window.location.href = `${window.location.origin}/spotify-api-project/analyzeMusic.html`;
  }
  // local machine scenario
  else {
    window.location.href = `${window.location.origin}/analyzeMusic.html`;
  }
}

export { redirectToAnalyzeMusic };
