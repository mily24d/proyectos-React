import {  useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

//custom hook para recuperar las peliculas con un fetch de datos
export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  //esto se haria si la funcion fuera costosa
  const getMovies = useCallback(
    //pasando search como parametro, podemos seguir usando la funcion sin depender de él
    //de modo que cuando cambie search, no volverá a crear la funcion en el renderizado
    //sino que solamente se creara la primera vez con las dependencias vacias []
    async ({ search }) => {
      if(search === previousSearch.current) return
      try{
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      }catch(e){
        setError(e.message)
      }finally{
        setLoading(false)
      }
    }
    //dependencias
    , [])

    //recordemos que este sort(que esta en el cuerpo de la funcion)
    // se esta ejecutando cada vez que el componente se rederiza
    //y este hook se llama cada vez que search cambia
    //por lo tanto, controlamos el rendimiento con un useMemo,
    //el cual guarda una copia en memoria del objeto y solamente cambia su valor cuando la dependencia cambia
    const sortedMovies = useMemo(() => {
      //no entrara a este console log, a menos que cambie el estado sort, o las movies
      //console.log('memoSortedMovies')
      return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
    }, [sort, movies])
  
    return { movies: sortedMovies, getMovies, loading, error }
  }