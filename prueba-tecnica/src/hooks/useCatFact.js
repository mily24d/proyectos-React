import {  useState, useEffect } from "react"
import { getRandomFact } from "../services/facts.js"

export function useCatFact () {
    const [fact, setFact] = useState()
    //podemos usar los estados para detectar cuando una peticion a fallado
    // const [factError, setFactError] = useState()

    //abstraer la funcion que se usa en el efecto
    //con esta funcion evitamos devolver/retornar la actualizacion del estado (setFact())
    //
    const refreshFact = () => {
        //recordemos que esta funcion es asincrona, por eso se llama el .then()
        //tambien se puede hacer getRandomFact().then(setFact) pasando la funcion setFact() como parametro
        getRandomFact()
        .then(newFact => setFact(newFact))
    }

    //efecto que recupera el dato curioso del michi
    //se ejecuta la primera vez luego de que se renderiza el componente
    // y tambien cuando se llama el refreshFact()
    useEffect(refreshFact, [])

    return { fact, refreshFact }
}