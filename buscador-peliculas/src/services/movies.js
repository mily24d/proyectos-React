//mocks que simulan los resultados de la API
// import withResults from '../mocks/with-results.json'
// import noResults from '../mocks/no-results.json'
const API_KEY = '130630fd'

//convertimos el fetching de datos en un servicio abstraido del custom hook useMovies
export const searchMovies = async ({ search }) => {
    if( search === '' ) return null
    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&type=movie`)
        const json = await response.json()
        const movies = json.Search
  
        return movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
        }))
    // eslint-disable-next-line no-unused-vars
    }catch(e){
        throw new Error ('Error buscando las películas')
    }
}