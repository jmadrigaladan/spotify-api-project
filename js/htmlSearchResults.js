const horizontalCardsContainer = document.querySelector(
  ".horizonatal__cards--container"
);

/**
 *
 * Displays HTML Results based on artistTracks Param
 * @param {*} artistTracks
 *
 */
function renderArtistsTopTracks(artistTracks, searchPhrase) {
  localStorage.removeItem("searchPhrase");
  document.querySelector(
    ".search__results--text"
  ).innerHTML = `Search Results for "${searchPhrase}"`;
  horizontalCardsContainer.innerHTML = artistTracks
    .map((track) => {
      return `<div class="horizontal__card">
      <div class="horizontal__card--wrapper">
        <div class="song__img--wrapper">
          <img
            class="song__img"
            src=${track.album.images[1].url}
            alt=""
          />
        </div>
        <div class="text__container">
          <h1 class="song__title--text">${track.name}</h1>
          <h2 class="artist__name--text">${track.artists[0].name}</h2>
          <div class="spotify__text--container">
            <a
              href=${track.external_urls.spotify}
              target="_blank"
              class="spotify__song--link"
            >
              <h1 class="listen__on--text">Listen on</h1>
              <img
                class="spotify__logo"
                src="./assets/Spotify_logo_with_text.svg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
}

function renderFilteredTracks(tracks) {
  horizontalCardsContainer.innerHTML = tracks
    .map((track) => {
      return `<div class="horizontal__card">
      <div class="horizontal__card--wrapper">
        <div class="song__img--wrapper">
          <img
            class="song__img"
            src=${track.image}
            alt=""
          />
        </div>
        <div class="text__container">
          <h1 class="song__title--text">${track.trackName}</h1>
          <h2 class="artist__name--text">${track.artistName}</h2>
          <div class="spotify__text--container">
            <a
              href=${track.trackUrl}
              target="_blank"
              class="spotify__song--link"
            >
              <h1 class="listen__on--text">Listen on</h1>
              <img
                class="spotify__logo"
                src="./assets/Spotify_logo_with_text.svg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
}

export { renderArtistsTopTracks, renderFilteredTracks };
