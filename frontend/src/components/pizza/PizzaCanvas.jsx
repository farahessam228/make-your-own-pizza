import { AnimatePresence, motion } from 'framer-motion'
import ToppingIcon from './ToppingIcon'
import { scatterTopping } from './pizzaLayout'

export default function PizzaCanvas({ selectedIngredients }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      {/* Crust */}
      <div
        className="absolute inset-0 rounded-full shadow-[0_18px_40px_-12px_rgba(38,35,33,0.35)]"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, #F5D48A 0%, #E3A94E 55%, #C9862F 100%)',
        }}
      />
      {/* Sauce + cheese base */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '11%',
          background:
            'radial-gradient(circle at 35% 30%, #FBE18F 0%, #F4C45E 45%, #E2A93F 100%)',
          boxShadow: 'inset 0 6px 18px rgba(180, 90, 30, 0.25)',
        }}
      />
      {/* Cheese texture speckles */}
      <div
        className="absolute rounded-full opacity-40"
        style={{
          inset: '11%',
          backgroundImage:
            'radial-gradient(circle, rgba(196,140,40,0.35) 1.5px, transparent 1.5px)',
          backgroundSize: '14px 14px',
        }}
      />

      <AnimatePresence>
        {selectedIngredients.map((ing) =>
          scatterTopping(ing.id, 6).map((piece, i) => (
            <motion.div
              key={`${ing.id}-${i}`}
              className="absolute h-[13%] w-[13%] -translate-x-1/2 -translate-y-1/2 drop-shadow-sm"
              style={{ left: `${piece.x}%`, top: `${piece.y}%`, rotate: piece.rotate }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: piece.scale, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 14,
                delay: i * 0.035,
              }}
            >
              <ToppingIcon id={ing.id} color={ing.color} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  )
}
