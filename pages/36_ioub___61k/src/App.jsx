import Header from './components/Header'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import { products } from './data/products'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Cart />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
