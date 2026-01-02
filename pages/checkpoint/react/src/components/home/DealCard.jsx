function DealCard({ discount, restaurantName, city, image }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-xl">
      {/* Background Image */}
      <div
        className="h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundColor: '#E5E7EB', // Fallback color for missing images
        }}
      >
        {/* Discount Badge */}
        <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-md font-bold">
          {discount}
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-orange-400 text-sm font-medium">Restaurant</p>
          <h3 className="text-white text-lg font-bold">
            {restaurantName}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default DealCard
