import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { addToCart } from '../store/cart/cartActions'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  // const renderStars = (rating) => {
  //   return (
  //     <div className="flex gap-1 justify-center mb-2">
  //       {[...Array(5)].map((_, index) => (
  //         <svg
  //           key={index}
  //           className={`w-4 h-4 ${index < rating ? 'text-purple-600' : 'text-gray-300'}`}
  //           fill="currentColor"
  //           viewBox="0 0 20 20"
  //         >
  //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //         </svg>
  //       ))}
  //     </div>
  //   )
  // }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-square bg-gray-100/50 flex items-center justify-center p-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        {/* {renderStars(product.rating)} */}
        <h3 className="text-center font-medium text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-center text-xl font-semibold text-gray-900 mb-4">
          <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
          {product.price.toLocaleString('en-US')}
        </p>
        <button
          onClick={handleAddToCart}
          className="cursor-pointer w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 rounded transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
