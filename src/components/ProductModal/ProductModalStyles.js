// src/components/ProductModal/ProductModalStyles.js
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.strong};
  padding: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 95%;
    padding: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductImage = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-height: 200px;
    margin-bottom: 1rem;
  }
`;

export const ProductInfo = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ProductName = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
  }
`;

export const ProductDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
`;

export const PriceDisplay = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
`;

export const VariationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

// REMOÇÃO DA ANOTAÇÃO DE TIPO:
export const VariationOption = styled.label`
  background-color: ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.backgroundCard};
  color: ${({ theme, $selected }) => 
    $selected ? theme.colors.background : theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  padding: 0.6rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.9rem;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.8rem;
    padding: 0.5rem 0.8rem;
  }
`;

export const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 0.3rem;
`;

export const QuantityButton = styled.button`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const QuantityDisplay = styled.span`
  min-width: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-weight: 500;
`;

export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textDark};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    justify-content: center;
    font-size: 0.95rem;
    padding: 0.7rem 1.2rem;
  }
`;