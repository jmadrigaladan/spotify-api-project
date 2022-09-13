const CLIENT_ID = "0a3d1528dd4a48f2b8af342ec47fb4a8";
const CLIENT_SECRET = "f3f3dbd0a43d45fea9c4b7c73ecd06cd";
let searchInput = "Lil Gotit";

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


async function getArtistID(searchKeyword) {
  let artistParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + await getToken(),
    },
  };
  const search = await fetch(
    `https://api.spotify.com/v1/search?q=${searchKeyword}&type=artist`,
    artistParameters
  );
  const data = await search.json();
  return data.artists.items[0].id
}

async function getArtistAlbums(){
  let albumParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + await getToken(),
    },
  }
  const limit = 20;
  const requestAlbums = await fetch(`https://api.spotify.com/v1/artists/${await getArtistID(searchInput)}/albums?include_groups=album&limit=${limit}`,albumParameters)
  const albumsData = await requestAlbums.json()
  return albumsData
}

async function openAlbums(){
  const albums = await getArtistAlbums()
  console.log(albums)
}
 
openAlbums()