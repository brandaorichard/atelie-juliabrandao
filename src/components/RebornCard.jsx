// components/RebornCard.jsx
export default function RebornCard({ baby, onClick }) {
  const cover = baby.img || (baby.images && baby.images[0]) || "";
  return (
    <div
      onClick={onClick}
      className="bg-[#f3e3fa] rounded-md shadow-md overflow-hidden flex flex-col border-[1px] border-gray-400 mb-4 w-full md:w-[200px] h-[400px] md:h-[440px] cursor-pointer transition-transform hover:scale-[1.03]"
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes de ${baby.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <div className="relative">
        <img
          src={cover}
          alt={baby.name}
          className="w-full object-cover h-[275px] md:h-[320px]"
        />
        {baby.discount && (
          <span className="absolute top-2 left-2 bg-[#ae95d9] text-white text-xs font-bold px-2 py-1 rounded">
            {baby.discount}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <span className="text-xs md:text-sm font-light text-black mb-1">
          {baby.name}
        </span>
        <div className="flex items-end gap-2 mb-1">
          <span className="text-base md:text-lg font-bold text-[#7a4fcf]">
            {typeof baby.price === "number"
              ? `R$${baby.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
              : baby.price}
          </span>
          {baby.oldPrice && (
            <span className="text-xs text-[#616161] line-through">
              {typeof baby.oldPrice === "number"
                ? `R$${baby.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                : baby.oldPrice}
            </span>
          )}
        </div>
        {baby.installment && (
          <span className="text-xs text-[#ae95d9]">{baby.installment}</span>
        )}
      </div>
    </div>
  );
}