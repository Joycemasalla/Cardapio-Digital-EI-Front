import React, { useState } from 'react';
import { X, ShoppingCart, Send, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { 
  CartContainer, 
  CartHeader, 
  CartTitle, 
  CloseButton,
  CartContent,
  CartItemsList,
  CartItem,
  ItemInfo,
  ItemName,
  ItemPrice,
  QuantityControl,
  QuantityButton,
  QuantityDisplay,
  RemoveButton,
  CartFooter,
  CartTotal,
  TotalText,
  TotalAmount,
  CheckoutButton,
  EmptyCart,
  EmptyCartText,
  CartOverlay,
  ItemDetails,
  DeliveryOptions,
  DeliveryOption,
  CheckoutForm,
  FormGroup,
  Label,
  Input,
  Textarea,
  OrderSteps,
  StepIndicator,
  ClearCartButton,
  RadioInput,
  RadioLabel
} from './CartStyles';

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    incrementQuantity, 
    decrementQuantity, 
    removeFromCart,
    clearCart
  } = useCart();
  
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'money',
    change: '',
    notes: ''
  });
  
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  const deliveryFee = deliveryOption === 'delivery' ? 2 : 0;
  const finalTotal = totalAmount + deliveryFee;
  
  const steps = ['Carrinho', 'Entrega', 'Pagamento'];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };
  
  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmitOrder();
    }
  };
  
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const handleSubmitOrder = () => {
    // Format the WhatsApp message
    let message = `*Novo Pedido - Espaço Imperial*\n\n`;
    message += `*Itens do Pedido:*\n`;
    
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    
    message += `\n*Subtotal:* R$ ${totalAmount.toFixed(2).replace('.', ',')}\n`;
    
    if (deliveryOption === 'delivery') {
      message += `*Taxa de Entrega:* R$ 2,00\n`;
    }
    
    message += `*Total:* R$ ${finalTotal.toFixed(2).replace('.', ',')}\n\n`;
    
    message += `*Forma de Entrega:* ${
      deliveryOption === 'pickup' ? 'Retirada no Local' : 
      deliveryOption === 'local' ? 'Consumo no Local' : 'Entrega'
    }\n\n`;
    
    message += `*Dados do Cliente:*\n`;
    message += `Nome: ${customerInfo.name}\n`;
    message += `Telefone: ${customerInfo.phone}\n`;
    
    if (deliveryOption === 'delivery') {
      message += `Endereço: ${customerInfo.address}\n`;
    }
    
    message += `\n*Forma de Pagamento:* ${
      customerInfo.paymentMethod === 'money' ? 'Dinheiro' : 
      customerInfo.paymentMethod === 'card' ? 'Cartão' : 'Pix'
    }\n`;
    
    if (customerInfo.paymentMethod === 'money' && customerInfo.change) {
      message += `Troco para: R$ ${customerInfo.change}\n`;
    }
    
    if (customerInfo.notes) {
      message += `\n*Observações:* ${customerInfo.notes}\n`;
    }
    
    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
    
    // Clear cart and close it
    clearCart();
    toggleCart();
  };
  
  return (
    <>
      {isCartOpen && <CartOverlay onClick={toggleCart} />}
      
      <CartContainer isOpen={isCartOpen}>
        <CartHeader>
          <CartTitle>
            <ShoppingCart size={20} />
            {steps[activeStep]}
          </CartTitle>
          <CloseButton onClick={toggleCart}>
            <X size={20} />
          </CloseButton>
        </CartHeader>
        
        <OrderSteps>
          {steps.map((step, index) => (
            <StepIndicator 
              key={index}
              active={index === activeStep}
              completed={index < activeStep}
              onClick={() => {
                if (index < activeStep) {
                  setActiveStep(index);
                }
              }}
            >
              {index + 1}
            </StepIndicator>
          ))}
        </OrderSteps>
        
        <CartContent>
          {activeStep === 0 && (
            <>
              {cartItems.length > 0 ? (
                <CartItemsList>
                  {cartItems.map(item => (
                    <CartItem key={item.id}>
                      <ItemDetails>
                        <ItemInfo>
                          <ItemName>{item.name}</ItemName>
                          <ItemPrice>
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </ItemPrice>
                        </ItemInfo>
                        
                        <QuantityControl>
                          <QuantityButton onClick={() => decrementQuantity(item.id)}>-</QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton onClick={() => incrementQuantity(item.id)}>+</QuantityButton>
                          <RemoveButton onClick={() => removeFromCart(item.id)}>
                            <Trash2 size={16} />
                          </RemoveButton>
                        </QuantityControl>
                      </ItemDetails>
                    </CartItem>
                  ))}
                </CartItemsList>
              ) : (
                <EmptyCart>
                  <ShoppingCart size={48} />
                  <EmptyCartText>Seu carrinho está vazio</EmptyCartText>
                </EmptyCart>
              )}
            </>
          )}
          
          {activeStep === 1 && (
            <DeliveryOptions>
              <DeliveryOption>
                <RadioInput 
                  type="radio" 
                  id="pickup" 
                  name="deliveryOption" 
                  value="pickup"
                  checked={deliveryOption === 'pickup'}
                  onChange={() => setDeliveryOption('pickup')}
                />
                <RadioLabel htmlFor="pickup">Retirada no Local</RadioLabel>
              </DeliveryOption>
              
              <DeliveryOption>
                <RadioInput 
                  type="radio" 
                  id="local" 
                  name="deliveryOption" 
                  value="local"
                  checked={deliveryOption === 'local'}
                  onChange={() => setDeliveryOption('local')}
                />
                <RadioLabel htmlFor="local">Consumo no Local</RadioLabel>
              </DeliveryOption>
              
              <DeliveryOption>
                <RadioInput 
                  type="radio" 
                  id="delivery" 
                  name="deliveryOption" 
                  value="delivery"
                  checked={deliveryOption === 'delivery'}
                  onChange={() => setDeliveryOption('delivery')}
                />
                <RadioLabel htmlFor="delivery">Entrega (+R$ 2,00)</RadioLabel>
              </DeliveryOption>
              
              <CheckoutForm>
                <FormGroup>
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                {deliveryOption === 'delivery' && (
                  <FormGroup>
                    <Label htmlFor="address">Endereço de Entrega</Label>
                    <Textarea 
                      id="address" 
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                )}
              </CheckoutForm>
            </DeliveryOptions>
          )}
          
          {activeStep === 2 && (
            <CheckoutForm>
              <FormGroup>
                <Label>Forma de Pagamento</Label>
                <DeliveryOption>
                  <RadioInput 
                    type="radio" 
                    id="money" 
                    name="paymentMethod" 
                    value="money"
                    checked={customerInfo.paymentMethod === 'money'}
                    onChange={handleInputChange}
                  />
                  <RadioLabel htmlFor="money">Dinheiro</RadioLabel>
                </DeliveryOption>
                
                <DeliveryOption>
                  <RadioInput 
                    type="radio" 
                    id="card" 
                    name="paymentMethod" 
                    value="card"
                    checked={customerInfo.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <RadioLabel htmlFor="card">Cartão</RadioLabel>
                </DeliveryOption>
                
                <DeliveryOption>
                  <RadioInput 
                    type="radio" 
                    id="pix" 
                    name="paymentMethod" 
                    value="pix"
                    checked={customerInfo.paymentMethod === 'pix'}
                    onChange={handleInputChange}
                  />
                  <RadioLabel htmlFor="pix">Pix</RadioLabel>
                </DeliveryOption>
              </FormGroup>
              
              {customerInfo.paymentMethod === 'money' && (
                <FormGroup>
                  <Label htmlFor="change">Troco para</Label>
                  <Input 
                    type="text" 
                    id="change" 
                    name="change"
                    value={customerInfo.change}
                    onChange={handleInputChange}
                    placeholder="R$ 0,00"
                  />
                </FormGroup>
              )}
              
              <FormGroup>
                <Label htmlFor="notes">Observações</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  placeholder="Ex: Sem cebola, bem passado, etc."
                />
              </FormGroup>
            </CheckoutForm>
          )}
        </CartContent>
        
        <CartFooter>
          {cartItems.length > 0 && (
            <>
              <CartTotal>
                <TotalText>
                  Total
                  {deliveryOption === 'delivery' && activeStep > 0 && (
                    <span className="delivery-fee"> (+ taxa de entrega R$ 2,00)</span>
                  )}
                </TotalText>
                <TotalAmount>
                  R$ {activeStep > 0 ? finalTotal.toFixed(2).replace('.', ',') : totalAmount.toFixed(2).replace('.', ',')}
                </TotalAmount>
              </CartTotal>
              
              <div className="button-group">
                {activeStep > 0 && (
                  <ClearCartButton onClick={handlePrevStep}>
                    Voltar
                  </ClearCartButton>
                )}
                
                {activeStep === 0 && (
                  <ClearCartButton onClick={clearCart}>
                    <Trash2 size={16} />
                    Limpar
                  </ClearCartButton>
                )}
                
                <CheckoutButton 
                  onClick={handleNextStep}
                  disabled={
                    (activeStep === 0 && cartItems.length === 0) ||
                    (activeStep === 1 && (
                      !customerInfo.name || 
                      !customerInfo.phone || 
                      (deliveryOption === 'delivery' && !customerInfo.address)
                    ))
                  }
                >
                  {activeStep === steps.length - 1 ? (
                    <>
                      <Send size={16} />
                      Enviar Pedido
                    </>
                  ) : (
                    'Continuar'
                  )}
                </CheckoutButton>
              </div>
            </>
          )}
        </CartFooter>
      </CartContainer>
    </>
  );
};

export default Cart;