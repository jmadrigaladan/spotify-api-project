const CLIENT_ID = "0a3d1528dd4a48f2b8af342ec47fb4a8";
const CLIENT_SECRET = "f3f3dbd0a43d45fea9c4b7c73ecd06cd";
import {
  renderArtistsTopTracks,
  renderFilteredTracks,
} from "./htmlSearchResults.js";
let searchKeyword = localStorage.getItem("searchPhrase");
const ANALYZEMUSIC_SEARCHBAR_PHRASE = document.getElementById(
  "analyzeMusicSearchBar"
);

/**
 *
 * @param {*} artistSearched
 * @returns an array of objects of the artist's top tracks
 */
async function topTracks(artistSearched) {
  return await getArtistTopTracks(await getArtistID(artistSearched));
}

/**
 *
 * Displays search results
 * @param {*} searchTerm
 *
 */
async function displaySearchResults(searchTerm) {
  if (searchTerm == null) {
    return;
  }
  renderArtistsTopTracks(await topTracks(searchTerm), searchTerm);
}

displaySearchResults(searchKeyword);
export { displaySearchResults };

/**
 *
 * @returns access token to make calls to the Spotify Web API
 *
 */
async function getToken() {
  let authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      CLIENT_ID +
      "&client_secret=" +
      CLIENT_SECRET,
  };

  const fetchData = await fetch(
    "https://accounts.spotify.com/api/token",
    authParameters
  );
  const data = await fetchData.json();
  return data.access_token;
}

/**
 *
 * @returns the api method request and the headers required for
 * each call to the Spotify API
 *
 */
async function methodGetParameters() {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await getToken()),
    },
  };
}

/**
 *
 * @param {*} searchKeyword
 * @returns the unique Spotify artist ID based on the searchKeyword parameter
 *
 */
async function getArtistID(searchKeyword) {
  const artistIDRequest = await fetch(
    `https://api.spotify.com/v1/search?q=${searchKeyword}&type=artist`,
    await methodGetParameters()
  );
  const data = await artistIDRequest.json();
  return data.artists.items[0].id;
}

/**
 *
 * @returns an array of objects that includes all of the artists top tracks
 *
 */
async function getArtistTopTracks(artist__id) {
  const topTracksRequest = await fetch(
    `https://api.spotify.com/v1/artists/${artist__id}/top-tracks?market=us`,
    await methodGetParameters()
  );
  const data = await topTracksRequest.json();
  return data.tracks;
}

/**
 *
 * @returns an array of objects that holds the audio analysis of each of the artist's top tracks
 *
 */
async function getAudioAnalysisTopTracks(topTracks) {
  const audioAnalysisTopTracks = Promise.all(
    topTracks.map(
      async (track) =>
        await (
          await fetch(
            `https://api.spotify.com/v1/audio-analysis/${track.id}`,
            await methodGetParameters()
          )
        ).json()
    )
  );
  return await audioAnalysisTopTracks;
}

let called = false;
let artistTopTracks = undefined;
let audioAnalysisTopTracks = undefined;
let combinedTracks = undefined;
async function renderTempoTracks(min, max) {
  //checks if artist have been searched, if there are no search results
  //we will return and not render any artists
  if (
    !document
      .getElementsByClassName("horizonatal__cards--container")[0]
      .innerHTML.includes("wrapper") &&
    !called
  ) {
    return;
  }
  if (!called) {
    artistTopTracks = await topTracks(
      searchKeyword ? searchKeyword : ANALYZEMUSIC_SEARCHBAR_PHRASE.value
    );
    audioAnalysisTopTracks = await getAudioAnalysisTopTracks(artistTopTracks);
    combinedTracks = combineTopTracksAudio(
      artistTopTracks,
      audioAnalysisTopTracks
    );
    called = true;
  }
  return renderFilteredTracks(tempoFilter(min, max, combinedTracks));
}

/**
 *
 * @param {*} topTracks
 * @param {*} audioAnalysisTracks
 * @returns a combined array of the toptracks and the audio analysis for each track
 */
function combineTopTracksAudio(topTracks, audioAnalysisTracks) {
  let mergedArr = [];
  topTracks.map((track) => {
    mergedArr.push({
      image: track.album.images[1].url,
      trackName: track.name,
      artistName: track.artists[0].name,
      trackUrl: track.external_urls.spotify,
    });
  });
  for (let i = 0; i < mergedArr.length; i++) {
    mergedArr[i].tempo = audioAnalysisTracks[i].track["tempo"];
  }
  return mergedArr;
}

/**
 *
 * @param {*} minimum
 * @param {*} maximum
 * @param {*} tracks
 * @returns a filtered array based on the given range(minimum & maximum)
 */
function tempoFilter(minimum, maximum, tracks) {
  return tracks.filter(
    (track) => track["tempo"] <= maximum && track["tempo"] >= minimum
  );
}

export { renderTempoTracks };
