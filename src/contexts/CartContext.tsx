// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { FunctionComponent } from 'react';
import { Product, ProductVariation, ProductOptional } from './ProductContext';

// NOVO: Tipo para os opcionais selecionados
type SelectedOptionalDetails = {
    name: string;
    price: number;
};

// NOVO: Tipo para as metades da pizza
type PizzaHalfDetails = {
    id: string;
    name: string;
    price: number;
};

// Modifica CartItem para incluir informações de "meio a meio" e opcionais
export interface CartItem extends Product {
  quantity: number;
  selectedVariation?: ProductVariation;
  isHalfAndHalf?: boolean;
  half1?: PizzaHalfDetails;
  half2?: PizzaHalfDetails;
  cuttingStyle?: 'normal' | 'francesinha';
  selectedOptionals?: SelectedOptionalDetails[]; // NOVO: Campo para armazenar opcionais selecionados
}

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  // addToCart agora aceita o produto "combinado" do modal
  addToCart: (product: CartItem, selectedVariation?: ProductVariation) => void;
  removeFromCart: (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string) => void;
  incrementQuantity: (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string) => void;
  decrementQuantity: (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string) => void;
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

  const addToCart = (productToAdd: CartItem, selectedVariation?: ProductVariation) => {
    setCartItems(prevItems => {
      let itemKey = productToAdd.id;
      let itemName = productToAdd.name;
      let itemPrice = productToAdd.price || 0;
      let optionalNames = productToAdd.selectedOptionals ? productToAdd.selectedOptionals.map(o => o.name).sort().join(',') : '';

      if (productToAdd.isHalfAndHalf && productToAdd.half1 && productToAdd.half2) {
          itemKey = `half-${productToAdd.half1.id}-${productToAdd.half2.id}-${selectedVariation?.name || 'no-var'}-${optionalNames}`; // NOVO: Adiciona opcionais à chave
          itemName = `Pizza ${productToAdd.half1.name}  /  ${productToAdd.half2.name} (${selectedVariation?.name})`;
          itemPrice = productToAdd.price || 0;
      } else if (selectedVariation) {
          itemKey = `${productToAdd.id}-${selectedVariation.name}-${optionalNames}`; // NOVO: Adiciona opcionais à chave
          itemName = `${productToAdd.name} (${selectedVariation.name})`;
          itemPrice = selectedVariation.price;
      } else {
          itemKey = `${productToAdd.id}-${optionalNames}`; // NOVO: Adiciona opcionais à chave
          itemName = productToAdd.name;
          itemPrice = productToAdd.price || 0;
      }

      const existingItem = prevItems.find(item => {
        let existingItemKey = item.id;
        let existingOptionalNames = item.selectedOptionals ? item.selectedOptionals.map(o => o.name).sort().join(',') : '';
        if (item.isHalfAndHalf && item.half1 && item.half2) {
            existingItemKey = `half-${item.half1.id}-${item.half2.id}-${item.selectedVariation?.name || 'no-var'}-${existingOptionalNames}`;
        } else if (item.selectedVariation) {
            existingItemKey = `${item.id}-${item.selectedVariation.name}-${existingOptionalNames}`;
        } else {
            existingItemKey = `${item.id}-${existingOptionalNames}`;
        }
        return existingItemKey === itemKey;
      });
  
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          (itemKey === (item.isHalfAndHalf && item.half1 && item.half2 ? `half-${item.half1.id}-${item.half2.id}-${item.selectedVariation?.name || 'no-var'}-${item.selectedOptionals ? item.selectedOptionals.map(o => o.name).sort().join(',') : ''}` : item.selectedVariation ? `${item.id}-${item.selectedVariation.name}-${item.selectedOptionals ? item.selectedOptionals.map(o => o.name).sort().join(',') : ''}` : `${item.id}-${item.selectedOptionals ? item.selectedOptionals.map(o => o.name).sort().join(',') : ''}`))
            ? { ...item, quantity: item.quantity + 1 } : item
        );
        toast.success(`Mais um ${itemName} adicionado!`);
        return updatedItems;
      } else {
        const newItem: CartItem = { 
          ...productToAdd,
          id: productToAdd.id,
          name: itemName,
          price: itemPrice,
          quantity: 1, 
          selectedVariation: selectedVariation,
          isHalfAndHalf: productToAdd.isHalfAndHalf || false,
          half1: productToAdd.half1,
          half2: productToAdd.half2,
          selectedOptionals: productToAdd.selectedOptionals // NOVO: Adiciona a lista de opcionais
        };
        toast.success(`${itemName} adicionado ao carrinho!`);
        return [...prevItems, newItem];
      }
    });
  };
  

  const getCompositeKey = (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string, optionalNames?: string): string => {
    if (half1Name && half2Name) {
      const sortedHalves = [half1Name, half2Name].sort();
      return `half-${sortedHalves[0]}-${sortedHalves[1]}-${selectedVariationName || 'no-var'}-${optionalNames}`;
    }
    return selectedVariationName ? `${productId}-${selectedVariationName}-${optionalNames}` : `${productId}-${optionalNames}`;
  };

  const incrementQuantity = (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string, optionalNames?: string) => {
    const targetKey = getCompositeKey(productId, selectedVariationName, half1Name, half2Name, optionalNames);
    setCartItems(prevItems =>
      prevItems.map(item => {
        const itemKey = getCompositeKey(item.id, item.selectedVariation?.name, item.half1?.name, item.half2?.name, item.selectedOptionals ? item.selectedOptionals.map(o => o.name).sort().join(',') : '');
        return itemKey === targetKey ? { ...item, quantity: item.quantity + 1 } : item;
      })
    );
  };

  const decrementQuantity = (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string, optionalNames?: string) => {
    const targetKey = getCompositeKey(productId, selectedVariationName, half1Name, half2Name, optionalNames);
    setCartItems(prevItems =>
      prevItems.map(item => {
        const itemKey = getCompositeKey(item.id, item.selectedVariation?.name, item.half1?.name, item.half2?.name, item.selectedOptionals ? item.selectedOptionals.map(o => o.name).sort().join(',') : '');
        return (itemKey === targetKey && item.quantity > 1)
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      })
    );
  };

  const removeFromCart = (productId: string, selectedVariationName?: string, half1Name?: string, half2Name?: string, optionalNames?: string) => {
    const targetKey = getCompositeKey(productId, selectedVariationName, half1Name, half2Name, optionalNames);
    setCartItems(prevItems => prevItems.filter(item => {
      const itemKey = getCompositeKey(item.id, item.selectedVariation?.name, item.half1?.name, item.half2?.name, item.selectedOptionals ? item.selectedOptionals.map(o => o.name).sort().join(',') : '');
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