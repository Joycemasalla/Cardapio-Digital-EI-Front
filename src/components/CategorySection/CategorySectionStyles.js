import styled from 'styled-components';

export const SectionContainer = styled.section`
  margin: 4rem 0;
  position: relative;
  padding: 0 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 1rem;
    margin: 3rem 0;
  }
`;

export const CategoryAnchor = styled.div`
  position: absolute;
  top: -80px;
`;

export const TitleContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
    text-align: left;
  }
`;

export const Divider = styled.div`
  width: 60px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  ${TitleContainer} + & {
    margin-left: 0;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 1.5rem; /* Aumenta o espaçamento entre cards na grade para um visual mais arejado */
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  max-height: fit-content;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1rem; /* Espaçamento ajustado para celulares */
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem; /* Espaçamento padrão para desktop */
  }

  &.collapsed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }

  /* Estilos para o modo de lista */
  &.list-view-grid {
    grid-template-columns: 1fr; /* Apenas 1 coluna para lista */
    gap: 0.8rem; /* Espaçamento entre cards na lista */

    /* Garante que os cards no modo de lista se comportem como blocos */
    > div {
      width: 100%;
      box-sizing: border-box;
    }
  }
`;

export const ToggleIcon = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  &.rotated {
    transform: rotate(180deg);
  }
`;