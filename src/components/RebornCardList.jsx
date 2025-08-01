// components/RebornCardList.jsx
import RebornCard from "./RebornCard";

export default function RebornCardList({ babies, onCardClick }) {
  return (
    <div className="grid grid-cols-2 md:flex-wrap gap-x-4 gap-y-0 md:flex md:gap-6">
      {babies.map((baby) => (
        <RebornCard key={baby.id} baby={baby} onClick={() => onCardClick(baby)} />
      ))}
    </div>
  );
}