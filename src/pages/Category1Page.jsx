import { useNavigate } from "react-router-dom";
import babies from "../mocks/babiesMock";
import CategoryCardsSection from "../components/CategoryCardsSection";
import { motion } from "framer-motion";

function Category1Page() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <CategoryCardsSection
        title="Por Encomenda"
        babies={babies}
        onCardClick={baby => navigate(`/produto/${baby.slug}`)}
        showFilter
        showSort
      />
    </motion.div>
  );
}

export default Category1Page;