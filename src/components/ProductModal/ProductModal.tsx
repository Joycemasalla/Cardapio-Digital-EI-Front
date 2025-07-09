// src/components/ProductModal/ProductModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react'; // ChevronDown para select customizado
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
  HalfPizzaSelectGroup, // GARANTIDO: Exportado e importado corretamente
} from './ProductModalStyles';
import { // Importa com alias para não conflitar com nomes locais
  CustomSelectContainer as GlobalCustomSelectContainer,
  SelectButton as GlobalSelectButton,
  DropdownList as GlobalDropdownList,
  DropdownItem as GlobalDropdownItem,
  SelectLabel as GlobalSelectLabel,
  ChevronIcon as GlobalChevronIcon // Certifique-se que ChevronIcon está importado
} from '../../pages/PageStyles';


interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
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


  useEffect(() => {
    if (product) {
      setQuantity(1);
      if (isPizzaCategory) {
        setPizzaMode('normal'); 
        setSelectedHalf1(product); 
        setSelectedHalf2(null); 
        setCuttingStyle('normal');
        if (product.variations && product.variations.length > 0) {
            setSelectedVariation(product.variations[0]); 
        }
      } else {
        if (hasAvailableVariations) {
          setSelectedVariation(product.variations![0]);
        } else {
          setSelectedVariation(null);
        }
      }
    }
  }, [product, isPizzaCategory, hasAvailableVariations]);

  useEffect(() => {
    if (isPizzaCategory) {
      if (pizzaMode === 'normal') {
        setSelectedHalf1(product); 
        setSelectedHalf2(null);
      } else { 
        setSelectedHalf1(null);
        setSelectedHalf2(null);
      }
    }
  }, [pizzaMode, product, isPizzaCategory]);


  const calculateHalfAndHalfPrice = (): number => {
    if (!selectedHalf1 || !selectedHalf2 || !selectedVariation) return 0;

    const getPriceForVariation = (pizza: Product, variationName: string): number => {
      const variation = pizza.variations?.find(v => v.name === variationName);
      return variation ? variation.price : 0;
    };

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
        toast.success(`${quantity}x Pizza ${halfAndHalfProduct.name} adicionada(s)!`); 
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
        toast.success(`${quantity}x ${itemToAdd.name} (${selectedVariation.name}) adicionado(s)!`); 
        onClose();
        return;
    } else if (product) {
        const itemToAdd: CartItem = { ...product, quantity: 1 };
        for (let i = 0; i < quantity; i++) {
            addToCart(itemToAdd, undefined);
        }
        toast.success(`${quantity}x ${itemToAdd.name} adicionado(s)!`); 
        onClose();
        return;
    }
  };


  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!product) return null;

  const getPriceForVariation = (item: Product, variationName: string): number => {
    const variation = item.variations?.find(v => v.name === variationName);
    return variation ? variation.price : 0;
  };


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

            {isPizzaCategory && (
                <PizzaModeSelector>
                    <PizzaModeButton 
                        $selected={pizzaMode === 'normal'} 
                        onClick={() => setPizzaMode('normal')}
                    >
                        Pizza Inteira
                    </PizzaModeButton>
                    <PizzaModeButton 
                        $selected={pizzaMode === 'half-and-half'} 
                        onClick={() => setPizzaMode('half-and-half')}
                    >
                        Meia a Meia
                    </PizzaModeButton>
                </PizzaModeSelector>
            )}

            {isPizzaCategory && pizzaMode === 'half-and-half' ? (
                <HalfPizzaSelectGroup> {/* Este é apenas um div container para os dois selects */}
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
                hasAvailableVariations && (
                    <VariationsContainer>
                        {product.variations!.map((variation, index) => (
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
            
            {!hasAvailableVariations && !isPizzaCategory && ( 
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#c59d5f' }}>
                    R$ {product.price?.toFixed(2).replace('.', ',')}
                </p>
            )}

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
                    <Plus size={20} /> {/* Ícone de adicionar no botão */}
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