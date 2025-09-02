import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: ${({ theme }) => theme.transition};
  display: flex;
  flex-direction: column;
  height: auto; 
  min-height: 200px; 
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 180px;
  }

  &.list-view {
    flex-direction: row;
    min-height: unset;
    height: auto; 
    padding: 0.6rem;
    align-items: center; 
    gap: 0.6rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0.5rem;
      gap: 0.5rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0.4rem;
      gap: 0.4rem;
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

  ${CardContainer}.list-view & {
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    overflow: hidden;
    flex-shrink: 1; 

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
    white-space: normal; 
    overflow: hidden;
    text-overflow: ellipsis; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
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
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: -webkit-box; 
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;

  ${CardContainer}.list-view & {
    font-size: 0.7rem;
    white-space: normal;
    margin-bottom: 0.2rem;
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.75rem;
  }
`;

export const VariationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.4rem;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  overflow: hidden; 

  ${CardContainer}.list-view & {
    gap: 0.3rem; 
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
`;

export const VariationOption = styled.label`
  background-color: ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.backgroundCard};
  color: ${({ theme, $selected }) => 
    $selected ? theme.colors.background : theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  padding: 0.2rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 25px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
    background-color: ${({ theme, $selected }) => 
      $selected ? theme.colors.primaryDark : 'rgba(255, 255, 255, 0.1)'};
  }

  input[type="radio"] {
    display: none;
  }

  ${CardContainer}.list-view & {
    padding: 0.15rem 0.4rem;
    font-size: 0.65rem;
    min-width: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    min-width: 25px;
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
  margin-left: auto; 

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