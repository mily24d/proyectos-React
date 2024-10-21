//aqui estamos abstrayendo el codigo de modo que las peticiones/servicios pueden ser reutilizables y faciles
//de depurar
//IMPORTANTE: debemos recordar que el codigo de JS no se debe mezclar con el de react
//por eso, es que no recibimos la funcion para actualizar los estados (setFact())
//sino que simplemente retornamos la respuesta de la API
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact' 

export const getRandomFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    const data = await res.json()
    const { fact } = data
    return fact
        // .catch((err) => {
        //     // aqui se manejan los errores si la respuesta falla
        //     // y tambien si la peticion falla
        //     console.log(err)
        // })

}
