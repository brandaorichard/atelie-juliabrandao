import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import babies from "../mocks/babiesMock";

import ProductCarousel from "./ProductCarousel";
import Breadcrumb from "./Breadcrumb";
import ProductTitlePrice from "./ProductTitlePrice";
import QuantityBuy from "./QuantityBuy";
import PaymentMethods from "./PaymentMethods";
import ProductSection from "./ProductSection";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const baby = babies.find((b) => String(b.id) === String(id));
  const [current, setCurrent] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!baby) {
    return (
      <section className="w-full bg-[#f9e7f6] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#ae95d9] mb-4">Bebê não encontrado 😢</h2>
          <button onClick={() => navigate("/")} className="text-[#7a4fcf] underline">
            Voltar para a página inicial
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f9e7f6] min-h-screen py-8 px-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 -mt-2 md:mt-5">
        <ProductCarousel images={baby.images} current={current} setCurrent={setCurrent} name={baby.name} />
        <div className="flex-1 flex flex-col justify-start mt-2 md:mt-0">
          <Breadcrumb />
          <ProductTitlePrice
            name={baby.name}
            price={baby.price}
            oldPrice={baby.oldPrice}
            discount={baby.discount}
            installment={baby.installment}
          />
          <QuantityBuy product={baby} quantity={quantity} setQuantity={setQuantity} />
          <PaymentMethods />
          <ProductSection title="Prazo de entrega" items={baby.deliveryTime} />
          <ProductSection title="Características" items={baby.features} />
          <ProductSection title="Itens do enxoval" items={baby.enxoval} />
          <ProductSection title="Avisos e cuidados" items={baby.warnings} />
        </div>
      </div>
    </section>
  );
}