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
  /* Grade de 2 colunas para celulares e tablets (padrão) */
  grid-template-columns: repeat(2, 1fr); 
  gap: 1.5rem; /* Espaçamento ajustado para 2 colunas em telas menores */
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  max-height: fit-content;

  /* Ajustes para telas muito pequenas, para garantir que 2 colunas caibam */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.75rem; /* Reduz o espaçamento em celulares muito pequenos */
  }

  /* 3 Colunas no Desktop (a partir de md) */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem; /* Espaçamento padrão para 3 colunas em desktop */
  }

  &.collapsed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
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