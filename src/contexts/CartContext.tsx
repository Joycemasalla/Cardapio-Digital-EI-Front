// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { FunctionComponent } from 'react';
import { Product, ProductVariation } from './ProductContext';

// NOVO: Tipos para as metades da pizza
type PizzaHalfDetails = {
    id: string;
    name: string;
    price: number;
};

// Modifica CartItem para incluir informações de "meio a meio"
export interface CartItem extends Product {
  quantity: number;
  selectedVariation?: ProductVariation;
  isHalfAndHalf?: boolean;
  half1?: { id: string; name: string; price: number };
  half2?: { id: string; name: string; price: number };
  cuttingStyle?: 'normal' | 'francesinha'; // NOVO: Adiciona a propriedade cuttingStyle
}

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  // addToCart agora aceita o produto "combinado" do modal
  addToCart: (product: CartItem, selectedVariation?: ProductVariation) => void;
  removeFromCart: (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string) => void; // NOVO: Adiciona nomes das metades
  incrementQuantity: (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string) => void; // NOVO: Adiciona nomes das metades
  decrementQuantity: (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string) => void; // NOVO: Adiciona nomes das metades
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE_URL = 'https://cardapio-digital-ei-back.onrender.com/api/products'; 

export const CartProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Adaptação de addToCart para lidar com variações e "meio a meio"
  const addToCart = (productToAdd: CartItem, selectedVariation?: ProductVariation) => {
    setCartItems(prevItems => {
      // Cria uma chave única para o item no carrinho, considerando variações E metades
      let itemKey = productToAdd.id;
      let itemName = productToAdd.name;
      let itemPrice = productToAdd.price || 0; // Preço final do item
      
      if (productToAdd.isHalfAndHalf && productToAdd.half1 && productToAdd.half2) {
          itemKey = `half-${productToAdd.half1.id}-${productToAdd.half2.id}-${selectedVariation?.name || 'no-var'}`;
          itemName = `Pizza ${productToAdd.half1.name}  /  ${productToAdd.half2.name} (${selectedVariation?.name})`;
          itemPrice = productToAdd.price || 0; // Já vem calculado
      } else if (selectedVariation) {
          itemKey = `${productToAdd.id}-${selectedVariation.name}`;
          itemName = `${productToAdd.name} (${selectedVariation.name})`;
          itemPrice = selectedVariation.price;
      } else {
          itemKey = productToAdd.id;
          itemName = productToAdd.name;
          itemPrice = productToAdd.price || 0;
      }

      const existingItem = prevItems.find(item => {
        let existingItemKey = item.id;
        if (item.isHalfAndHalf && item.half1 && item.half2) {
            existingItemKey = `half-${item.half1.id}-${item.half2.id}-${item.selectedVariation?.name || 'no-var'}`;
        } else if (item.selectedVariation) {
            existingItemKey = `${item.id}-${item.selectedVariation.name}`;
        }
        return existingItemKey === itemKey;
      });
  
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          itemKey === (item.isHalfAndHalf && item.half1 && item.half2 ? `half-${item.half1.id}-${item.half2.id}-${item.selectedVariation?.name || 'no-var'}` : item.selectedVariation ? `${item.id}-${item.selectedVariation.name}` : item.id)
            ? { ...item, quantity: item.quantity + 1 } : item
        );
        toast.success(`Mais um ${itemName} adicionado!`);
        return updatedItems;
      } else {
        const newItem: CartItem = { 
          ...productToAdd, // Copia as propriedades do produto
          id: productToAdd.id, // Mantém o ID original ou o ID composto para meio a meio
          name: itemName, // Nome formatado para exibição
          price: itemPrice, // Preço final calculado
          quantity: 1, 
          selectedVariation: selectedVariation, // Variação de tamanho
          isHalfAndHalf: productToAdd.isHalfAndHalf || false, // Flag meio a meio
          half1: productToAdd.half1, // Detalhes da metade 1
          half2: productToAdd.half2 // Detalhes da metade 2
        };
        toast.success(`${itemName} adicionado ao carrinho!`);
        return [...prevItems, newItem];
      }
    });
  };
  

  // Adaptação de incrementQuantity, decrementQuantity, removeFromCart para lidar com "meio a meio"
  // Agora aceitam nomes das metades para criar uma chave de identificação mais precisa
  const getCompositeKey = (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string): string => {
    if (half1Name && half2Name) {
      // Chave para pizza meio a meio (ordem das metades não importa para a chave, então ordena)
      const sortedHalves = [half1Name, half2Name].sort();
      return `half-${sortedHalves[0]}-${sortedHalves[1]}-${selectedVariationName || 'no-var'}`;
    }
    // Chave para produto normal com ou sem variação
    return selectedVariationName ? `${productId}-${selectedVariationName}` : productId;
  };

  const incrementQuantity = (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string) => {
    const targetKey = getCompositeKey(productId, selectedVariationName, half1Name, half2Name);
    setCartItems(prevItems =>
      prevItems.map(item => {
        const itemKey = getCompositeKey(item.id, item.selectedVariation?.name, item.half1?.name, item.half2?.name);
        return itemKey === targetKey ? { ...item, quantity: item.quantity + 1 } : item;
      })
    );
  };

  const decrementQuantity = (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string) => {
    const targetKey = getCompositeKey(productId, selectedVariationName, half1Name, half2Name);
    setCartItems(prevItems =>
      prevItems.map(item => {
        const itemKey = getCompositeKey(item.id, item.selectedVariation?.name, item.half1?.name, item.half2?.name);
        return (itemKey === targetKey && item.quantity > 1)
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      })
    );
  };

  const removeFromCart = (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string) => {
    const targetKey = getCompositeKey(productId, selectedVariationName, half1Name, half2Name);
    setCartItems(prevItems => prevItems.filter(item => {
      const itemKey = getCompositeKey(item.id, item.selectedVariation?.name, item.half1?.name, item.half2?.name);
      return itemKey !== targetKey;
    }));
    toast.info('Item removido do carrinho');
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Carrinho esvaziado');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};