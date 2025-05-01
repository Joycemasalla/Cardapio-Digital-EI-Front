import styled from 'styled-components';

interface CartContainerProps {
  isOpen: boolean;
}

interface StepIndicatorProps {
  active: boolean;
  completed: boolean;
}

export const CartContainer = styled.div<CartContainerProps>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
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
  gap: 1rem;
`;

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

export const ItemName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const ItemPrice = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const QuantityButton = styled.button`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const QuantityDisplay = styled.span`
  min-width: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  padding: 0.25rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #cc0000;
  }
`;

export const CartFooter = styled.div`
  padding: 1rem;
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
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
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
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
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
  background-color: ${({ active, completed, theme }) => 
    active ? theme.colors.primary : 
    completed ? theme.colors.primaryDark : 
    theme.colors.backgroundCard
  };
  color: ${({ active, completed, theme }) => 
    active || completed ? theme.colors.background : theme.colors.textSecondary
  };
  cursor: ${({ completed }) => completed ? 'pointer' : 'default'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ completed, theme }) => 
      completed ? theme.colors.primaryDark : ''
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

export const StyledInputMask = styled.input`
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