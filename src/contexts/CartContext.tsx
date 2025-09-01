import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { FunctionComponent } from 'react';
import { Product, ProductVariation, ProductAdditional } from './ProductContext';

type PizzaHalfDetails = {
    id: string;
    name: string;
    price: number;
};

export interface CartItem extends Product {
  quantity: number;
  selectedVariation?: ProductVariation;
  isHalfAndHalf?: boolean;
  half1?: PizzaHalfDetails;
  half2?: PizzaHalfDetails;
  cuttingStyle?: 'normal' | 'francesinha';
  selectedAdditionals?: ProductAdditional[];
}

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: CartItem, selectedVariation?: ProductVariation) => void;
  removeFromCart: (productId: string, selectedVariationName?: string, additionalNames?: string) => void;
  incrementQuantity: (productId: string, selectedVariationName?: string, additionalNames?: string) => void;
  decrementQuantity: (productId: string, selectedVariationName?: string, additionalNames?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const getCompositeKey = (productId: string, selectedVariationName?: string, additionalNames?: string): string => {
    return selectedVariationName ? `${productId}-${selectedVariationName}-${additionalNames}` : `${productId}-${additionalNames}`;
  };

  const addToCart = (productToAdd: CartItem, selectedVariation?: ProductVariation) => {
    setCartItems(prevItems => {
      let itemKey = productToAdd.id;
      let itemName = productToAdd.name;
      let itemPrice = productToAdd.price || 0;
      let additionalNames = productToAdd.selectedAdditionals ? productToAdd.selectedAdditionals.map(a => a.name).sort().join(',') : '';

      if (productToAdd.isHalfAndHalf && productToAdd.half1 && productToAdd.half2) {
          itemKey = `half-${productToAdd.half1.id}-${productToAdd.half2.id}-${selectedVariation?.name || 'no-var'}-${additionalNames}`;
          itemName = `Pizza ${productToAdd.half1.name}  /  ${productToAdd.half2.name} (${selectedVariation?.name})`;
          itemPrice = productToAdd.price || 0;
      } else if (selectedVariation) {
          itemKey = `${productToAdd.id}-${selectedVariation.name}-${additionalNames}`;
          itemName = `${productToAdd.name} (${selectedVariation.name})`;
          itemPrice = selectedVariation.price;
      } else {
          itemKey = `${productToAdd.id}-${additionalNames}`;
          itemName = productToAdd.name;
          itemPrice = productToAdd.price || 0;
      }

      const existingItem = prevItems.find(item => {
        let existingItemKey = item.id;
        let existingAdditionalNames = item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : '';
        if (item.isHalfAndHalf && item.half1 && item.half2) {
            existingItemKey = `half-${item.half1.id}-${item.half2.id}-${item.selectedVariation?.name || 'no-var'}-${existingAdditionalNames}`;
        } else if (item.selectedVariation) {
            existingItemKey = `${item.id}-${item.selectedVariation.name}-${existingAdditionalNames}`;
        } else {
            existingItemKey = `${item.id}-${existingAdditionalNames}`;
        }
        return existingItemKey === itemKey;
      });
  
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          (itemKey === (item.isHalfAndHalf && item.half1 && item.half2 ? `half-${item.half1.id}-${item.half2.id}-${item.selectedVariation?.name || 'no-var'}-${item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : ''}` : item.selectedVariation ? `${item.id}-${item.selectedVariation.name}-${item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : ''}` : `${item.id}-${item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : ''}`))
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
          selectedAdditionals: productToAdd.selectedAdditionals
        };
        toast.success(`${itemName} adicionado ao carrinho!`);
        return [...prevItems, newItem];
      }
    });
  };
  
  const incrementQuantity = (productId: string, selectedVariationName?: string, additionalNames?: string) => {
    const targetKey = getCompositeKey(productId, selectedVariationName, additionalNames);
    setCartItems(prevItems =>
      prevItems.map(item => {
        const itemKey = getCompositeKey(item.id, item.selectedVariation?.name, item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : '');
        return itemKey === targetKey ? { ...item, quantity: item.quantity + 1 } : item;
      })
    );
  };

  const decrementQuantity = (productId: string, selectedVariationName?: string, additionalNames?: string) => {
    const targetKey = getCompositeKey(productId, selectedVariationName, additionalNames);
    setCartItems(prevItems =>
      prevItems.map(item => {
        const itemKey = getCompositeKey(item.id, item.selectedVariation?.name, item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : '');
        return (itemKey === targetKey && item.quantity > 1)
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      })
    );
  };

  const removeFromCart = (productId: string, selectedVariationName?: string, additionalNames?: string) => {
    const targetKey = getCompositeKey(productId, selectedVariationName, additionalNames);
    setCartItems(prevItems => prevItems.filter(item => {
      const itemKey = getCompositeKey(item.id, item.selectedVariation?.name, item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : '');
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