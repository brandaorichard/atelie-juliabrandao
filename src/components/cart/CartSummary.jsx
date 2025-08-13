import React from "react";
import MercadoPagoIcon from "../../assets/icons/mercadopago2.png";

export function CartSummary({ subtotal, freteSelecionado, onCheckout, disabled, checkoutLabel, showMercadoPagoInfo }) {
  return (
    <div className="px-3 md:px-6 py-4 border-t border-[#e5d3e9] bg-[#f9e7f6]">
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex justify-between items-center">
          <span className="font-bold">Subtotal:</span>
          <span>
            R$
            {subtotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Frete:</span>
          <span>
            {freteSelecionado
              ? Number(freteSelecionado.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "--"}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <span className="font-bold">Total:</span>
          <span className="font-bold">
            R$
            {(subtotal + (freteSelecionado ? Number(freteSelecionado.price) : 0)).toLocaleString(
              "pt-BR",
              { minimumFractionDigits: 2 }
            )}
          </span>
        </div>
      </div>
      {/* Informação Mercado Pago só aparece se showMercadoPagoInfo for true */}
      {showMercadoPagoInfo && (
        <div className="flex items-center gap-2 border border-[#ae95d9] bg-[#f9e7f6] rounded px-3 py-2 mb-3">
          <img
            src={MercadoPagoIcon}
            alt="Mercado Pago"
            className="h-8 w-auto"
            style={{ background: "transparent", display: "inline-block", verticalAlign: "middle" }}
          />
          <div>
            <div className="text-sm text-gray-700">
              Vamos te redirecionar para o Mercado Pago
            </div>
            <div className="text-xs text-gray-500">
              Se não tiver conta Mercado Pago, use seu e-mail.
            </div>
          </div>
        </div>
      )}
      <button
        className={`w-full rounded-full py-3 font-medium transition ${
          !disabled
            ? "bg-[#7a4fcf] hover:bg-[#ae95d9] text-white cursor-pointer"
            : "bg-[#ae95d9] text-white opacity-50 cursor-not-allowed"
        }`}
        onClick={onCheckout}
        disabled={disabled}
      >
        {checkoutLabel || "Iniciar Compra"}
      </button>
    </div>
  );
}