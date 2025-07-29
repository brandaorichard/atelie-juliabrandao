// components/CategoriesMenu.jsx
import { motion } from "framer-motion";

export default function CategoriesMenu({ categories, animated = false }) {
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
          >
            {cat}
          </motion.span>
        ) : (
          <span
            key={cat}
            className="text-gray-900 font-light cursor-pointer whitespace-nowrap"
          >
            {cat}
          </span>
        )
      )}
    </div>
  );
}