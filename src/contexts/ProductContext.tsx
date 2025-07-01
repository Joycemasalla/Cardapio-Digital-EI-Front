import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FunctionComponent } from 'react';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type ProductContextType = {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (product: Product) => Promise<Product>;
  deleteProduct: (productId: string) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Lista de produtos iniciais
const initialProducts: Product[] = [
  // --- CHURRASCO ---
  {
    id: uuidv4(),
    name: 'Picanha (100g)',
    description: 'Corte nobre de carne, ideal para churrasco, acompanhada de farofa.',
    price: 16.00,
    image: 'https://images.pexels.com/photos/17666286/pexels-photo-17666286/free-photo-of-bife-churrasco-carne-vermelha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Churrasco'
  },
  {
    id: uuidv4(),
    name: 'Alcatra (100g)',
    description: 'Carne macia e saborosa, perfeita para o seu churrasco, acompanhada de farofa.',
    price: 12.00,
    image: 'https://images.pexels.com/photos/8118029/pexels-photo-8118029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Churrasco'
  },
  {
    id: uuidv4(),
    name: 'Contra Filé (100g)',
    description: 'Corte clássico, suculento e cheio de sabor, acompanhado de farofa.',
    price: 12.00,
    image: 'https://images.pexels.com/photos/18469333/pexels-photo-18469333/free-photo-of-churrasco-carne-vermelha-comida-parrilla.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Churrasco'
  },
  {
    id: uuidv4(),
    name: 'Pernil de Porco (100g)',
    description: 'Delicioso pernil de porco, macio e bem temperado, acompanhado de farofa.',
    price: 7.00,
    image: 'https://images.pexels.com/photos/6210870/pexels-photo-6210870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Churrasco'
  },
  {
    id: uuidv4(),
    name: 'Meio da Asa (UND)',
    description: 'Meio da asa de frango individual, crocante e saborosa, acompanhada de farofa.',
    price: 3.00,
    image: 'https://images.pexels.com/photos/7178051/pexels-photo-7178051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Churrasco'
  },
  {
    id: uuidv4(),
    name: 'Linguiça (100g)',
    description: 'Linguiça suculenta, perfeita para acompanhar, acompanhada de farofa.',
    price: 5.00,
    image: 'https://images.pexels.com/photos/6210874/pexels-photo-6210874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Churrasco'
  },
  {
    id: uuidv4(),
    name: 'Pão de Alho',
    description: 'Pão de alho caseiro, crocante por fora e macio por dentro, acompanhado de farofa.',
    price: 5.00,
    image: 'https://images.pexels.com/photos/1628174/pexels-photo-1628174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Churrasco'
  },

  // --- HAMBÚRGUERES TRADICIONAIS ---
  {
    id: uuidv4(),
    name: 'Hambúrguer',
    description: 'Pão brioche, bife caseiro. Acompanha alface, milho, tomate e batata.',
    price: 10.00,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'X Calabresa',
    description: 'Pão brioche, bife caseiro, calabresa, queijo. Acompanha alface, milho, tomate e batata.',
    price: 14.00,
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'X Bacon',
    description: 'Pão brioche, bife caseiro, queijo, bacon. Acompanha alface, milho, tomate e batata.',
    price: 14.00,
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'X Egg',
    description: 'Pão brioche, bife caseiro, ovo, queijo. Acompanha alface, milho, tomate e batata.',
    price: 14.00,
    image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'X Burguesunto',
    description: 'Pão brioche, bife caseiro, presunto, queijo. Acompanha alface, milho, tomate e batata.',
    price: 14.00,
    image: 'https://images.pexels.com/photos/327111/pexels-photo-327111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'FranBacon',
    description: 'Pão brioche, bife de frango caseiro, bacon, queijo e catupiry. Acompanha alface, milho, tomate e batata.',
    price: 15.00,
    image: 'https://images.pexels.com/photos/2092502/pexels-photo-2092502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'Americano',
    description: 'Pão brioche, bife caseiro, ovo, queijo, bacon. Acompanha alface, milho, tomate e batata.',
    price: 15.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'Bacon Burguer',
    description: 'Pão brioche, bife caseiro, bacon. Acompanha alface, milho, tomate e batata.',
    price: 12.00,
    image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'Misto',
    description: 'Pão de forma, presunto e muçarela.',
    price: 8.00,
    image: 'https://images.pexels.com/photos/236813/pexels-photo-236813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'X Tudo',
    description: 'Pão brioche, bife caseiro, ovo, presunto, queijo, bacon. Acompanha alface, milho, tomate e batata.',
    price: 18.00,
    image: 'https://images.pexels.com/photos/4553259/pexels-photo-4553259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: uuidv4(),
    name: 'X Burguer',
    description: 'Pão brioche, bife caseiro, queijo. Acompanha alface, milho, tomate e batata.',
    price: 11.00,
    image: 'https://images.pexels.com/photos/2030276/pexels-photo-2030276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },

  // --- HAMBÚRGUERES ARTESANAIS ---
  {
    id: uuidv4(),
    name: 'Cheddar MC Melt',
    description: 'Pão brioche, bife artesanal de boi (120g), cheddar, cebola caramelizada.',
    price: 14.00,
    image: 'https://images.pexels.com/photos/7363673/pexels-photo-7363673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Artesanais'
  },
  {
    id: uuidv4(),
    name: 'Chicken Burguer',
    description: 'Pão brioche, bife artesanal de frango (120g), queijo prato, alface, tomate e molho especial.',
    price: 15.00,
    image: 'https://images.pexels.com/photos/10103756/pexels-photo-10103756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Artesanais'
  },
  {
    id: uuidv4(),
    name: 'Rei Bacon',
    description: 'Pão brioche, bife artesanal de boi (120g), cheddar, bacon, muçarela, cebola caramelizada e barbecue.',
    price: 16.00,
    image: 'https://images.pexels.com/photos/7452669/pexels-photo-7452669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Artesanais'
  },
  {
    id: uuidv4(),
    name: 'Cheddar Melt Duplo',
    description: 'Pão brioche, 2 bifes artesanais boi (120g), 2 fatias cheddar e cebola caramelizada.',
    price: 17.00,
    image: 'https://images.pexels.com/photos/18970725/pexels-photo-18970725/free-photo-of-vista-superior-de-um-hamburguer-com-queijo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Artesanais'
  },
  {
    id: uuidv4(),
    name: 'Costela Burguer',
    description: 'Pão brioche, costela desfiada, bife artesanal de boi (120g), muçarela, alface, anel de cebola, barbecue.',
    price: 18.00,
    image: 'https://images.pexels.com/photos/7363673/pexels-photo-7363673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Artesanais'
  },
  {
    id: uuidv4(),
    name: 'Super Rei Bacon',
    description: 'Pão brioche, 2 bife artesanal de boi (120g), 2 fatias de cheddar, bacon, tomate, cebola caramelizada e molho especial.',
    price: 20.00,
    image: 'https://images.pexels.com/photos/18501193/pexels-photo-18501193/free-photo-of-pao-de-hamburguer-hamburguer-queijo-tomate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Artesanais'
  },
  {
    id: uuidv4(),
    name: 'Chicken Especial',
    description: 'Pão brioche, bife frango empanado, cheddar, alface, tomate, anel de cebola e barbecue.',
    price: 20.00,
    image: 'https://images.pexels.com/photos/10103756/pexels-photo-10103756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Artesanais'
  },
  {
    id: uuidv4(),
    name: 'Pig Melt',
    description: 'Pão de brioche, bife artesanal de lombo (150g), catupiry empanado, cheddar, tomate, alface, cebola caramelizada e barbecue.',
    price: 20.00,
    image: 'https://images.pexels.com/photos/7363673/pexels-photo-7363673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Artesanais'
  },

  // --- PORÇÕES ---
  {
    id: uuidv4(),
    name: 'Batata',
    description: 'Porção generosa de batatas fritas crocantes.',
    price: 20.00,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Batata c/ Queijo',
    description: 'Batatas fritas cobertas com delicioso queijo derretido.',
    price: 25.00,
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Batata c/ Queijo e Bacon',
    description: 'Batatas fritas com queijo derretido e crocante bacon.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/4049753/pexels-photo-4049753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Batata c/ Queijo e Calabresa',
    description: 'Batatas fritas com queijo e calabresa fatiada.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/4049753/pexels-photo-4049753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Batata c/ Cheddar, Bacon e Calabresa',
    description: 'Batatas fritas com cheddar cremoso, bacon e calabresa.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/4049753/pexels-photo-4049753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Mandioca Frita',
    description: 'Porção de mandioca frita, crocante por fora e macia por dentro.',
    price: 18.00,
    image: 'https://images.pexels.com/photos/5920773/pexels-photo-5920773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Escondidinho de Carne Seca',
    description: 'Delicioso escondidinho cremoso com carne seca desfiada.',
    price: 55.00,
    image: 'https://images.pexels.com/photos/674577/pexels-photo-674577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Escondidinho de Camarão',
    description: 'Escondidinho cremoso e saboroso com camarão.',
    price: 60.00,
    image: 'https://images.pexels.com/photos/674577/pexels-photo-674577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Isca de Frango',
    description: 'Suculentas iscas de peito de frango empanadas e fritas.',
    price: 25.00,
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Frango a passarinho',
    description: 'Frango frito a passarinho, temperado e crocante.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/13524580/pexels-photo-13524580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Bucho à Milanesa',
    description: 'Bucho preparado à milanesa, crocante e saboroso.',
    price: 20.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Salaminho',
    description: 'Porção de salaminho fatiado.',
    price: 20.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Porção de Salgadinho',
    description: 'Variedade de salgadinhos fritos.',
    price: 20.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Jiló Frito Especial',
    description: 'Jiló frito crocante e temperado.',
    price: 25.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Trio Mineiro',
    description: 'Delicioso trio com o melhor da culinária mineira.',
    price: 50.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Calabresa Acebolada',
    description: 'Calabresa fatiada e refogada com cebola.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Linguiça com Mandioca',
    description: 'Linguiça grelhada acompanhada de mandioca cozida.',
    price: 35.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Torresmo',
    description: 'Torresmo crocante e saboroso.',
    price: 18.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Torresmo com Mandioca',
    description: 'Torresmo crocante servido com mandioca cozida.',
    price: 35.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Filé de Tilápia',
    description: 'Delicioso filé de tilápia empanado.',
    price: 50.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Contra Filé com Fritas',
    description: 'Suculento contra filé com porção de batatas fritas.',
    price: 65.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },
  {
    id: uuidv4(),
    name: 'Picanha (Porção)',
    description: 'Generosa porção de picanha grelhada.',
    price: 75.00,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Porções'
  },

  // --- PIZZAS ---
  {
    id: uuidv4(),
    name: 'Pizza Quatro Queijos',
    description: 'Muçarela, Cheddar, catupiry, parmesão, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Bacon',
    description: 'Bacon, muçarela, tomate azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Calabresa',
    description: 'Calabresa, muçarela, cebola, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Camarão',
    description: 'Muçarela, camarão, catupiry alho frito, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Carne Seca',
    description: 'Muçarela, carne seca, catupiry cebola, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Costela',
    description: 'Muçarela, costela, catupiry cebola, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Da Roça',
    description: 'Muçarela, frango desfiado, milho Bacon, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Presunto',
    description: 'Presunto, Muçarela, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Frango com Catupiry',
    description: 'Muçarela, frango desfiado, catupiry, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Lombo',
    description: 'Muçarela, lombo canadense, catupiry azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Margherita',
    description: 'Muçarela, tomate, parmesão, manjericão, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza A Moda',
    description: 'Muçarela, presunto, calabresa, palmito, azeitona, milho, cebola, catupiry e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Americana',
    description: 'Muçarela, cheddar, tomate, pimentão, cream cheese, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Palmito',
    description: 'Muçarela, palmito, catupiry azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Portuguesa',
    description: 'Muçarela, calabresa, tomate, pimentão, presunto, ovo, cebola, azeitona e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: uuidv4(),
    name: 'Pizza Italiana',
    description: 'Muçarela, salaminho, azeitona, cebola e orégano. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/2762968/pexels-photo-2762968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },

  // --- PIZZAS DOCES ---
  {
    id: uuidv4(),
    name: 'Pizza Prestígio',
    description: 'Muçarela, brigadeiro e coco. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/7142952/pexels-photo-7142952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas Doces'
  },
  {
    id: uuidv4(),
    name: 'Pizza Banana com Doce de Leite',
    description: 'Muçarela, banana, doce de leite e canela. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/7142952/pexels-photo-7142952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas Doces'
  },
  {
    id: uuidv4(),
    name: 'Pizza Creme de Avelã com Confete',
    description: 'Muçarela, creme de avelã e confete. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/7142952/pexels-photo-7142952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas Doces'
  },
  {
    id: uuidv4(),
    name: 'Pizza Romeu e Julieta',
    description: 'Muçarela, requeijão cremoso e goiabada. Tamanhos: P: R$ 30,00, M: R$ 35,00, G: R$ 40,00.',
    price: 30.00,
    image: 'https://images.pexels.com/photos/7142952/pexels-photo-7142952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas Doces'
  },

  // --- BEBIDAS (Preços estimados para fins de demonstração) ---
  {
    id: uuidv4(),
    name: 'Coca-cola 2L',
    description: 'Refrigerante Coca-Cola 2 litros.',
    price: 10.00,
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Guaraná 2L',
    description: 'Refrigerante Guaraná 2 litros.',
    price: 9.00,
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Fanta Laranja 2L',
    description: 'Refrigerante Fanta Laranja 2 litros.',
    price: 9.00,
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Coca-cola 1L',
    description: 'Refrigerante Coca-Cola 1 litro.',
    price: 7.00,
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Guaraná 1L',
    description: 'Refrigerante Guaraná 1 litro.',
    price: 6.00,
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Coca-cola Lata',
    description: 'Lata 350ml de Coca-Cola.',
    price: 5.00,
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Guaraná Lata',
    description: 'Lata 350ml de Guaraná.',
    price: 4.50,
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Fanta Laranja Lata',
    description: 'Lata 350ml de Fanta Laranja.',
    price: 4.50,
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Água c/ Gás',
    description: 'Água mineral com gás.',
    price: 4.00,
    image: 'https://images.pexels.com/photos/103596/pexels-photo-103596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Água s/ Gás',
    description: 'Água mineral sem gás.',
    price: 3.00,
    image: 'https://images.pexels.com/photos/103596/pexels-photo-103596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'H2O / Limoneto',
    description: 'Bebida H2O sabor Limoneto.',
    price: 6.00,
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Suco Natural',
    description: 'Sabores: Maracujá, Laranja, Abacaxi.',
    price: 8.00,
    image: 'https://images.pexels.com/photos/3387137/pexels-photo-3387137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Brahma 600ml',
    description: 'Cerveja Brahma garrafa 600ml.',
    price: 12.00,
    image: 'https://images.pexels.com/photos/1283281/pexels-photo-1283281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Skol 600ml',
    description: 'Cerveja Skol garrafa 600ml.',
    price: 11.00,
    image: 'https://images.pexels.com/photos/1283281/pexels-photo-1283281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Heineken 600ml',
    description: 'Cerveja Heineken garrafa 600ml.',
    price: 15.00,
    image: 'https://images.pexels.com/photos/1283281/pexels-photo-1283281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Império 600ml',
    description: 'Cerveja Império garrafa 600ml.',
    price: 10.00,
    image: 'https://images.pexels.com/photos/1283281/pexels-photo-1283281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Amstel 600ml',
    description: 'Cerveja Amstel garrafa 600ml.',
    price: 12.00,
    image: 'https://images.pexels.com/photos/1283281/pexels-photo-1283281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Heineken Long Neck',
    description: 'Cerveja Heineken long neck.',
    price: 9.00,
    image: 'https://images.pexels.com/photos/2180808/pexels-photo-2180808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Corona Long Neck',
    description: 'Cerveja Corona long neck.',
    price: 10.00,
    image: 'https://images.pexels.com/photos/2180808/pexels-photo-2180808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Império Long Neck',
    description: 'Cerveja Império long neck.',
    price: 8.00,
    image: 'https://images.pexels.com/photos/2180808/pexels-photo-2180808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Skol Beats Long Neck',
    description: 'Bebida mista Skol Beats long neck.',
    price: 9.00,
    image: 'https://images.pexels.com/photos/2180808/pexels-photo-2180808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: uuidv4(),
    name: 'Drinks',
    description: 'Consultar disponibilidade de fruta: Campari, Caipirinha, Morango, Açaí, Abacaxi.',
    price: 25.00,
    image: 'https://images.pexels.com/photos/1304542/pexels-photo-1304542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  // --- COMBOS (Exemplo) ---
  {
    id: uuidv4(),
    name: 'Combo Família',
    description: '2 hambúrgueres tradicionais, 1 porção grande de batata, 4 refrigerantes',
    price: 89.90,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Combos'
  },
];

export const ProductProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    
    setLoading(false);
  }, []);
  
  const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    const newProduct = {
      ...product,
      id: uuidv4()
    };
    
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
    
    return newProduct;
  };
  
  const updateProduct = async (product: Product): Promise<Product> => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(p => 
        p.id === product.id ? product : p
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
    
    return product;
  };
  
  const deleteProduct = async (productId: string): Promise<void> => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.filter(p => p.id !== productId);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };
  
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
};