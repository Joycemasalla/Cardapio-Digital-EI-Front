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

// Sample products data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'X-Bacon Imperial',
    description: 'Pão, hambúrguer, bacon, queijo, alface, tomate e molho especial',
    price: 24.90,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Tradicionais'
  },
  {
    id: '2',
    name: 'Artesanal Império',
    description: 'Pão australiano, 180g de carne angus, cheddar, cebola caramelizada e molho especial',
    price: 32.90,
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Hambúrgueres Artesanais'
  },
  {
    id: '3',
    name: 'Batata Frita Imperial',
    description: 'Porção de batata frita crocante acompanhada de molho especial da casa',
    price: 18.90,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  },
  {
    id: '4',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, muçarela, tomate e manjericão fresco',
    price: 42.90,
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas'
  },
  {
    id: '5',
    name: 'Pizza de Chocolate',
    description: 'Massa fina coberta com chocolate, morangos e confetes',
    price: 38.90,
    image: 'https://images.pexels.com/photos/7142952/pexels-photo-7142952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Pizzas Doces'
  },
  {
    id: '6',
    name: 'Refrigerante Lata',
    description: 'Lata 350ml (Coca-Cola, Guaraná, Sprite ou Fanta)',
    price: 5.90,
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bebidas'
  },
  {
    id: '7',
    name: 'Combo Família',
    description: '2 hambúrgueres tradicionais, 1 porção grande de batata, 4 refrigerantes',
    price: 89.90,
    image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Combos'
  },
  {
    id: '8',
    name: 'Isca de Frango',
    description: 'Porção de tiras de peito de frango empanadas e fritas',
    price: 22.90,
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Porções'
  }
];

export const ProductProvider:FunctionComponent <{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll load the initial products and check if we have any
    // stored products in localStorage
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