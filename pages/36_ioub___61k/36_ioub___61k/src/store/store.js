import { legacy_createStore as createStore, combineReducers } from 'redux'
import counterReducer from './counter/counterReducer'
import cartReducer from './cart/cartReducer'

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartReducer
})

export const store = createStore(rootReducer)
