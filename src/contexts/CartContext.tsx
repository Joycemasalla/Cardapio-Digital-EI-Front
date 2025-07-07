import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { FunctionComponent } from 'react';
// IMPORTAÇÃO CORRIGIDA: Importa Product e ProductVariation do ProductContext
import { Product, ProductVariation } from './ProductContext';


// CartItem agora pode incluir a variação selecionada
export type CartItem = Product & { // Estende o tipo Product importado
  quantity: number;
  selectedVariation?: ProductVariation; // Nova propriedade para armazenar a variação escolhida
};

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Product, selectedVariation?: ProductVariation) => void; // Aceita variação
  removeFromCart: (productId: string, selectedVariationName?: string) => void; // Aceita nome da variação para remoção mais precisa
  incrementQuantity: (productId: string, selectedVariationName?: string) => void; // Aceita nome da variação
  decrementQuantity: (productId: string, selectedVariationName?: string) => void; // Aceita nome da variação
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Adaptação de addToCart para lidar com variações
  const addToCart = (product: Product, selectedVariation?: ProductVariation) => {
        console.log('addToCart recebido: Produto:', product, 'Variação:', selectedVariation); // LOG 4: Função recebida

    setCartItems(prevItems => {
      // Usamos uma "chave" para identificar itens no carrinho de forma única, incluindo a variação
      const itemKey = selectedVariation ? `${product.id}-${selectedVariation.name}` : product.id;
      
      const existingItem = prevItems.find(item => {
        const existingItemKey = item.selectedVariation ? `${item.id}-${item.selectedVariation.name}` : item.id;
        return existingItemKey === itemKey;
      });
  
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          (item.selectedVariation ? `${item.id}-${item.selectedVariation.name}` : item.id) === itemKey
            ? { ...item, quantity: item.quantity + 1 } : item
        );
                console.log('Item existente: Incrementando quantidade. Novos itens:', updatedItems); // LOG 5: Item existente

        toast.success(`Mais um ${product.name}${selectedVariation ? ` (${selectedVariation.name})` : ''} adicionado!`);
        return updatedItems;
      } else {
        // Calcula o preço correto e o nome (com variação)
        // Garante que price é um number, pois o CartItem agora espera price: number
        const itemPrice = selectedVariation ? selectedVariation.price : (product.price ?? 0); 
        const itemName = selectedVariation ? `${product.name} (${selectedVariation.name})` : product.name;

        const newItem: CartItem = { 
          ...product, 
          id: product.id, // Mantém o ID original do produto
          name: itemName,
          price: itemPrice, // Usa o preço da variação ou o preço base do produto
          quantity: 1, 
          selectedVariation: selectedVariation 
        };
                console.log('Novo item: Adicionando ao carrinho. Novos itens:', [...prevItems, newItem]); // LOG 6: Novo item

        toast.success(`${itemName} adicionado ao carrinho!`);
        return [...prevItems, newItem];
      }
    });
  };
  

  // Adaptação de incrementQuantity para lidar com variações
  const incrementQuantity = (productId: string, selectedVariationName?: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        const itemKey = item.selectedVariation ? `${item.id}-${item.selectedVariation.name}` : item.id;
        const targetKey = selectedVariationName ? `${productId}-${selectedVariationName}` : productId;
        return itemKey === targetKey ? { ...item, quantity: item.quantity + 1 } : item;
      })
    );
  };

  // Adaptação de decrementQuantity para lidar com variações
  const decrementQuantity = (productId: string, selectedVariationName?: string) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        const itemKey = item.selectedVariation ? `${item.id}-${item.selectedVariation.name}` : item.id;
        const targetKey = selectedVariationName ? `${productId}-${selectedVariationName}` : productId;
        
        return (itemKey === targetKey && item.quantity > 1)
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      })
    );
  };

  // Adaptação de removeFromCart para lidar com variações
  const removeFromCart = (productId: string, selectedVariationName?: string) => {
    setCartItems(prevItems => prevItems.filter(item => {
      const itemKey = item.selectedVariation ? `${item.id}-${item.selectedVariation.name}` : item.id;
      const targetKey = selectedVariationName ? `${productId}-${selectedVariationName}` : productId;
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