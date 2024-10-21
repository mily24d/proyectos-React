import {  useState, useEffect } from "react"

export function useCatImage({fact}){
    const [imgUrl, setImgUrl] = useState('https://cataas.com/cat/says/hola?fontSize=50&fontColor=white')

    //otro efecto que recupera la img
    useEffect(() => {
        if(!fact) return

        const threeFirstWords = fact.split(' ', 3).join(' ')
                
        //hacemos el segundo fetch que depende del primero
        // IMPORTANTE: este es el codigo del ejemplo, PERO la api ha cambiado y ahora
        // el endpoint que devuelve el json, ya no contienen al url
        // por lo que no se necesita acceder a ese endpoint para obtener la url,
        // si no simplemente cambiar el estado
        const url = `https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=white`
        setImgUrl(url)
        // fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=white&json=true`
        // )
        //     .then(res => res.json())
        //     .then(response => {
        //         const {url} = response
        //         setImgUrl(url)

        //     })
    }, [fact])

    return { imgUrl }
} // devuelve { imgUrl: 'http://...' }