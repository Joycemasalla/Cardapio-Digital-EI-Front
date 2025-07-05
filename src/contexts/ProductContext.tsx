import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Removido uuidv4 pois o id será gerado pelo backend
import { FunctionComponent } from 'react';

// src/contexts/ProductContext.tsx
export type ProductVariation = {
  name: string;
  price: number;
};

export type Product = {
  id: string; // O ID virá do backend
  name: string;
  description: string;
  price?: number;
  image?: string;
  category: string;
  variations?: ProductVariation[];
};

type ProductContextType = {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (product: Product) => Promise<Product>;
  deleteProduct: (productId: string) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Definimos a URL base da nossa API simulada
const API_BASE_URL = 'http://localhost:3001/products';

export const ProductProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Função para carregar os produtos da API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Falha ao carregar produtos:", error);
      // Opcional: toast.error('Falha ao carregar produtos.'); // Se quiser reintroduzir o toast, importe-o
      setProducts([]); // Limpa produtos em caso de erro
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Executa apenas uma vez ao montar o componente
  
  // Função para adicionar um produto via API (POST)
  const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Erro ao adicionar produto');
    }
    const newProduct: Product = await response.json();
    setProducts(prevProducts => [...prevProducts, newProduct]);
    return newProduct;
  };
  
  // Função para atualizar um produto via API (PUT)
  const updateProduct = async (product: Product): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }
    const updatedProduct: Product = await response.json();
    setProducts(prevProducts => 
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    return updatedProduct;
  };
  
  // Função para deletar um produto via API (DELETE)
  const deleteProduct = async (productId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar produto');
    }
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
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