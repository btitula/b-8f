import { useState } from 'react'
import { dealsData } from '@/data/dealsData'
import CategoryTabs from './CategoryTabs'
import DealCard from './DealCard'

function ExclusiveDeals() {
  const [selectedCategory, setSelectedCategory] = useState('pizza')

  const filteredDeals = dealsData.filter(
    (deal) => deal.category === selectedCategory
  )

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">
        Up to -40% 🎉 Order.uk exclusive deals
      </h2>

      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredDeals.map((deal) => (
          <DealCard key={deal.id} {...deal} />
        ))}
      </div>
    </section>
  )
}

export default ExclusiveDeals
