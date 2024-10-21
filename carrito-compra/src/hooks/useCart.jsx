import { useContext } from "react";
import { CartContext } from "../context/cart.jsx";

//creamos un custom hook que utilice nuestro contexto
//en este caso, lo unido que hace es traer el contexto, validarlo y retornarlo tal cual
export const useCart = () => {
    const context = useContext(CartContext)

    if (context === undefined){
        throw new Error ('useCart must be used within a CartProvider')
    }
    return context
}