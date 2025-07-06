// src/components/WhatsAppButton/WhatsAppButton.tsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Precisaremos instalar essa biblioteca de ícones
import { useCart } from '../../contexts/CartContext';
import { WhatsAppButtonContainer } from './WhatsAppButtonStyles';

const WHATSAPP_NUMBER = '5532988949994'; // Substitua pelo número de telefone do seu negócio

const WhatsAppButton: React.FC = () => {
  const { cartItems } = useCart();

  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) {
      return "Olá! Gostaria de fazer um pedido, mas meu carrinho está vazio. Poderiam me ajudar?";
    }

    let message = "Olá! Gostaria de fazer um pedido. Seguem os itens do meu carrinho:\n\n";
    let total = 0;

    cartItems.forEach(item => {
      // CORREÇÃO AQUI: Usando ?? 0 para garantir que item.price é um número
      const itemPrice = item.price ?? 0; // Se item.price for undefined, usa 0
      message += `- ${item.quantity}x ${item.name}`;
      if (item.selectedVariation) {
        message += ` (${item.selectedVariation.name})`;
      }
      message += ` - R$ ${(itemPrice * item.quantity).toFixed(2).replace('.', ',')}\n`; // Usando itemPrice corrigido
      total += itemPrice * item.quantity; // Usando itemPrice corrigido
    });

    message += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    message += `\n\nPor favor, me ajudem a finalizar o pedido!`;

    return encodeURIComponent(message); // Codifica a mensagem para URL
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank'); // Abre em uma nova aba
  };

  return (
    <WhatsAppButtonContainer onClick={handleWhatsAppClick}>
      <FaWhatsapp />
    </WhatsAppButtonContainer>
  );
};

export default WhatsAppButton;