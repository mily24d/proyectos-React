import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import {  useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
// import { searchMovies } from './services/movies.js'

//hacemos un custom hook, el cual maneja la busqueda, la actualizacion del valor de la busqueda
//y la validacion de la busqueda cada vez que esta cambie de valor (con un efecto)
//en caso de que la validacion sea incorrecta, retorna un error
function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  
  useEffect(() => {
    if(isFirstInput.current){
      //cuando el valor de search sea diferente de vacio, la comparacion dará falso, 
      //y establecera isFirstInput como falso
      //y no volvera a entrar a este if
      isFirstInput.current = search === ''
      return
    }

    if(search === ''){
      setError('No se puede buscar una película vacía')
      return
    }

    if(search.match(/^\d+$/)){
      setError('La búsqueda debe contener palabras')
      return
    }

    if(search.length < 3){
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  //llamamos nuestro customhook, el cual trae las peliculas (no nos importa como o de donde)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })
  //asi declaramos una hook ref
  // const inputReft = useRef()

  //este debounce es una funcion que se guarda en memoria, que solo se crea una vez, y no cambia
  const debouncedGetMovies = useCallback(  
    debounce(search => {
      getMovies({ search })
    }, 300)
  ,[getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  //notese que la logica de validacion se puede hacer con un efecto
  //pero tambien con el evento onChange y la funcion handleChange
  //ya que hacen lo mismo, cada vez que cambia el valor de la dependencia
  //o del input PERO, debemos recordar que si se hace en la funcion
  //handleClick, asegurarnos de que tomamos el valor correcto
  //considerando que la funcion updateSearch() es asincrona
  //se soluciona usando una variable const newQuery = event.target.value
  

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input 
          style={{ border: '1px solid transparent', borderColor: error? 'red' : 'transparent' }}
          onChange={handleChange} value={search}  placeholder="Up, Hunger Games, Spider Man..." />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading? <p>Cargando...</p> : <Movies movies={movies}/>
        }
        
      </main>
    </div>
  )
}

export default App
