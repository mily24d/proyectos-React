import './Filters.css'
import { useFilters } from '../hooks/useFilters.jsx'

export function Filters (){
    const { filters, setFilters } = useFilters()
    
    //DOS FUENTES DE LA VERDAD
    //esto sucede cuando declaramos un estado global en nuestro contexto
    //pero en nuestro componente tenemos un estado local
    //esto causa que la UI no sea fiables, asi que debemos depender siempre del estado global
    //y eliminar el local
    // const [minPrice, setMinPrice] = useState(0)

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Precio</label>
                <input 
                type="range"
                id="price"
                min="0"
                max="1000"
                value={filters.minPrice}
                onChange={handleChangeMinPrice} />
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor="category">Categoría</label>
                <select id="category" onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="beauty">Belleza</option>
                    <option value="groceries">Abarrotes</option>
                </select>
            </div>
        </section>
    )
}