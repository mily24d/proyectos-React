/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useId } from "react";
import { CartIcon, ClearCartIcon, } from "./Icons.jsx";
import './Cart.css'
import { useCart } from "../hooks/useCart.jsx";

//este componente hijo no sabe como el producto se agrega al carrito, ya que eso lo hace el padre
//este hijo solo recibe la funcion
function CartItem({ thumbnail, price, title, quantity, addToCart }){
    return(
        <li>
            <img 
            src={thumbnail}
            alt={title} />
            <div>
                <strong>{title}</strong> - ${price}
            </div>

            <footer>
                <small>
                    Qty: {quantity}
                </small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )

}

export function Cart(){
    const cartCheckboxId = useId() 
    const { cart, clearCart, addToCart } = useCart()

    return (
        <>
            <label className="cart-button" htmlFor="cartCheckboxId">
                <CartIcon/>
            </label>
            <input id="cartCheckboxId" type="checkbox" hidden />

            <aside className="cart">
                <ul>
                    {
                        cart.map(product => (
                            <CartItem 
                            key={product.id} 
                            {...product} 
                            addToCart={() => addToCart(product)}
                            />
                        ))
                    }
                </ul>
                <button onClick={()=> clearCart()}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}