import IngredientCard from './IngredientCard'

export default function IngredientTray({ ingredients, selectedIds, onToggle }) {
  const categories = [...new Set(ingredients.map((i) => i.category))]

  return (
    <div className="flex flex-col gap-6">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
            {category}
          </h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {ingredients
              .filter((i) => i.category === category)
              .map((ingredient) => (
                <IngredientCard
                  key={ingredient.id}
                  ingredient={ingredient}
                  selected={selectedIds.includes(ingredient.id)}
                  onToggle={onToggle}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
