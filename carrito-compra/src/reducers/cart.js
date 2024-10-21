//REDUCER
export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

//funcion para actualizar localStorage
const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

//crear la funcion reductora
export const cartReducer = (state, action) => {
    //recordemos que la action es un objeto que trae el tipo de la accion
    //pero tambien trae los datos con que se actualizará el nuevo estado
    //en este caso, el product
    const { type: actionType, payload: actionPayload } = action

    switch(actionType){
        case 'ADD_TO_CART': {
            //sacamos el id del actionPayload (osea el producto)
            const { id } = actionPayload
            //state es el estado actual/previo a la actualizacion(que no se hace en este funcion, si no
            //cuando es llamada desde fuera)
            //esta funcion solo retorna el nuevo estado, sin actualizarlo
            const productInCartIndex = state.findIndex(item => item.id === id)   
            if(productInCartIndex >= 0){
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                updateLocalStorage(newState)
                return newState
            }
            //si aun no habia sido añadido al carrito
            const newState = [                
                ...state,
                {
                    ...actionPayload, //product
                    quantity: 1
                }
            ]
            
            updateLocalStorage(newState)
            return newState 
        }
        case 'REMOVE_FROM_CART': {
            const { id } = actionPayload
            const newState = state.filter(item => item.id != id)
            updateLocalStorage(newState)
            return newState
        }
        case 'CLEAR_CART': {
            updateLocalStorage([])
            return []
        } 
    }

    return state
}