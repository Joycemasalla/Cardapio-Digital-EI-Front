import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (product: Product) => {
  
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
  
      if (existingItem) {
        // Se o item já existe, aumente a quantidade
        const updatedItems = prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
  
        // Apenas exibir a mensagem uma vez, caso a quantidade tenha sido aumentada
        if (existingItem.quantity === 1) {
          console.log(`Adicionando mais um ${product.name} ao carrinho...`);
          toast.success(`Adicionado mais um ${product.name} ao carrinho!`);
        }
  
        return updatedItems;
      } else {
        // Se o item não existe, adicione o item com quantidade 1
        const updatedItems = [...prevItems, { ...product, quantity: 1 }];
        
        toast.success(`${product.name} adicionado ao carrinho!`);
  
        return updatedItems;
      }
    });
  
    // Abrir o carrinho quando adicionar o item
    setIsCartOpen(true);
  };
  

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.info('Item removido do carrinho');
  };

  const incrementQuantity = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
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
