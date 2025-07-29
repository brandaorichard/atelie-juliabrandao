import imgBaby from "../assets/imgbaby.png";

const babies = [{
    id: 1,
    name: "Bebê Reborn Kit Quinlynn",
    price: 2199.99,
    oldPrice: 2399.99,
    installment: "4x de R$550,00 sem juros",
    img: imgBaby, // imagem principal (card)
    images: [imgBaby, imgBaby, imgBaby], // carousel (produto)
    description: "Uma linda bebê, feita a partir do Kit Quinlynn versão menina ou menino por encomenda.",
    features: [
      "Cabelo implantado fio a fio com mohair, veias e micro veias, vasos sanguíneos, efeito de unhas crescidas, pelos nas têmporas, manchinhas, marca de vacina, teste do pezinho, manchinhas de frio, cílios micro implantados, arranhões de unha, sobrancelhas 3D, lábios umedecidos.",
      "Com todas as características de um bebê real! São molinhos e sua cabeça tomba pra trás e pros lados.",
      "Feito com corpinho de tecido para deixar bem maleável e molinho.",
      "Cerca de 47cm.",
      "Aproximadamente 2kg."
    ],
    enxoval: [
      "2 Trocas de roupas (+ a roupa que irá no bebê de luxo);",
      "As roupinhas que serão enviadas vão ser outras, pois irei fazer outra bebê para você.",
      "Lacinhos de cabelo (se for menina) ou touca (se for menino);",
      "Meinha;",
      "Sapatinho (se for um bebê maior) ou meia estilo sapatinho (para os RN);",
      "Kit de pente e escova;",
      "Mamadeira com leite falso (que vai até o bico sem vazar);",
      "Chupeta magnética luxo com prendedor de chupeta;",
      "Mimos;",
      "Um cueiro ou fralda;",
      "2 fraldas descartáveis;",
      "Documentação Completa do bebê contendo: RG com foto, certidão de nascimento, teste do pezinho, ultrassonografia, carteira de vacinas, certificado de autenticidade, manual de cuidados."
    ],
    deliveryTime: [
      "Cerca de 65 dias de confecção. O PRAZO PODE SER ALTERADO EM DATAS QUE ANTECEDE DIA DAS CRIANÇAS E NATAL."
    ],
    warnings: [
      "São peças delicadas feitas 100% á mão, únicas e exclusivas no mundo.",
      "NÃO SÃO BRINQUEDOS!",
      "Então se caso for criança, NÃO NOS RESPONSABILIZAMOS POR DANOS OU MÁ USO, pois são peças artesanais.",
    ]
  },

  {
    id: 2,
    name: "Bebê Reborn Kit Quinlynn promoção",
    price: 2199.99,
    oldPrice: 2399.99,
    discount: "-8%",
    installment: "4x de R$550,00 sem juros",
    img: imgBaby, // imagem principal (card)
    images: [imgBaby, imgBaby, imgBaby], // carousel (produto)
    description: "Bebê Reborn Kit Quinlynn, super realista, feito à mão.",
    details: "Detalhes completos do bebê...",
    // ...outros campos específicos da página de produto
  },
  {
    id: 3,
    name: "Bebê Reborn Kit Quinlynn promoção",
    price: 2199.99,
    oldPrice: 2399.99,
    discount: "-8%",
    installment: "4x de R$550,00 sem juros",
    img: imgBaby, // imagem principal (card)
    images: [imgBaby, imgBaby, imgBaby], // carousel (produto)
    description: "Bebê Reborn Kit Quinlynn, super realista, feito à mão.",
    details: "Detalhes completos do bebê...",
    // ...outros campos específicos da página de produto
  },
  {
    id: 4,
    name: "Bebê Reborn Kit Quinlynn promoção",
    price: 2199.99,
    oldPrice: 2399.99,
    discount: "-8%",
    installment: "4x de R$550,00 sem juros",
    img: imgBaby, // imagem principal (card)
    images: [imgBaby, imgBaby, imgBaby], // carousel (produto)
    description: "Bebê Reborn Kit Quinlynn, super realista, feito à mão.",
    details: "Detalhes completos do bebê...",
    // ...outros campos específicos da página de produto
  },
  // ...outros bebês
];

export default babies;