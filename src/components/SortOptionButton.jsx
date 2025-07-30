import { FaCheck } from "react-icons/fa";

export default function SortOptionButton({ label, selected, onClick, isLast }) {
  return (
    <button
      onClick={onClick}
      className={`text-left py-2 px-0 text-[#616161] font-light text-base flex items-center justify-between
        ${selected ? "font-semibold text-[#ae95d9]" : ""}
        ${isLast ? "mt-2" : ""}
        cursor-pointer
      `}
      style={selected ? { fontWeight: 600 } : {}}
    >
      <span>{label}</span>
      {selected && <FaCheck className="text-[#ae95d9] ml-2" />}
    </button>
  );
}