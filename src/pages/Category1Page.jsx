import { useNavigate } from "react-router-dom";
import babies from "../mocks/babiesMock";
import CategoryCardsSection from "../components/CategoryCardsSection";

function Category1Page() {
  const navigate = useNavigate();

  return (
    <CategoryCardsSection
      title="Por Encomenda"
      babies={babies}
      onCardClick={baby => navigate(`/produto/${baby.id}`)}
      showFilter
      showSort
    />
  );
}

export default Category1Page;