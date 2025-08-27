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
import { FaWhatsapp } from "react-icons/fa";

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
  const isIndisponivel = baby.status === "indisponivel";

  // Se for produto indisponível, mostrar mensagem
  if (prontaEntrega && isIndisponivel) {
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
              <h3 className="text-red-600 font-medium mb-2">Produto Indisponível</h3>
              <p className="text-sm text-red-700">
                Este bebê reborn não está mais disponível para compra. 
                Por favor, confira outras opções de pronta entrega disponíveis.
              </p>
              <button 
                onClick={() => navigate("/categoria2")} 
                className="mt-3 px-4 py-2 bg-[#7a4fcf] text-white rounded-md text-sm font-medium"
              >
                Ver outras opções
              </button>
            </div>
            <PaymentMethods />
            <ProductSection title="Características" items={featuresPadrao} />
            <ProductSection title="Itens do enxoval" items={enxovalPadrao} />
            <ProductSection title="Avisos e cuidados" items={avisosPadrao} />
          </div>
        </div>
      </section>
    );
  }

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

      
  // Fluxo especial para "semelhanca"
  if (porSemelhanca) {
    return (
      <section className="w-full bg-[#f9e7f6] min-h-screen py-6 px-2">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          <ProductCarousel images={baby.images} current={current} setCurrent={setCurrent} name={baby.name} />
          <div className="flex-1 flex flex-col justify-start mt-2 md:mt-0">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-2xl font-light text-[#7a4fcf] mb-2">{baby.name}</h1>
            {/* Bloco informativo */}
            <div className="bg-[#f7f3fa] border border-[#e0d6f7] rounded-lg p-4 mb-4 flex flex-col gap-2">
              <span className="text-[#7a4fcf] font-semibold text-base">Pedido via WhatsApp</span>
              <p className="text-sm text-neutral-700">
                Os pedidos de bebê reborn por semelhança são feitos diretamente com a artesã pelo WhatsApp. 
                Tire dúvidas, envie fotos e receba atendimento personalizado!
              </p>
              <p className="text-sm text-[#7a4fcf] font-semibold mt-1">
                Os valores são a partir de <span className="font-bold">R$ 3.499,99</span> em 4x sem juros ou à vista com desconto.
              </p>
              <a
                href="https://wa.me/5567992654151?text=Olá! Gostaria de fazer um pedido de bebê reborn por semelhança."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded bg-[#7a4fcf] text-white font-medium text-sm hover:bg-[#ae95d9] transition"
              >
                <FaWhatsapp className="text-lg" /> 
                Fazer pedido via WhatsApp
              </a>
            </div>
            <PaymentMethods />
            {/* Como funciona */}
            <h2 className="mt-8 mb-2 text-lg font-semibold text-[#7a4fcf]">Como funciona os bebês por semelhança?</h2>
            <div className="bg-[#f7f3fa] border border-[#e0d6f7] rounded-lg p-4 text-sm text-neutral-800 mb-6">
              <p className="mb-2">
                O bebê reborn por semelhança é uma arte personalizada feita a partir de fotos reais do bebê. Veja como funciona o processo:
              </p>
              <ol className="list-decimal ml-4 space-y-2">
                <li>
                  <strong>Envio das fotos</strong>
                  <ul className="list-disc ml-5 text-xs">
                    <li>O cliente envia fotos nítidas do bebê, de preferência recém-nascido até 1 ano.</li>
                    <li>As fotos com expressão mais séria ou relaxada facilitam a escolha do kit.</li>
                  </ul>
                </li>
                <li>
                  <strong>Escolha do kit</strong>
                  <ul className="list-disc ml-5 text-xs">
                    <li>Cada bebê reborn nasce a partir de um kit (molde com expressão e tamanho fixos).</li>
                    <li>Analiso as fotos e busco o kit com o formato de rosto, boquinha e olhar mais próximos.</li>
                    <li>Caso existam opções diferentes, apresento ao cliente para escolher.</li>
                  </ul>
                </li>
                <li>
                  <strong>Montagem inicial</strong>
                  <ul className="list-disc ml-5 text-xs">
                    <li>Envio a comparação entre a foto do bebê e a imagem do kit cru (sem pintura).</li>
                    <li>Esse kit serve como a “base” para receber as características durante a pintura.</li>
                  </ul>
                </li>
                <li>
                  <strong>Confecção personalizada</strong>
                  <ul className="list-disc ml-5 text-xs">
                    <li>Tonalidade de pele semelhante ao bebê real.</li>
                    <li>Pintura de sobrancelhas, boquinha e detalhes como manchinhas.</li>
                    <li>Catálogo de olhos e cabelo para o cliente escolher a cor mais próxima.</li>
                    <li>Cabelo implantado fio a fio e corte semelhante ao estilo do bebê.</li>
                  </ul>
                </li>
                <li>
                  <strong>Tamanho e peso</strong>
                  <ul className="list-disc ml-5 text-xs">
                    <li>O tamanho depende do kit escolhido e pode não corresponder ao do bebê da foto.</li>
                    <li>O peso varia de 1,5 kg a 3 kg, semelhante ao de um recém-nascido, sem ficar pesado demais.</li>
                  </ul>
                </li>
              </ol>
              <p className="mt-4 text-[#7a4fcf] font-medium text-base">
                ✨ O resultado é um bebê reborn exclusivo, feito com carinho, realismo e inspirado nas características mais marcantes do bebê da foto.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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