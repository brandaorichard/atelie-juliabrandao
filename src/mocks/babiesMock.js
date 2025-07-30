import imgBaby from "../assets/imgbaby.png";
import imgBaby1 from "../assets/babies/babyquin1.jpeg";
import imgBaby2 from "../assets/babies/babyquin2.jpeg";
import imgBaby3 from "../assets/babies/babyquin3.jpeg";
import imgBaby4 from "../assets/babies/babyquin4.jpeg";

import babyRaven1 from "../assets/babies/babyraven1.jpeg";
import babyRaven2 from "../assets/babies/babyraven2.jpeg";
import babyRaven3 from "../assets/babies/babyraven3.jpeg";
import babyRaven4 from "../assets/babies/babyraven4.jpeg";

import babySandie1 from "../assets/babies/babysandie1.jpeg";
import babySandie2 from "../assets/babies/babysandie2.jpeg";
import babySandie3 from "../assets/babies/babysandie3.jpeg";
import babySandie4 from "../assets/babies/babysandie4.jpeg";
import babySandie5 from "../assets/babies/babysandie5.jpeg";
import babySandie6 from "../assets/babies/babysandie6.jpeg";

const babies = [{
    id: 1,
    name: "Bebê Reborn Kit Quinlynn",
    price: 2199.99,
    discount: "-8%",
    oldPrice: 2399.99,
    installment: "4x de R$550,00 sem juros",
    img: imgBaby1, // imagem principal (card)
    images: [imgBaby1, imgBaby2, imgBaby3, imgBaby4], // carousel (produto)
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

  // 2
  {
    id: 2,
    name: "Bebê Reborn Kit Raven",
    price: 2499.99,
    installment: "4x de R$620,00 sem juros",
    img: babyRaven1, // imagem principal (card)
    images: [babyRaven2, babyRaven3, babyRaven4], // carousel (produto)
    description: "Uma linda bebê, feita a partir do Kit Quinlynn versão menina ou menino por encomenda.",
    features: [
      "Voce pode escolher a cor do cabelo, o tipo de cabelo, cor dos olhos. Para tonalidade de pele, o preço é alterado.",
      "Cabelo implantado fio a fio com mohair ou fibra, veias e micro veias,vasos sanguíneos, efeito de unhas crescidas ,pelos nas têmporas,manchinhas,marca de vacina,teste do pezinho, manchinhas de frio,cílios micro implantados, arranhões de unha, sobrancelhas 3D, lábios umedecidos, olhos de acrílico importado. ",
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

  // 3
  {
    id: 3,
    name: "Bebê Reborn Kit Sandie (Toddler)",
    price: 3399.99,
    installment: "4x de R$850,00 sem juros",
    img: babySandie1, // imagem principal (card)
    images: [babySandie2, babySandie3, babySandie4, babySandie5, babySandie6], // carousel (produto)
    description: "Um lindo bebê, feito a partir do Kit Sandie Feita por encomenda",
    features: [
      "Voce pode escolher a cor do cabelo, o tipo de cabelo, cor dos olhos. Para tonalidade de pele, o preço é alterado.",
      "Cabelo implantado fio a fio com mohair ou fibra, veias e micro veias,vasos sanguíneos, efeito de unhas crescidas ,pelos nas têmporas,manchinhas,marca de vacina,teste do pezinho, manchinhas de frio,cílios micro implantados, arranhões de unha, sobrancelhas 3D, lábios umedecidos, olhos de acrílico importado. ",
      "Com todas as características de um bebê real! São molinhos e sua cabeça tomba pra trás e pros lados.",

      "Sobre o cabelo: ",
      "Nas fotos ilustrativas temos 2 tipos de cabelo, na ruiva é a fibra beautex sintética de alta qualidade, não embola com o tempo, imita cabelo humano adulto, usada para ter cabelos longos e lisos e super fácil de cuidar. ",
      "Já nas fotos de cabelo curto, foi utilizado o mohair premium, é um fio natural derivado da cabra, um cabelo extremamente macio e fino, imita muito um cabelo de bebê e é mais realista, por ser natural, porém ele tem um cuidado maior para mantê-lo. ",
      "Todos os bebês São molinhos e sua cabeça tomba pra trás e pros lados.",
      "Feito com corpinho de tecido para deixar bem maleavel e molinho.",
      "Cerca de 65 a 68cm.",
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

  // 4
  {
    id: 4,
    name: "Bebê Reborn Kit Quinlynn promoção",
    price: 2199.99,
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