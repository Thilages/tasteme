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
  const SEARCH_URL = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`

  try {
    const results = await fetch(SEARCH_URL, options)
    const jsonData = await results.json()

    const allData = jsonData.results






  } catch (error) {

  }

}