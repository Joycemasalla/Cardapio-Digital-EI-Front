import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FunctionComponent } from 'react';
import { ProductAdditional } from './ProductContext';

type AdditionalContextType = {
  additionals: ProductAdditional[];
  loading: boolean;
  fetchAdditionals: () => void;
  addAdditional: (additional: Omit<ProductAdditional, 'id'>) => Promise<ProductAdditional>;
  updateAdditional: (additional: ProductAdditional) => Promise<ProductAdditional>;
  deleteAdditional: (additionalId: string) => Promise<void>;
};

const AdditionalContext = createContext<AdditionalContextType | undefined>(undefined);

const API_BASE_URL = 'https://cardapio-digital-ei-back.vercel.app/api/additionals';

export const AdditionalProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [additionals, setAdditionals] = useState<ProductAdditional[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdditionals = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar adicionais');
      }
      const data: ProductAdditional[] = await response.json();
      const mappedData = data.map(additional => ({ ...additional, id: additional._id || additional.id }));
      setAdditionals(mappedData);
    } catch (error) {
      console.error("Falha ao carregar adicionais:", error);
      setAdditionals([]);
    } finally {
      setLoading(false);
    }
  };

  const addAdditional = async (additional: Omit<ProductAdditional, 'id'>): Promise<ProductAdditional> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(additional),
    });
    if (!response.ok) {
      throw new Error('Erro ao adicionar adicional');
    }
    const newAdditional: ProductAdditional = await response.json();
    setAdditionals(prev => [...prev, { ...newAdditional, id: newAdditional._id || newAdditional.id }]);
    return newAdditional;
  };
  
  const updateAdditional = async (additional: ProductAdditional): Promise<ProductAdditional> => {
    const response = await fetch(`${API_BASE_URL}/${additional.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(additional),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar adicional');
    }
    const updatedAdditional: ProductAdditional = await response.json();
    setAdditionals(prev =>
      prev.map(a => (a.id === updatedAdditional.id ? { ...updatedAdditional, id: updatedAdditional._id || updatedAdditional.id } : a))
    );
    return updatedAdditional;
  };

  const deleteAdditional = async (additionalId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${additionalId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar adicional');
    }
    setAdditionals(prev => prev.filter(a => a.id !== additionalId));
  };

  useEffect(() => {
    fetchAdditionals();
  }, []);

  return (
    <AdditionalContext.Provider
      value={{
        additionals,
        loading,
        fetchAdditionals,
        addAdditional,
        updateAdditional,
        deleteAdditional
      }}
    >
      {children}
    </AdditionalContext.Provider>
  );
};

export const useAdditionals = () => {
  const context = useContext(AdditionalContext);
  if (context === undefined) {
    throw new Error('useAdditionals must be used within an AdditionalProvider');
  }
  return context;
};