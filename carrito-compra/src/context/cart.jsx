/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
//de ese modo ya no necesitamos usar el estado useState()
import { createContext, useReducer } from "react";
import { cartInitialState, cartReducer } from "../reducers/cart";

export const CartContext = createContext()

//finalmente, abstraemos en un customHook
function useCartReducer (){
    //usar el useReducer con la funcion reductora
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)
    //despachar acciones
    const addToCart = product => dispatch({ type: 'ADD_TO_CART', payload: product })

    const removeFromCart = product => dispatch({ type: 'REMOVE_FROM_CART', payload: product })

    const clearCart = () => dispatch({ type: 'CLEAR_CART' })  

    return { state, addToCart, removeFromCart, clearCart}
}

export function CartProvider({ children }){
    const { state, addToCart, removeFromCart, clearCart} = useCartReducer()
    
    return(
        <CartContext.Provider
        value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart
        }}
        >
            {children}
        </CartContext.Provider>
    )

}

/* LOGICA USADA SIN EL useReducer()

    // const [cart, setCart] = useState([])


    const addToCart = product => {
        //comprobar si el producto ya está en el carrito, si está, entonces solamente 
        //incrementamos la cantidad de productos
        //obtenemos el indice del producto para modificarlo(si ya existe)
        const productInCartIndex = cart.findIndex(item => item.id === product.id)   
        if(productInCartIndex >= 0){
            //para actualizar el arreglo del carrito
            //hacemos una copia con structuredClone
            //y actualizamos el valor que necesitamos usando el indice que obtuvimos antes
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }

        //el producto no está en el carrito
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    }

    const removeFromCart = product => {
        //aqui filtramos todos los items que sean diferentes del id que hemos pasado
        //de ese modo, discriminando ese elemento lo eliminamos del carrito
        setCart(prevState => prevState.filter(item => item.id != product.id))
    }

    const clearCart = () => {
        setCart([])
    }


*/