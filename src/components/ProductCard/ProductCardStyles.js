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
  min-height: 200px; /* Mais compacto na grade */

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 180px; /* Ainda mais compacto em mobile na grade */
  }

  /* Estilos para o modo de lista (horizontal) */
  &.list-view {
    flex-direction: row-reverse; /* Imagem à direita, informações à esquerda */
    min-height: unset;
    height: auto; /* Remove altura fixa e permite ajuste ao conteúdo */
    padding: 0.8rem; /* Aumenta padding para melhor espaçamento na lista */
    align-items: flex-start; /* Alinha itens ao topo */
    gap: 1rem; /* Aumenta espaçamento entre imagem e conteúdo na lista */
    /* REMOVIDO: max-height para permitir que o conteúdo não seja cortado */
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0.7rem;
      gap: 0.8rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0.6rem; /* Padding em mobile list-view */
      gap: 0.6rem;
    }
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100px; /* Imagem menor na grade */
  overflow: hidden;
  flex-shrink: 0;

  ${CardContainer}.list-view & { /* Estilos no modo de lista */
    width: 60px; /* Largura menor e fixa da imagem para a lista */
    height: 60px; /* Altura menor e fixa da imagem */
    border-radius: ${({ theme }) => theme.borderRadius.small}; /* Levemente arredondado na lista */

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 50px;
      height: 50px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 45px; /* Ajuste para mobile list-view */
      height: 45px; /* Ajuste para mobile list-view */
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
  padding: 0.7rem; /* Padding ajustado para o modo grade */
  display: flex;
  flex-direction: column;
  flex: 1; /* Permite que ProductInfo ocupe o espaço restante */
  justify-content: space-between;

  ${CardContainer}.list-view & { /* Estilos no modo de lista */
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: calc(100% - 45px - 0.6rem); /* Ajusta largura em mobile list-view (largura da imagem + gap) */
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
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
  }
`;

export const ProductDescription = styled.p`
  font-size: 0.75rem; /* Leve aumento para melhor legibilidade */
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.4rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* Aumenta linhas visíveis na grade para 5 */
  flex-grow: 1;

  ${CardContainer}.list-view & { /* Estilos no modo de lista */
    font-size: 0.7rem; /* Ainda menor na lista */
    -webkit-line-clamp: 2; /* Apenas 2 linhas na lista */
    margin-bottom: 0.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.75rem;
    -webkit-line-clamp: 4; /* 4 linhas em mobile */
  }
`;

export const ToggleDescriptionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  padding: 0.1rem 0;
  margin-top: 0.1rem;
  transition: color 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  ${CardContainer}.list-view & {
    display: none;
  }
`;

export const VariationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;

  ${CardContainer}.list-view & {
    font-size: 0.6rem;
    gap: 0.2rem;
    margin-top: 0.1rem;
    margin-bottom: 0.2rem;
  }
`;

export const VariationOption = styled.label`
  background-color: ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.backgroundCard};
  color: ${({ theme, $selected }) => 
    $selected ? theme.colors.background : theme.colors.textSecondary};
  border: 1px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.textDark};
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
  font-size: 1.05rem;
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
    font-size: 0.9rem;
    margin-top: 0.3rem;
    justify-content: space-between;
    gap: 0.4rem;
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
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.backgroundCard};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.background : theme.colors.textSecondary};
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.backgroundCard};
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
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primaryDark : 'rgba(255, 255, 255, 0.1)'};
    color: ${({ theme, $active }) =>
      $active ? theme.colors.background : theme.colors.text};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;