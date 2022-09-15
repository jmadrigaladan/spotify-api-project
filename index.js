const CLIENT_ID = "0a3d1528dd4a48f2b8af342ec47fb4a8";
const CLIENT_SECRET = "f3f3dbd0a43d45fea9c4b7c73ecd06cd";
let searchInput = "Lil Gotit";

/**
 *
 * @returns access token to make calls to the Spotify Web API
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
async function getArtistTopTracks() {
  const topTracksRequest = await fetch(
    `https://api.spotify.com/v1/artists/${await getArtistID(
      searchInput
    )}/top-tracks?market=us`,
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
async function getAudioAnalysisTopTracks() {
  const topTracks = await getArtistTopTracks();
  // topTracks.map((track) => console.log(track, track.external_urls, track.id));
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
  const audioAnalysisData = await audioAnalysisTopTracks;
  return audioAnalysisData;
}

/**
 *
 * @param {*} minimum
 * @param {*} maximum
 * @param {*} tracks
 * @param {*} filterOption
 * @returns a filtered array based on the filterOption param and the range(minimum and maximum)
 *
 */
async function filterBy(minimum, maximum, tracks, filterOption) {
  return tracks.filter(
    (trackAnalysis) =>
      trackAnalysis.track[filterOption] <= maximum &&
      trackAnalysis.track[filterOption] >= minimum
  );
}

async function main() {
  const audioAnalysisTopTracks = await getAudioAnalysisTopTracks();
  console.log(audioAnalysisTopTracks);
  audioAnalysisTopTracks.map((x) => console.log(x.track.loudness));
  console.log(filterBy(130, 180, audioAnalysisTopTracks, "tempo"));
  console.log(filterBy(-10, -8, audioAnalysisTopTracks, "loudness"));
}

main();
