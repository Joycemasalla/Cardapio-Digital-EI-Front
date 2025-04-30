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
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const Divider = styled.div`
  width: 60px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
`;