import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { toggleCart } from '../store/cart/cartActions'

const Header = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  return (
    <header className="bg-purple-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Redux Shopping Cart</h1>

        <button
          onClick={handleCartClick}
          className="relative p-2 hover:bg-purple-800 rounded transition-colors"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="w-8 h-8" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-purple-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
