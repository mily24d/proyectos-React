import './Footer.css'
import { useFilters } from "../hooks/useFilters"


export function Footer (){
    const { filters } = useFilters()

    return(
        <footer className='footer'>
            {
                JSON.stringify(filters, null, 2)
            }
            <h4>Proyecto de Práctica React ⚛️ &nbsp;&nbsp;-<span>&nbsp;@dimLeyd</span></h4>
            <h5>Tienda + Carrito de compras: useContext & useReducer</h5>
        </footer>
    )
}