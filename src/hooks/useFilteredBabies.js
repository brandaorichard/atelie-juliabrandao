// hooks/useFilteredBabies.js
import { useMemo } from "react";

export default function useFilteredBabies(babies, selectedSort, minValue, maxValue, parseBRL) {
  return useMemo(() => {
    let arr = [...babies];
    const min = parseBRL(minValue);
    const max = parseBRL(maxValue);
    if (!isNaN(min) && min !== null) arr = arr.filter(b => b.price >= min);
    if (!isNaN(max) && max !== null) arr = arr.filter(b => b.price <= max);
    switch (selectedSort) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "az":
        arr.sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }));
        break;
      case "za":
        arr.sort((a, b) => b.name.localeCompare(a.name, "pt-BR", { sensitivity: "base" }));
        break;
      default:
        break;
    }
    return arr;
  }, [babies, selectedSort, minValue, maxValue, parseBRL]);
}