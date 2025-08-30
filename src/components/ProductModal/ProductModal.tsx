// src/components/ProductModal/ProductModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product, ProductVariation, useProducts } from '../../contexts/ProductContext';
import { CartItem } from '../../contexts/CartContext';
import { toast } from 'react-toastify';

import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  ModalContent,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  VariationsContainer,
  VariationOption,
  QuantityControl,
  QuantityButton,
  QuantityDisplay,
  AddButton,
  ProductActions,
  PizzaModeSelector,
  PizzaModeButton,
  CuttingOptionsContainer,
  CuttingOption,
  HalfPizzaSelectGroup,
} from './ProductModalStyles';
import {
  CustomSelectContainer as GlobalCustomSelectContainer,
  SelectButton as GlobalSelectButton,
  DropdownList as GlobalDropdownList,
  DropdownItem as GlobalDropdownItem,
  SelectLabel as GlobalSelectLabel,
  ChevronIcon as GlobalChevronIcon
} from '../../pages/PageStyles';
import theme from '../../styles/theme';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  initialPizzaMode?: 'normal' | 'half-and-half';
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, initialPizzaMode }) => {
  const { addToCart } = useCart();
  const { products: allProducts } = useProducts();

  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [selectedHalf1, setSelectedHalf1] = useState<Product | null>(null);
  const [selectedHalf2, setSelectedHalf2] = useState<Product | null>(null);
  const [pizzaMode, setPizzaMode] = useState<'normal' | 'half-and-half'>('normal');
  const [cuttingStyle, setCuttingStyle] = useState<'normal' | 'francesinha'>('normal');

  const isPizzaCategory = product?.category === 'Pizzas' || product?.category === 'Pizzas Doces';
  const availablePizzaFlavors = allProducts.filter(p => p.category === 'Pizzas' || p.category === 'Pizzas Doces');
  const hasAvailableVariations = product?.variations && product.variations.length > 0;
  
  // CORRIGIDO: Definindo a variável isLargePizzaSelected
  const isLargePizzaSelected = isPizzaCategory && selectedVariation?.name === 'Grande';

  const half1SelectRef = useRef<HTMLDivElement>(null);
  const half2SelectRef = useRef<HTMLDivElement>(null);
  const [isHalf1DropdownOpen, setIsHalf1DropdownOpen] = useState(false);
  const [isHalf2DropdownOpen, setIsHalf2DropdownOpen] = useState(false);

  // Click outside logic for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (half1SelectRef.current && !half1SelectRef.current.contains(event.target as Node)) {
        setIsHalf1DropdownOpen(false);
      }
      if (half2SelectRef.current && !half2SelectRef.current.contains(event.target as Node)) {
        setIsHalf2DropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // CORRIGIDO: useEffect principal para configuração inicial
  useEffect(() => {
    if (product) {
      setQuantity(1);
      if (isPizzaCategory) {
        // Se vier com modo meia a meia, configura direto para esse modo
        if (initialPizzaMode === 'half-and-half') {
          const grandeVariation = product.variations?.find(v => v.name === 'Grande');
          if (grandeVariation) {
            setSelectedVariation(grandeVariation);
          }
          setPizzaMode('half-and-half');
          setSelectedHalf1(null);
          setSelectedHalf2(null);
          setCuttingStyle('normal');
        } else {
          // Comportamento normal
          setPizzaMode('normal');
          setSelectedHalf1(product);
          setSelectedHalf2(null);
          setCuttingStyle('normal');
          if (product.variations && product.variations.length > 0) {
            setSelectedVariation(product.variations[0]);
          }
        }
      } else {
        // Para produtos que não são pizza
        if (hasAvailableVariations) {
          setSelectedVariation(product.variations![0]);
        } else {
          setSelectedVariation(null);
        }
      }
    }
  }, [product, isPizzaCategory, hasAvailableVariations, initialPizzaMode]);

  // CORRIGIDO: useEffect simplificado para controle do modo
  useEffect(() => {
    if (isPizzaCategory && pizzaMode === 'normal') {
      setSelectedHalf1(product);
      setSelectedHalf2(null);
    } else if (isPizzaCategory && pizzaMode === 'half-and-half') {
      // Se não estiver vindo do modo inicial, limpa as seleções
      if (initialPizzaMode !== 'half-and-half') {
        setSelectedHalf1(null);
        setSelectedHalf2(null);
      }
    }
  }, [pizzaMode, product, isPizzaCategory, initialPizzaMode]);

  const getPriceForVariation = (item: Product, variationName: string): number => {
    const variation = item.variations?.find(v => v.name === variationName);
    return variation ? variation.price : 0;
  };

  const calculateHalfAndHalfPrice = (): number => {
    if (!selectedHalf1 || !selectedHalf2 || !selectedVariation) return 0;

    const priceHalf1 = getPriceForVariation(selectedHalf1, selectedVariation.name);
    const priceHalf2 = getPriceForVariation(selectedHalf2, selectedVariation.name);

    return Math.max(priceHalf1, priceHalf2);
  };

  const currentItemPrice = isPizzaCategory && pizzaMode === 'half-and-half'
    ? calculateHalfAndHalfPrice()
    : (selectedVariation?.price || product?.price || 0);

  const finalPrice = currentItemPrice * quantity;

  let isAddButtonEnabled = false;
  if (isPizzaCategory) {
    if (pizzaMode === 'normal') {
      isAddButtonEnabled = selectedVariation !== null && currentItemPrice > 0;
    } else {
      isAddButtonEnabled = selectedHalf1 !== null && selectedHalf2 !== null && selectedVariation !== null && currentItemPrice > 0;
    }
  } else {
    isAddButtonEnabled = currentItemPrice > 0;
  }

  const handleAddToCart = () => {
    if (!isAddButtonEnabled) {
      toast.error('Por favor, complete a seleção do produto.');
      return;
    }

    if (isPizzaCategory && pizzaMode === 'half-and-half' && selectedHalf1 && selectedHalf2 && selectedVariation) {
      const halfAndHalfProduct: CartItem = {
        ...product!,
        id: `half-${selectedHalf1.id}-${selectedHalf2.id}-${selectedVariation.name}-${cuttingStyle}`,
        name: `Pizza ${selectedHalf1.name} / ${selectedHalf2.name}`,
        description: `Meio ${selectedHalf1.name} e Meio ${selectedHalf2.name}. Tamanho: ${selectedVariation.name}. Corte: ${cuttingStyle === 'normal' ? 'Normal' : 'Francesinha'}.`,
        category: product!.category,
        price: currentItemPrice,
        image: product!.image || selectedHalf1.image,
        variations: product!.variations,
        quantity: 1,
        selectedVariation: selectedVariation,
        isHalfAndHalf: true,
        half1: { id: selectedHalf1.id, name: selectedHalf1.name, price: getPriceForVariation(selectedHalf1, selectedVariation.name) },
        half2: { id: selectedHalf2.id, name: selectedHalf2.name, price: getPriceForVariation(selectedHalf2, selectedVariation.name) },
        cuttingStyle: cuttingStyle
      };
      for (let i = 0; i < quantity; i++) {
        addToCart(halfAndHalfProduct, selectedVariation);
      }
      onClose();
      return;
    } else if (product && selectedVariation) {
      const itemToAdd: CartItem = {
        ...product,
        quantity: 1,
        cuttingStyle: isPizzaCategory ? cuttingStyle : undefined
      };
      if (isPizzaCategory) {
        itemToAdd.description = `${itemToAdd.description || ''} Corte: ${cuttingStyle === 'normal' ? 'Normal' : 'Francesinha'}.`.trim();
        itemToAdd.id = `${itemToAdd.id}-${selectedVariation.name}-${cuttingStyle}`;
      }
      for (let i = 0; i < quantity; i++) {
        addToCart(itemToAdd, selectedVariation);
      }
      onClose();
      return;
    } else if (product) {
      const itemToAdd: CartItem = { ...product, quantity: 1 };
      for (let i = 0; i < quantity; i++) {
        addToCart(itemToAdd, undefined);
      }
      onClose();
      return;
    }
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!product) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>

        <ModalContent>
          {product.image && <ProductImage src={product.image} alt={product.name} />}
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description || 'Descrição não disponível.'}</ProductDescription>

            {/* Mensagem informativa sobre a opção Meia a Meia */}
            {isPizzaCategory && !isLargePizzaSelected && hasAvailableVariations && pizzaMode === 'normal' && (
              <p style={{
                fontSize: '0.85rem',
                color: theme.colors.textSecondary,
                textAlign: 'center',
                marginBottom: '1rem',
                padding: '0 0.5rem'
              }}>
                A opção "Meia a Meia" está disponível apenas para a pizza **Grande**.
              </p>
            )}

            {/* Seletor de modo da pizza */}
            {isPizzaCategory && (
              <PizzaModeSelector>
                <PizzaModeButton
                  $selected={pizzaMode === 'normal'}
                  onClick={() => setPizzaMode('normal')}
                >
                  Pizza Inteira
                </PizzaModeButton>
                {(isLargePizzaSelected || pizzaMode === 'half-and-half') && (
                  <PizzaModeButton
                    $selected={pizzaMode === 'half-and-half'}
                    onClick={() => setPizzaMode('half-and-half')}
                  >
                    Meia a Meia
                  </PizzaModeButton>
                )}
              </PizzaModeSelector>
            )}

            {/* Seleção de sabores para meia a meia */}
            {isPizzaCategory && pizzaMode === 'half-and-half' ? (
              <HalfPizzaSelectGroup>
                <GlobalCustomSelectContainer ref={half1SelectRef}>
                  <GlobalSelectLabel>1ª Metade</GlobalSelectLabel>
                  <GlobalSelectButton
                    className={isHalf1DropdownOpen ? 'open' : ''}
                    onClick={() => setIsHalf1DropdownOpen(!isHalf1DropdownOpen)}
                  >
                    <span>{selectedHalf1?.name || 'Selecione a 1ª Metade'}</span>
                    <GlobalChevronIcon className={isHalf1DropdownOpen ? 'rotated' : ''}>
                      <ChevronDown size={20} />
                    </GlobalChevronIcon>
                  </GlobalSelectButton>
                  {isHalf1DropdownOpen && (
                    <GlobalDropdownList>
                      {availablePizzaFlavors.map(pizza => (
                        <GlobalDropdownItem
                          key={pizza.id}
                          onClick={() => { setSelectedHalf1(pizza); setIsHalf1DropdownOpen(false); }}
                          className={selectedHalf1?.id === pizza.id ? 'selected' : ''}
                        >
                          {pizza.name}
                        </GlobalDropdownItem>
                      ))}
                    </GlobalDropdownList>
                  )}
                </GlobalCustomSelectContainer>

                <GlobalCustomSelectContainer ref={half2SelectRef}>
                  <GlobalSelectLabel>2ª Metade</GlobalSelectLabel>
                  <GlobalSelectButton
                    className={isHalf2DropdownOpen ? 'open' : ''}
                    onClick={() => setIsHalf2DropdownOpen(!isHalf2DropdownOpen)}
                  >
                    <span>{selectedHalf2?.name || 'Selecione a 2ª Metade'}</span>
                    <GlobalChevronIcon className={isHalf2DropdownOpen ? 'rotated' : ''}>
                      <ChevronDown size={20} />
                    </GlobalChevronIcon>
                  </GlobalSelectButton>
                  {isHalf2DropdownOpen && (
                    <GlobalDropdownList>
                      {availablePizzaFlavors.map(pizza => (
                        <GlobalDropdownItem
                          key={pizza.id}
                          onClick={() => { setSelectedHalf2(pizza); setIsHalf2DropdownOpen(false); }}
                          className={selectedHalf2?.id === pizza.id ? 'selected' : ''}
                        >
                          {pizza.name}
                        </GlobalDropdownItem>
                      ))}
                    </GlobalDropdownList>
                  )}
                </GlobalCustomSelectContainer>
              </HalfPizzaSelectGroup>
            ) : (
              /* Seleção de tamanhos para pizza inteira ou produtos normais */
              hasAvailableVariations && (
                <VariationsContainer>
                  {product.variations!.map((variation) => (
                    <VariationOption
                      key={variation.name}
                      $selected={selectedVariation?.name === variation.name}
                    >
                      <input
                        type="radio"
                        name={`modal-variation-${product.id}`}
                        value={variation.name}
                        checked={selectedVariation?.name === variation.name}
                        onChange={() => setSelectedVariation(variation)}
                      />
                      {variation.name} (R$ {getPriceForVariation(product, variation.name).toFixed(2).replace('.', ',')})
                    </VariationOption>
                  ))}
                </VariationsContainer>
              )
            )}

            {/* Opções de corte para pizza */}
            {isPizzaCategory && (
              <CuttingOptionsContainer>
                <h3>Forma de Corte:</h3>
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <CuttingOption
                    $selected={cuttingStyle === 'normal'}
                    onClick={() => setCuttingStyle('normal')}
                  >
                    <input
                      type="radio"
                      name="cutting-style"
                      value="normal"
                      checked={cuttingStyle === 'normal'}
                      onChange={() => setCuttingStyle('normal')}
                      style={{ display: 'none' }}
                    />
                    Corte Normal (Fatias)
                  </CuttingOption>
                  <CuttingOption
                    $selected={cuttingStyle === 'francesinha'}
                    onClick={() => setCuttingStyle('francesinha')}
                  >
                    <input
                      type="radio"
                      name="cutting-style"
                      value="francesinha"
                      checked={cuttingStyle === 'francesinha'}
                      onChange={() => setCuttingStyle('francesinha')}
                      style={{ display: 'none' }}
                    />
                    Francesinha (Quadrados)
                  </CuttingOption>
                </div>
              </CuttingOptionsContainer>
            )}

            {/* Preço para produtos sem variações */}
            {!hasAvailableVariations && !isPizzaCategory && (
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#c59d5f' }}>
                R$ {product.price?.toFixed(2).replace('.', ',')}
              </p>
            )}

            {/* Controles finais */}
            <ProductActions>
              <QuantityControl>
                <QuantityButton onClick={handleDecrement}>-</QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={handleIncrement}>+</QuantityButton>
              </QuantityControl>
              <AddButton
                onClick={handleAddToCart}
                disabled={!isAddButtonEnabled}
              >
                <Plus size={20} />
                Adicionar R$ {finalPrice.toFixed(2).replace('.', ',')}
              </AddButton>
            </ProductActions>
          </ProductInfo>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProductModal;