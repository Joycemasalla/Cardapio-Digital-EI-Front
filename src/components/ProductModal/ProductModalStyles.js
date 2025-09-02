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
  padding: 1.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 95%;
    padding: 1.2rem;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.8rem; 
  right: 0.8rem; 
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  z-index: 10; 

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1rem;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain; 
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 0.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-height: 160px;
    margin-bottom: 0.6rem;
  }
`;

export const ProductInfo = styled.div`
  width: 100%;
  text-align: center; 
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1rem;
  }
`;

export const ProductName = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.2rem;
  line-height: 1.2;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.6rem; 
    margin-bottom: 0.1rem;
  }
`;

export const ProductDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: 1rem;
  white-space: pre-wrap; 
  text-align: center; 

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
`;

export const PizzaModeSelector = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.textDark};
`;

export const PizzaModeButton = styled.button`
    flex: 1;
    padding: 0.7rem 0.5rem;
    background-color: ${({ theme, $selected }) => $selected ? theme.colors.primary : theme.colors.backgroundCard};
    color: ${({ theme, $selected }) => $selected ? theme.colors.background : theme.colors.textSecondary}; 
    border: none;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme, $selected }) => $selected ? theme.colors.primaryDark : 'rgba(255,255,255,0.1)'};
        color: ${({ theme, $selected }) => $selected ? theme.colors.background : theme.colors.text};
    }

    &:first-child {
        border-top-left-radius: ${({ theme }) => theme.borderRadius.small};
        border-bottom-left-radius: ${({ theme }) => theme.borderRadius.small};
    }
    &:last-child {
        border-top-right-radius: ${({ theme }) => theme.borderRadius.small};
        border-bottom-right-radius: ${({ theme }) => theme.borderRadius.small};
    }
`;

export const HalfPizzaSelectGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    flex-wrap: wrap; 
`;

export const CuttingOptionsContainer = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
  padding: 0 0.5rem;

  h3 {
    font-size: 0.95rem; 
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.6rem; 
    text-align: left;
    font-weight: 500;
  }

  div { 
    display: flex;
    gap: 0.8rem; 
    width: 100%;
    flex-wrap: wrap; 
  }
`;

export const CuttingOption = styled.label`
  flex: 1; 
  min-width: 140px;
  max-width: calc(50% - 0.4rem); 
  background-color: ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : theme.colors.backgroundCard};
  color: ${({ theme, $selected }) => 
    $selected ? theme.colors.background : theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  padding: 0.8rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600; 
  transition: all 0.2s ease;
  white-space: nowrap; 
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-basis: 100%; 
    max-width: 100%;
    min-width: unset; 
    font-size: 0.85rem; 
    padding: 0.7rem 1rem;
  }
`;


export const VariationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; 
  gap: 0.8rem;
  margin-top: 0.4rem;
  margin-bottom: 1.1rem;

  ${HalfPizzaSelectGroup} + & { 
    margin-top: 1.5rem;
  }
`;

export const VariationOption = styled.label`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  padding: 0.4rem 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600; 
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 40px;
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


  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.94rem;
    padding: 0.35rem 0.7rem;
    min-width: 35px;
  }
`;

export const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 0.5rem;
`;

export const QuantityButton = styled.button`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const QuantityDisplay = styled.span`
  min-width: 32px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  font-weight: 500;
`;

export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
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
    font-size: 1rem;
    padding: 0.9rem 1.8rem;
  }
`;

// CORRIGIDO: Renomeado os styled components para 'adicionais'
export const AdditionalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 0.5rem;
  
  h3 {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.6rem;
    text-align: left;
    font-weight: 500;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
`;

export const AdditionalCheckbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.5rem;
`;

export const AdditionalLabel = styled.label`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  padding: 0.5rem 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${AdditionalCheckbox}:checked + & {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;