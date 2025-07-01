import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: ${({ theme }) => theme.transition};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 250px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 220px;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 120px;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${({ theme }) => theme.transition};

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

export const ProductInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ProductName = styled.h3`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.4rem;
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.05rem;
  }
`;

export const ProductDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  flex: 1;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  transition: all 0.3s ease;

  &.expanded {
    -webkit-line-clamp: unset;
    white-space: normal;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
    -webkit-line-clamp: 2;
  }
`;

export const ToggleDescriptionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  padding: 0.2rem 0;
  margin-top: -0.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const ProductPrice = styled.div`
  font-size: 1.35rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinha o conteúdo à esquerda */
  gap: 0.5rem; /* Espaçamento entre preço e botão */
  margin-top: auto;
  flex-wrap: wrap; /* Permite que o botão vá para a próxima linha em telas pequenas */
  white-space: nowrap; /* Garante que o preço não quebre linha */
  flex-shrink: 0;
  min-width: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.25rem;
    min-width: 70px;
    gap: 0.3rem;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  font-size: 0.9rem;
  transition: ${({ theme }) => theme.transition};
  flex-shrink: 0;
  white-space: nowrap; /* Evita que o texto do botão quebre */

  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
    gap: 0.2rem;
  }
`;