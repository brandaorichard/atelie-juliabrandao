export default function QuantityBuy({ quantity, setQuantity }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center border border-[#616161] rounded-full px-3 py-1">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f3e6f3] text-[#616161] text-lg font-bold opacity-60"
          aria-label="Diminuir"
          disabled={quantity === 1}
        >
          –
        </button>
        <span className="mx-3 w-4 text-center text-[#616161] font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity(q => q + 1)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f3e6f3] text-[#616161] text-lg font-bold opacity-60"
          aria-label="Aumentar"
        >
          +
        </button>
      </div>
      <button className="bg-[#7a4fcf] hover:bg-[#ae95d9] cursor-pointer text-white text-lg font-medium rounded-full px-10 py-2 transition">
        Comprar
      </button>
    </div>
  );
}