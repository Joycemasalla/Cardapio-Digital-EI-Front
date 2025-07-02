import styled from 'styled-components';

export const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 900; /* Abaixo do carrinho, mas acima do conteúdo */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: 15px;
    right: 15px;
  }
`;

export const FloatingButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.large}; /* Botão arredondado */
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
    gap: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    gap: 0.4rem;
  }
`;

export const ItemCountBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.error}; /* Cor de destaque para o contador */
  color: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  position: absolute;
  top: -8px;
  right: -8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;