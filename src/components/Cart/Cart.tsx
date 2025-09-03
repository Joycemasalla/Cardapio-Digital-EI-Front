// src/components/Cart/Cart.tsx - CORREÇÕES APLICADAS
import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Send, Trash2, Copy, AlertCircle } from 'lucide-react';
import { useCart, CartItem } from '../../contexts/CartContext';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';

import {
  CartContainer,
  CartHeader,
  CartTitle,
  CloseButton,
  CartContent,
  CartItemsList,
  CartItem as StyledCartItem,
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
  RadioLabel,
  StyledInputMask
} from './CartStyles';
import { formatCurrency } from '../../utils/formatCurrency';

const API_BASE_URL = 'https://cardapio-digital-ei-back.vercel.app';

const Cart: React.FC = () => {
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
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'local' | 'delivery'>('pickup');
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'money',
    change: '',
    notes: ''
  });

  // ... useEffect hooks permanecem inalterados ...
  useEffect(() => {
    const savedInfo = localStorage.getItem('customerInfo');
    if (savedInfo) {
      try {
        const parsedInfo = JSON.parse(savedInfo);
        setCustomerInfo(prev => ({
          ...prev,
          ...parsedInfo,
          phone: parsedInfo.phone || '',
          change: parsedInfo.change || '',
        }));
        if (['pickup', 'local', 'delivery'].includes(parsedInfo.deliveryOption)) {
          setDeliveryOption(parsedInfo.deliveryOption);
        }
      } catch (e) {
        console.error("Falha ao analisar informações do cliente do localStorage", e);
        localStorage.removeItem('customerInfo');
      }
    }
  }, []);

  useEffect(() => {
    if (customerInfo.name || customerInfo.phone || customerInfo.address || customerInfo.notes || customerInfo.paymentMethod !== 'money' || deliveryOption !== 'pickup') {
      localStorage.setItem('customerInfo', JSON.stringify({ ...customerInfo, deliveryOption }));
    } else if (!customerInfo.name && !customerInfo.phone && !customerInfo.address && !customerInfo.notes && customerInfo.paymentMethod === 'money' && deliveryOption === 'pickup') {
      localStorage.removeItem('customerInfo');
    }
  }, [customerInfo, deliveryOption]);

  // 🔥 CORREÇÃO PRINCIPAL: Função para calcular preços separadamente
  const calculateItemPrices = (item: CartItem) => {
    const basePrice = item.selectedVariation?.price || item.price || 0;
    const additionalsPrice = item.selectedAdditionals?.reduce((sum, additional) => sum + additional.price, 0) || 0;
    const totalPrice = basePrice + additionalsPrice;
    
    return {
      basePrice,
      additionalsPrice,
      totalPrice,
      totalPriceWithQuantity: totalPrice * item.quantity
    };
  };

  // 🔥 CORREÇÃO: Cálculo do total usando a nova função
  const totalAmount = cartItems.reduce((sum: number, item: CartItem) => {
    const { totalPriceWithQuantity } = calculateItemPrices(item);
    return sum + totalPriceWithQuantity;
  }, 0);

  const deliveryFee = deliveryOption === 'delivery' ? 2 : 0;
  const finalTotal = totalAmount + deliveryFee;

  const steps = ['Carrinho', 'Entrega', 'Pagamento'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const handleNextStep = () => {
    if (activeStep === 0 && cartItems.length === 0) {
      toast.warn('Seu carrinho está vazio. Adicione itens antes de continuar.');
      return;
    }

    if (activeStep === 1) {
      if (!customerInfo.name.trim()) {
        toast.warn('Por favor, informe seu nome.');
        return;
      }
      if (deliveryOption === 'delivery' && !customerInfo.address.trim()) {
        toast.warn('Por favor, informe o endereço de entrega.');
        return;
      }
    }

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
  
  const handleSubmitOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || (deliveryOption === 'delivery' && !customerInfo.address)) {
      toast.error('Por favor, preencha todos os dados necessários antes de finalizar o pedido.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerInfo.name,
          phone: customerInfo.phone,
          address: customerInfo.address
        }),
      });

      console.log('Status da resposta do servidor:', response.status);
      console.log('Texto do status:', response.statusText);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Falha ao salvar dados do cliente. Status: ${response.status}. Mensagem: ${errorData.message}`);
      }
      
      let message = `*Novo Pedido - Espaço Imperial*\n\n`;
      message += `*Itens do Pedido:*\n`;

      // 🔥 CORREÇÃO PRINCIPAL: Mensagem do WhatsApp com preços separados
      cartItems.forEach((item: CartItem) => {
        const { basePrice, additionalsPrice, totalPriceWithQuantity } = calculateItemPrices(item);
        
        let itemLine = `- ${item.quantity}x `;
        
        if (item.isHalfAndHalf && item.half1 && item.half2 && item.selectedVariation) {
          itemLine += `Pizza ${item.half1.name} / ${item.half2.name} (${item.selectedVariation.name})`;
        } else if (item.selectedVariation) {
          itemLine += `${item.name} (${item.selectedVariation.name})`;
        } else {
          itemLine += `${item.name}`;
        }
        
        if (item.cuttingStyle) {
          itemLine += ` (Corte: ${item.cuttingStyle === 'normal' ? 'Normal' : 'Francesinha'})`;
        }
        
        // 🔥 EXIBE APENAS O PREÇO BASE DO ITEM
        itemLine += ` - ${formatCurrency(basePrice * item.quantity)}\n`;
        message += itemLine;

        // 🔥 EXIBE OS ADICIONAIS SEPARADAMENTE COM SEU PREÇO
        if (item.selectedAdditionals && item.selectedAdditionals.length > 0) {
          const additionalsText = item.selectedAdditionals.map(add => `${add.name} (+${formatCurrency(add.price)})`).join(', ');
          message += `  - Adicionais: ${additionalsText}\n`;
          message += `  - Subtotal Adicionais: ${formatCurrency(additionalsPrice * item.quantity)}\n`;
        }
        
        // 🔥 EXIBE O TOTAL DO ITEM (BASE + ADICIONAIS)
        if (additionalsPrice > 0) {
          message += `  - Total do Item: ${formatCurrency(totalPriceWithQuantity)}\n`;
        }
        
        message += `\n`;
      });

      message += `*Subtotal:* ${formatCurrency(totalAmount)}\n`;
      if (deliveryOption === 'delivery') {
        message += `*Taxa de Entrega:* ${formatCurrency(2)}\n`;
      }
      message += `*Total:* ${formatCurrency(finalTotal)}\n\n`;

      message += `*Forma de Entrega:* ${deliveryOption === 'pickup' ? 'Retirada no Local' :
        deliveryOption === 'local' ? 'Consumo no Local' : 'Entrega'
        }\n\n`;

      message += `*Dados do Cliente:*\n`;
      message += `Nome: ${customerInfo.name}\n`;
      if (customerInfo.phone) {
        message += `Telefone: ${customerInfo.phone}\n`;
      }
      if (deliveryOption === 'delivery') {
        message += `Endereço: ${customerInfo.address}\n`;
      }

      message += `\n*Forma de Pagamento:* ${customerInfo.paymentMethod === 'money' ? 'Dinheiro' :
        customerInfo.paymentMethod === 'card' ? 'Cartão' : 'Pix'
        }\n`;

      if (customerInfo.paymentMethod === 'money' && customerInfo.change) {
        message += `Troco para: ${formatCurrency(parseFloat(customerInfo.change))}\n`;
      }

      if (customerInfo.notes) {
        message += `\n*Observações:* ${customerInfo.notes}\n`;
      }

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/5532988949994?text=${encodedMessage}`, '_blank');
      
      localStorage.setItem('customerInfo', JSON.stringify({ ...customerInfo, deliveryOption }));
      
      clearCart();
      toggleCart();
      toast.success('Pedido enviado com sucesso! Entraremos em contato via WhatsApp.');

    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
      toast.error('Ocorreu um erro ao finalizar seu pedido. Por favor, tente novamente.');
    }
  };

  return (
    <>
      {isCartOpen && <CartOverlay onClick={toggleCart} />}

      <CartContainer $isOpen={isCartOpen}>
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
              $active={index === activeStep}
              $completed={index < activeStep}
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
                  {cartItems.map((item: CartItem) => {
                    // 🔥 CORREÇÃO: Usar a nova função para calcular preços
                    const { basePrice, additionalsPrice, totalPriceWithQuantity } = calculateItemPrices(item);
                    
                    return (
                      <StyledCartItem key={item.id}>
                        <ItemDetails>
                          <ItemInfo>
                            <ItemName>
                              {item.isHalfAndHalf && item.half1 && item.half2 && item.selectedVariation
                                ? `Pizza ${item.half1.name} / ${item.half2.name} (${item.selectedVariation.name})`
                                : item.selectedVariation
                                  ? `${item.name} (${item.selectedVariation.name})`
                                  : item.name}
                              {item.cuttingStyle && ` (Corte: ${item.cuttingStyle === 'normal' ? 'Normal' : 'Francesinha'})`}
                              
                              {/* 🔥 CORREÇÃO: Exibição detalhada dos adicionais */}
                              {item.selectedAdditionals && item.selectedAdditionals.length > 0 && (
                                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#ccc' }}>
                                  <div>Adicionais: {item.selectedAdditionals.map(add => `${add.name} (+${formatCurrency(add.price)})`).join(', ')}</div>
                                  <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#999' }}>
                                    Base: {formatCurrency(basePrice)} | Adicionais: {formatCurrency(additionalsPrice)}
                                  </div>
                                </div>
                              )}
                            </ItemName>
                            
                            {/* 🔥 CORREÇÃO: Exibir preço total por quantidade */}
                            <ItemPrice>
                              {formatCurrency(totalPriceWithQuantity)}
                              {additionalsPrice > 0 && (
                                <div style={{ fontSize: '0.75rem', color: '#ccc', marginTop: '0.25rem' }}>
                                  {formatCurrency(basePrice + additionalsPrice)} × {item.quantity}
                                </div>
                              )}
                            </ItemPrice>
                          </ItemInfo>

                          <QuantityControl>
                            <QuantityButton onClick={() => decrementQuantity(item.id, item.selectedVariation?.name, item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : '')}>-</QuantityButton>
                            <QuantityDisplay>{item.quantity}</QuantityDisplay>
                            <QuantityButton onClick={() => incrementQuantity(item.id, item.selectedVariation?.name, item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : '')}>+</QuantityButton>
                            <RemoveButton onClick={() => removeFromCart(item.id, item.selectedVariation?.name, item.selectedAdditionals ? item.selectedAdditionals.map(a => a.name).sort().join(',') : '')}>
                              <Trash2 size={16} />
                            </RemoveButton>
                          </QuantityControl>
                        </ItemDetails>
                      </StyledCartItem>
                    );
                  })}
                </CartItemsList>
              ) : (
                <EmptyCart>
                  <ShoppingCart size={48} />
                  <EmptyCartText>Seu carrinho está vazio</EmptyCartText>
                </EmptyCart>
              )}
            </>
          )}

          {/* Resto do componente permanece inalterado... */}
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
                  <StyledInputMask
                    mask="(99) 99999-9999"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="(99) 99999-9999"
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
                  <StyledInputMask
                    mask="R$ 999,99"
                    maskChar={null}
                    id="change"
                    name="change"
                    value={customerInfo.change}
                    onChange={handleInputChange}
                    placeholder="R$ 0,00"
                  />
                </FormGroup>
              )}

              {customerInfo.paymentMethod === 'pix' && (
                <>
                  <FormGroup>
                    <Label>Chave Pix</Label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#1f1f1f',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #333',
                      justifyContent: 'space-between',
                      gap: '8px',
                      color: '#fff'
                    }}>
                      <span style={{
                        overflowWrap: 'anywhere',
                        fontSize: '14px',
                        flex: 1
                      }}>
                        seu-email@pix.com
                      </span>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText("seu-email@pix.com");
                          toast.success("Chave Pix copiada com sucesso!");
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#4fd1c5',
                        }}
                        title="Copiar chave Pix"
                      >
                        <Copy />
                      </button>
                    </div>
                  </FormGroup>

                  <div style={{
                    background: '#2d3748',
                    border: '1px solid #4a5568',
                    borderRadius: '8px',
                    padding: '12px',
                    marginTop: '16px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#e2e8f0'
                  }}>
                    <AlertCircle size={20} style={{ color: '#4fd1c5', minWidth: '20px' }} />
                    <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                      <strong>Importante:</strong> Após realizar o pagamento, não se esqueça de enviar o comprovante do PIX via WhatsApp para confirmar seu pedido.
                    </div>
                  </div>
                </>
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
                    <span className="delivery-fee"> (+ taxa de entrega {formatCurrency(2)})</span>
                  )}
                </TotalText>
                <TotalAmount>
                  {formatCurrency(activeStep > 0 ? finalTotal : totalAmount)}
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
                      !customerInfo.name.trim() ||
                      (deliveryOption === 'delivery' && !customerInfo.address.trim())
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