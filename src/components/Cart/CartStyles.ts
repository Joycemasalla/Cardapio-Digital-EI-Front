// src/components/Cart/CartStyles.ts - ESTILOS MELHORADOS
import styled from 'styled-components';
import InputMask from 'react-input-mask';

interface CartContainerProps {
  $isOpen: boolean;
}

interface StepIndicatorProps {
  $active: boolean;
  $completed: boolean;
}

export const CartContainer = styled.div<CartContainerProps>`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  width: 100%;
  max-width: 480px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

export const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const CartHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundCard};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

export const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// NOVOS COMPONENTES PARA LAYOUT MELHORADO
export const ItemCard = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ItemHeader = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
`;

export const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ItemMainInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
`;

export const ItemVariation = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 0.25rem 0;
  font-weight: 500;
`;

export const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

export const QuantitySection = styled.div`
  display: flex;
  align-items: center;
`;

export const AdditionalsSection = styled.div`
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.backgroundLight};

  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 0.5rem 0;
  }
`;

export const AdditionalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const AdditionalItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;

  span:first-child {
    flex: 1;
  }

  span:last-child {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PriceLabel = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex: 1;
`;

export const PriceValue = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const PriceBreakdown = styled.div`
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.backgroundLight};
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem;

  &:last-child {
    margin-bottom: 0;
  }

  &.total {
    margin-top: 0.375rem;
    padding-top: 0.375rem;
    border-top: 1px solid ${({ theme }) => theme.colors.backgroundLight};
    font-weight: 600;

    ${PriceLabel}, ${PriceValue} {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.primary};
      font-size: 0.9375rem;
    }
  }
`;

// COMPONENTES EXISTENTES MANTIDOS
export const CartItem = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ItemPrice = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 8px;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const QuantityButton = styled.button`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const QuantityDisplay = styled.span`
  min-width: 28px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.9375rem;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
`;

export const CartFooter = styled.div`
  padding: 1rem;
  margin-bottom: 4rem;
  border-top: 1px solid ${({ theme }) => theme.colors.backgroundCard};
  background-color: ${({ theme }) => theme.colors.backgroundLight};

  .button-group {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

export const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TotalText = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};

  .delivery-fee {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const TotalAmount = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CheckoutButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textDark};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.textSecondary};
  gap: 1rem;
`;

export const EmptyCartText = styled.p`
  margin: 0;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DeliveryOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DeliveryOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 5px rgba(197, 157, 95, 0.5);
  }
`;

export const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledInputMask = styled(InputMask)`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem;
  border-radius: 4px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
  }
`;

export const OrderSteps = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundCard};
`;

export const StepIndicator = styled.div<StepIndicatorProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  background-color: ${({ $active, $completed, theme }) =>
    $active ? theme.colors.primary :
    $completed ? theme.colors.primaryDark :
    theme.colors.backgroundCard
  };
  color: ${({ $active, $completed, theme }) =>
    $active || $completed ? theme.colors.background : theme.colors.textSecondary
  };
  cursor: ${({ $completed }) => $completed ? 'pointer' : 'default'};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ $completed, theme }) =>
      $completed ? theme.colors.primaryDark : ''
    };
  }
`;

export const ClearCartButton = styled.button`
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #cc0000;
  }
`;

export const RadioInput = styled.input`
  margin: 0;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

export const RadioLabel = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;