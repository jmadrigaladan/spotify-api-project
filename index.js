const CLIENT_ID = "0a3d1528dd4a48f2b8af342ec47fb4a8";
const CLIENT_SECRET = "f3f3dbd0a43d45fea9c4b7c73ecd06cd";
let searchInput = "Lil Gotit";

async function getAPIAccessToken() {
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
  const access_token = data.access_token;
  return access_token;
}


async function search(searchKeyword) {
  let artistParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + await getAPIAccessToken(),
    },
  };
  const artistID = await fetch(
    `https://api.spotify.com/v1/search?q=${searchKeyword}&type=artist`,
    artistParameters
  );
  const response = await artistID.json();
  console.log(response);
}

search(searchInput);
