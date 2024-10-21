/* eslint-disable react/prop-types */
//nuestro componente devuelve una lista mapeada de peliculas
export function ListOfMovies ({ movies }) {
    return (
        <ul className="movies">
        {
          movies.map(movies => (
              <li className="movie" key={movies.id}>
                <h3>{movies.title}</h3>
                <p>{movies.year}</p>
                <img src={movies.poster} alt={movies.Title} />
              </li>
          ))
        }
        </ul>
    )
}

//este componente se usa en caso de que no tengamos peliculas a mostrar
export function NoMoviesResult(){
    return(
        <p>No se encontraron resultados para esta búsqueda</p>
    )
}

// eslint-disable-next-line react/prop-types
//este componente hace el renderizado condicional, si hay peliculas a mostrar o no
export function Movies ({ movies }){
    const hasMovies = movies?.length > 0

    return (
        hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResult />
    )
}