import "./App.css"
import { useCatImage } from "./hooks/useCatImage.js"
import { useCatFact } from "./hooks/useCatFact.js"

export function App (){
    const {fact, refreshFact} = useCatFact()
    const {imgUrl} = useCatImage({ fact })
    
    const handleClick = async () => {
        refreshFact()
    }

    return(
        <main>
            <button onClick={handleClick}>Obtener nuevo fact</button>
            <h1>App de michis {'<3'}</h1>
            <section>
                {/*renderizado condicional*/}
                {fact && <p>{fact}</p>}
                {imgUrl && <img src={imgUrl} 
                alt={`Imagen creada a partir de las tres primeras palabras de ${fact}`} />}
            </section>
        </main>
    )
}