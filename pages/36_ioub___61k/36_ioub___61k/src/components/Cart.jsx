import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  toggleCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity
} from '../store/cart/cartActions'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, isCartOpen } = useSelector(state => state.cart)

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const handleClose = () => {
    dispatch(toggleCart())
  }

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id))
  }

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id))
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Cart ({totalItems})</h2>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex rounded-full items-center justify-center bg-white border-2 border-gray-800 hover:bg-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-600">Cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex gap-4 items-start">
                    {/* Product Image with Quantity Badge */}
                    <div className="relative w-24 h-24 bg-white rounded flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {item.quantity}
                      </div>
                    </div>

                    {/* Product Info and Controls */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-gray-800 text-lg">{item.name}</h3>
                        <p className="text-gray-900 font-semibold text-lg">
                          <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
                          {(item.price * item.quantity).toLocaleString('en-US')}
                        </p>
                      </div>

                      {/* Quantity Controls - Horizontal */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="w-10 h-10 border-2 border-gray-300 hover:border-purple-700 hover:bg-purple-50 rounded flex items-center justify-center transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <FontAwesomeIcon icon={faMinus} className="text-gray-600" />
                        </button>
                        <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="w-10 h-10 border-2 border-gray-300 hover:border-purple-700 hover:bg-purple-50 rounded flex items-center justify-center transition-colors"
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="cursor-pointer w-8 h-8 rounded-full  hover:border-red-500 hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0 group"
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="w-4 h-4 text-gray-500 group-hover:text-red-500"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-purple-700 text-white p-4 flex items-center justify-between">
          <div>
            <p className="text-sm">Total:</p>
            <p className="text-2xl font-bold">
              <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
              {totalPrice.toLocaleString('en-US')}
            </p>
          </div>
          <button className="bg-white text-purple-700 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
