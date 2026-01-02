function CategoryTabs({ selectedCategory, onCategoryChange }) {
  const categories = [
    { id: 'vegan', label: 'Vegan' },
    { id: 'sushi', label: 'Sushi' },
    { id: 'pizza', label: 'Pizza & Fast food' },
    { id: 'others', label: 'Others' },
  ]

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === category.id
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-500'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
