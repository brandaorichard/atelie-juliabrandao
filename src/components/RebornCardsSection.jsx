import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import imgBaby from "../assets/imgbaby.png";

const babies = [
  {
    id: 1,
    name: "Bebê Reborn Kit Quinlynn promoção",
    price: 2199.99,
    oldPrice: 2399.99,
    discount: "-8%",
    installment: "4x de R$550,00 sem juros",
    img: imgBaby,
  },
  {
    id: 2,
    name: "Bebê Reborn Kit Raven",
    price: 2499.99,
    oldPrice: null,
    discount: null,
    installment: "4x de R$625,00 sem juros",
    img: imgBaby,
  },
  {
    id: 3,
    name: "Bebê Reborn Kit Darren Versão...",
    price: 2399.99,
    oldPrice: null,
    discount: null,
    installment: "4x de R$600,00 sem juros",
    img: imgBaby,
  },
  {
    id: 4,
    name: "Bebê Reborn Kit Cai Oriental",
    price: 2499.99,
    oldPrice: null,
    discount: null,
    installment: "4x de R$625,00 sem juros",
    img: imgBaby,
  },
  {
    id: 5,
    name: "Bebê Reborn Kit Cai Oriental",
    price: 2499.99,
    oldPrice: null,
    discount: null,
    installment: "4x de R$625,00 sem juros",
    img: imgBaby,
  },
  {
    id: 6,
    name: "Bebê Reborn Kit Cai Oriental",
    price: 2499.99,
    oldPrice: null,
    discount: null,
    installment: "4x de R$625,00 sem juros",
    img: imgBaby,
  },
  {
    id: 7,
    name: "Bebê Reborn Kit Cai Oriental",
    price: 2499.99,
    oldPrice: null,
    discount: null,
    installment: "4x de R$625,00 sem juros",
    img: imgBaby,
  },
];

export default function RebornCardsSection() {
  return (
    <section className="w-full bg-[#f9e7f6] py-6 px-2 mt-2">
      <div className="max-w-6xl mx-auto">
        {/* Título alinhado à esquerda */}
        <h2 className="text-2xl font-extralight text-[#616161] mb-2 text-left">
          Bebês Reborn por Encomenda
        </h2>
        {/* Linha de ações: Filtrar e Ordenar, abaixo do título */}
        <div className="flex items-center gap-6 mb-4 px-1 text-left">
          <button className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none">
            <FaFilter className="text-base" />
            Filtrar
          </button>
          <button className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none">
            <FaSortAmountDown className="text-base" />
            Ordenar
          </button>
        </div>
        {/* Cards: grid sempre, alinhados à esquerda, com gap mínimo */}
        <div className="grid grid-cols-2 md:flex-wrap gap-x-4 gap-y-0 md:flex md:gap-6">
          {babies.map((baby) => (
            <div
              key={baby.id}
              className="
                bg-[#f3e3fa] rounded-md shadow-md overflow-hidden flex flex-col border-[1px] border-gray-400
                mb-4
                w-full
                md:w-[200px]
                h-[400px] md:h-[440px]
              "
            >
              <div className="relative">
                <img
                  src={baby.img}
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
                <span className="text-xs md:text-sm font-semibold text-[#616161] mb-1">{baby.name}</span>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-base md:text-lg font-bold text-[#7a4fcf]">
                    R${baby.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  {baby.oldPrice && (
                    <span className="text-xs text-[#616161] line-through">
                      R${baby.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#ae95d9]">{baby.installment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}