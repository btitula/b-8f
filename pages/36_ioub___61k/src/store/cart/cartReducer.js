import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  TOGGLE_CART
} from './cartActions'

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      return JSON.parse(savedCart)
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
  }
  return []
}

// Save cart to localStorage
const saveCartToLocalStorage = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

const initialState = {
  items: loadCartFromLocalStorage(),
  isCartOpen: false
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      let newItems

      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      saveCartToLocalStorage(newItems)
      return {
        ...state,
        items: newItems
      }
    }

    case REMOVE_FROM_CART: {
      const newItems = state.items.filter(item => item.id !== action.payload)
      saveCartToLocalStorage(newItems)
      return {
        ...state,
        items: newItems
      }
    }

    case INCREMENT_QUANTITY: {
      const newItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      saveCartToLocalStorage(newItems)
      return {
        ...state,
        items: newItems
      }
    }

    case DECREMENT_QUANTITY: {
      const newItems = state.items.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      saveCartToLocalStorage(newItems)
      return {
        ...state,
        items: newItems
      }
    }

    case TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      }

    default:
      return state
  }
}

export default cartReducer
