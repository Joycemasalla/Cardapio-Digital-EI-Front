// src/components/ProductCard/ProductCardStyles.js
import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: ${({ theme }) => theme.transition};
  display: flex;
  flex-direction: column;
  height: auto; /* Altura se adapta ao conteúdo */
  min-height: 200px; /* Altura mínima na grade */

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 180px;
  }

  /* Estilos para o modo de lista (horizontal) */
  &.list-view {
    flex-direction: row-reverse;
    min-height: unset;
    height: auto; /* <--- REMOVIDO: 'max-height' fixo para permitir expansão */
    padding: 0.6rem;
    align-items: flex-start; /* <--- ALTERADO: Alinha os itens ao topo */
    gap: 0.6rem;
    /* REMOVIDO: max-height: 100px; */
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      /* REMOVIDO: max-height: 90px; */
      padding: 0.5rem;
      gap: 0.5rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0.4rem;
      gap: 0.4rem;
      /* REMOVIDO: max-height: 80px; */
      flex-wrap: nowrap; /* Garante que não quebre em várias linhas inesperadamente */
    }
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100px;
  overflow: hidden;
  flex-shrink: 0;

  ${CardContainer}.list-view & {
    width: 60px;
    height: 60px;
    border-radius: ${({ theme }) => theme.borderRadius.small};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 50px;
      height: 50px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 45px;
      height: 45px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 80px;
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
  padding: 0.7rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  min-width: 0; /* Permite que o conteúdo encolha para não transbordar */

  ${CardContainer}.list-view & {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    overflow: hidden; /* <--- MANTIDO: Para cortar o que transborda se o espaço for MUITO pequeno */
    flex-shrink: 1; /* <--- ALTERADO: Permite que encolha se necessário, mas com min-width 0 */

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: calc(100% - 45px - 0.4rem);
      padding: 0;
    }
  }
`;

export const ProductName = styled.h3`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.05rem;
  font-weight: 600;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${CardContainer}.list-view & {
    font-size: 0.85rem;
    white-space: normal; /* <--- ALTERADO: Permite quebra de linha no nome do produto */
    overflow: hidden;
    text-overflow: ellipsis; /* Para cortar se tiver muitas linhas */
    display: -webkit-box; /* Para múltiplas linhas com ellipsis */
    -webkit-line-clamp: 2; /* Limita a 2 linhas */
    -webkit-box-orient: vertical;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
  }
`;

export const ProductDescription = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.4rem;
  line-height: 1.4;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  display: block;

  ${CardContainer}.list-view & {
    font-size: 0.7rem;
    white-space: normal;
    margin-bottom: 0.2rem;
    overflow: hidden; /* <--- MANTIDO: Para garantir que não transborde */
    text-overflow: ellipsis;
    display: -webkit-box; /* <--- NOVO: Para múltiplas linhas com ellipsis */
    -webkit-line-clamp: 2; /* <--- NOVO: Limita a 2 linhas, ajuste conforme necessário */
    -webkit-box-orient: vertical;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.75rem;
  }
`;

export const VariationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
  overflow: hidden; /* <--- NOVO: Garante que variações não transbordem */
  max-height: 40px; /* <--- NOVO: Limita a altura para variações, pode ajustar */


  ${CardContainer}.list-view & {
    font-size: 0.6rem;
    gap: 0.1rem;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    max-height: 30px; /* <--- NOVO: Altura menor para variações em lista */
  }
`;

export const VariationOption = styled.label`
  background-color: ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.backgroundCard};
  color: ${({ theme, $selected }) => 
    $selected ? theme.colors.background : theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  padding: 0.2rem 0.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.65rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
    background-color: ${({ theme, $selected }) => 
      $selected ? theme.colors.primaryDark : 'rgba(255, 255, 255, 0.1)'};
  }

  input[type="radio"] {
    display: none;
  }
`;

export const ProductPrice = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  margin-top: 0.6rem;
  flex-shrink: 0;
  width: 100%;

  ${CardContainer}.list-view & {
    font-size: 0.85rem;
    margin-top: 0.3rem;
    justify-content: flex-start;
    gap: 0.4rem;
    flex-wrap: nowrap; /* <--- NOVO: Garante que preço e botão fiquem na mesma linha */
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.2rem;
    margin-top: 0.4rem;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  font-size: 0.75rem;
  transition: ${({ theme }) => theme.transition};
  flex-shrink: 0;
  white-space: nowrap;
  justify-content: center;
  margin-left: auto; /* <--- NOVO: Empurra o botão para a direita no modo lista */


  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  ${CardContainer}.list-view & {
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }
`;

export const ViewToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 0.8rem;
  padding: 0 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 1rem;
  }
`;

export const ViewToggleButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 0.6rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  transition: ${({ theme }) => theme.transition};
  font-size: 0.9rem;
  font-weight: 500;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;