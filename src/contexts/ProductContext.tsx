import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FunctionComponent } from 'react';

// NOVO: Tipo para os opcionais do produto
export type ProductOptional = {
  name: string;
  price: number;
};

// src/contexts/ProductContext.tsx
export type ProductVariation = {
  name: string;
  price: number;
};

export type Product = {
  id: string; // O ID do frontend
  _id?: string; // NOVO: Adicionado _id do MongoDB, tornando-o opcional
  name: string;
  description: string;
  price?: number;
  image?: string;
  category: string;
  variations?: ProductVariation[];
  optionals?: ProductOptional[]; // NOVO: Adiciona a propriedade opcionais
};

type ProductContextType = {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (product: Product) => Promise<Product>;
  deleteProduct: (productId: string) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const API_BASE_URL = 'https://cardapio-digital-ei-back.vercel.app/api/products';
// 'https://cardapio-digital-ei-back.onrender.com/api/products'; 
//const API_BASE_URL = 'http://localhost:3001/api/products'; // ou a porta do seu backend local

export const ProductProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const data: Product[] = await response.json();
      const mappedData = data.map(product => ({ ...product, id: product._id || product.id }));
      setProducts(mappedData);
    } catch (error) {
      console.error("Falha ao carregar produtos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
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
    setProducts(prevProducts => [...prevProducts, { ...newProduct, id: newProduct._id || newProduct.id }]);
    return newProduct;
  };
  
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
      prevProducts.map(p => (p.id === updatedProduct.id ? { ...updatedProduct, id: updatedProduct._id || updatedProduct.id } : p))
    );
    return updatedProduct;
  };
  
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