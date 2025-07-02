import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import {
  FloatingButtonContainer,
  FloatingButton,
  ItemCountBadge
} from './FloatingCartButtonStyles';

const FloatingCartButton: React.FC = () => {
  const { cartItems, toggleCart } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Não renderiza o botão se o carrinho estiver vazio
  if (itemCount === 0) {
    return null;
  }

  return (
    <FloatingButtonContainer>
      <FloatingButton onClick={toggleCart}>
        <ShoppingCart size={20} />
        Ver Carrinho
        {itemCount > 0 && <ItemCountBadge>{itemCount}</ItemCountBadge>}
      </FloatingButton>
    </FloatingButtonContainer>
  );
};

export default FloatingCartButton;