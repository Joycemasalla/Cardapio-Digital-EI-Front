// src/components/BackToTopButton/BackToTopButtonStyles.js
import styled from 'styled-components';

export const ScrollButton = styled.button`
  position: fixed;
  bottom: 80px; /* Acima do botão "Ver Carrinho" */
  right: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 50%; /* Botão circular */
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  cursor: pointer;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)}; /* Visibilidade controlada por prop */
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')}; /* Esconde para interação */
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 900; /* Garante que esteja acima do conteúdo, mas abaixo do carrinho */

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: 70px;
    right: 15px;
    width: 40px;
    height: 40px;
  }
`;