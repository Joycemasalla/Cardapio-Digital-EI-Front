// src/components/WhatsAppButton/WhatsAppButtonStyles.js
import styled from 'styled-components';

export const WhatsAppButtonContainer = styled.button`
  position: fixed;
  bottom: 20px; /* Distância do fundo */
  right: 20px; /* Distância da direita */
  background: linear-gradient(45deg, #25D366, #128C7E); /* Cores do WhatsApp */
  color: white;
  border: none;
  border-radius: 50%; /* Botão redondo */
  width: 60px; /* Tamanho do botão */
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px; /* Tamanho do ícone */
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para destaque */
  z-index: 1000; /* Garante que o botão fique acima de outros elementos */
  transition: all 0.3s ease; /* Animação suave ao interagir */

  &:hover {
    transform: scale(1.05); /* Pequeno zoom ao passar o mouse */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  /* Para telas menores */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 20px;
    bottom: 15px;
    right: 15px;
  }
`;