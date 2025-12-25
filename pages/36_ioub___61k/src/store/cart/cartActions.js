export const ADD_TO_CART = 'cart/add'
export const REMOVE_FROM_CART = 'cart/remove'
export const INCREMENT_QUANTITY = 'cart/incrementQuantity'
export const DECREMENT_QUANTITY = 'cart/decrementQuantity'
export const TOGGLE_CART = 'cart/toggle'

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
})

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
})

export const incrementQuantity = (productId) => ({
  type: INCREMENT_QUANTITY,
  payload: productId
})

export const decrementQuantity = (productId) => ({
  type: DECREMENT_QUANTITY,
  payload: productId
})

export const toggleCart = () => ({
  type: TOGGLE_CART
})
