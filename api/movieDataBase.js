

const POPULAR_MOVIES_URL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"


const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGQzZTg3YmQ3ZThmZmQzM2NmM2U1YjdhZWIyMzRhOSIsIm5iZiI6MTc0NTk0NjIxNy41OTAwMDAyLCJzdWIiOiI2ODExMDY2OTcxZGVkY2I4YWNlYjk0NDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.u5_-cLPK1Gw9z35Vnv4G4jX0rnfFxeqpV8M7sR853M0"

const options = {
  method: "GET",
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
}

export const fetchPopularMovies = async () => {
  try {

    const rawData = await fetch(POPULAR_MOVIES_URL, options)

    const jsonData = await rawData.json()

    return jsonData


  } catch (error) {
    console.log(error)
    console.log("Error fetching popular movies")
  }
}

export const SearchMovies = async (searchQuery, page = 1) => {
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`

  try {
    const results = await fetch(SEARCH_URL, options)
    const jsonData = await results.json()

    return jsonData.results

  } catch (error) {

  }

}

export const SearchTVShows = async (searchQuery, page = 1) => {
  const SEARCH_URL = `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`

  try {
    const results = await fetch(SEARCH_URL, options)
    const jsonData = await results.json()

    return jsonData.results

  } catch (error) {

  }
}

export const SearchGames = async (searchQuery, page = 1) => {
  const SEARCH_URL = `https://api.rawg.io/api/games?key=27d6206ea5d24c648d08a917115bdbce&search=${searchQuery}`

  try {
    const results = await fetch(SEARCH_URL)
    const jsonData = await results.json()

    return jsonData.results

  } catch (error) {

  }
}




const getSpotifyAuthToken = async () => {
  const clientId = '979685bc93d64c61abbd5f0bfa9a9b79';
  const clientSecret = 'a4f38f3238ea40a5ba7c150b51fb2420';

  const authUrl = 'https://accounts.spotify.com/api/token';
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials);

  try {
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      console.error('Failed to fetch Spotify auth token:', response.statusText);
      return;
    }

    const data = await response.json();
    const token = data.access_token;


    localStorage.setItem('auth_token', token);
    localStorage.setItem('expires', Date.now() + 3600 * 1000);

    console.log('Spotify token:', token);
    return token;
  } catch (error) {
    console.error('Error fetching Spotify auth token:', error);
  }
};






export const SearchSongs = async (query) => {
  let token = localStorage.getItem('auth_token');
  const expiresIn = localStorage.getItem('expires');


  if (!token || Date.now() >= expiresIn) {
    console.log('Fetching a new Spotify token...');
    token = await getSpotifyAuthToken();
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to search for songs:', response.statusText);
      return null;
    }

    const data = await response.json();
    const RefinedList = []

    data.tracks.items.forEach((item) => {
      const data = {
        name: item.name,
        posterUrl: item.album.images[0].url

      }
      RefinedList.push(data)
    })


    return RefinedList;
  } catch (error) {
    console.error('Error searching for songs:', error);
    return null;
  }
};
