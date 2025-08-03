// components/CategoriesMenu.jsx
import { motion } from "framer-motion";

export default function CategoriesMenu({ categories, animated = false, onCategoryClick }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 px-8 md:px-0 mt-8 md:mt-0">
      {categories.map((cat, i) =>
        animated ? (
          <motion.span
            key={cat}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.08 * i }}
            className="text-[#616161] text-lg font-light cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label={`Ir para categoria ${cat}`}
            onClick={() => {
              if (onCategoryClick) onCategoryClick(i);
            }}
            onKeyDown={e => {
              if ((e.key === "Enter" || e.key === " ") && onCategoryClick) onCategoryClick(i);
            }}
          >
            {cat}
          </motion.span>
        ) : (
          <span
            key={cat}
            className="text-gray-900 font-light cursor-pointer whitespace-nowrap"
            tabIndex={0}
            role="button"
            aria-label={`Ir para categoria ${cat}`}
            onClick={() => {
              if (onCategoryClick) onCategoryClick(i);
            }}
            onKeyDown={e => {
              if ((e.key === "Enter" || e.key === " ") && onCategoryClick) onCategoryClick(i);
            }}
          >
            {cat}
          </span>
        )
      )}
    </div>
  );
}