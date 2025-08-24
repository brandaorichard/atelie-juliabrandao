import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProductCarousel from "./ProductCarousel";
import Breadcrumb from "./Breadcrumb";
import ProductTitlePrice from "./ProductTitlePrice";
import QuantityBuy from "./QuantityBuy";
import PaymentMethods from "./PaymentMethods";
import ProductSection from "./ProductSection";
import FreteCalculator from "./FreteCalculator";

import {
  featuresPadrao,
  enxovalPadrao,
  prazoPadrao,
  avisosPadrao
} from "../mocks/babyTexts";

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [baby, setBaby] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [current, setCurrent] = useState(0);
  const [freteSelecionado, setFreteSelecionado] = useState(null);

  useEffect(() => {
    async function fetchBaby() {
      try {
        const res = await fetch(`https://atelie-juliabrandao-backend-production.up.railway.app/api/babies/slug/${slug}`);
        if (!res.ok) throw new Error("Bebê não encontrado");
        const data = await res.json();
        setBaby(data);
      } catch (error) {
        setBaby(null);
        console.error("Erro ao buscar o bebê:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBaby();
  }, [slug]);

  if (loading) {
    return (
      <section className="w-full bg-[#f9e7f6] min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </section>
    );
  }

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

  const prontaEntrega = baby.category === "pronta_entrega";
  const porSemelhanca = baby.category === "semelhanca";

  const breadcrumbItems = prontaEntrega
    ? [
        { label: "Início", to: "/" },
        { label: "Bebes Reborn a Pronta Entrega", to: "/categoria2" },
        { label: baby.name }
      ]
    : porSemelhanca
    ? [
        { label: "Início", to: "/" },
        { label: "Bebes Reborn por Semelhança", to: "/categoria3" },
        
      ]
    : [
        { label: "Início", to: "/" },
        { label: "Bebês Reborn Por Encomenda", to: "/categoria1" },
        { label: baby.name }
      ];

  return (
    <section className="w-full bg-[#f9e7f6] min-h-screen py-6 px-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <ProductCarousel images={baby.images} current={current} setCurrent={setCurrent} name={baby.name} />
        <div className="flex-1 flex flex-col justify-start mt-2 md:mt-0">
          <Breadcrumb items={breadcrumbItems} />
          <ProductTitlePrice
            name={baby.name}
            price={baby.price}
            oldPrice={baby.oldPrice}
            discount={baby.discount}
            installment={baby.installment}
          />
          <QuantityBuy product={baby} quantity={quantity} setQuantity={setQuantity} />
          <FreteCalculator
            items={[{ slug: baby.slug, quantity }]}
            onFreteSelecionado={setFreteSelecionado}
            hideProductionNote={prontaEntrega}
          />
          <PaymentMethods />
          {!prontaEntrega && (
            <ProductSection title="Prazo de entrega" items={prazoPadrao} />
          )}
          <ProductSection title="Características" items={featuresPadrao} />
          <ProductSection title="Itens do enxoval" items={enxovalPadrao} />
          <ProductSection title="Avisos e cuidados" items={avisosPadrao} />
        </div>
      </div>
    </section>
  );
}