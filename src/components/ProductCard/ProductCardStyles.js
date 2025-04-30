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

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
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
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  flex: 1;
  line-height: 1.4;
`;

export const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem ;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  font-size: 0.9rem;
  transition: ${({ theme }) => theme.transition};
  overflow: hidden;
  max-width: 40px;

  &[data-hovered="true"] {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    padding: 0.5rem 0.75rem;
    max-width: 150px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.background};
  }
`;
