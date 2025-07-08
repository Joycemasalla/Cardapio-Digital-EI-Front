// src/components/ProductModal/ProductModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
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
  // NOVO: Componentes para estilizar selects nativos
  HalfPizzaSelectGroup,
  HalfPizzaSelect,
  PizzaModeSelector,
  PizzaModeButton
} from './ProductModalStyles';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { products: allProducts } = useProducts();
  
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [quantity, setQuantity] = useState(1);

  // NOVO: Estado para a seleção das metades da pizza e o modo (inteira/meia a meia)
  const [selectedHalf1, setSelectedHalf1] = useState<Product | null>(null);
  const [selectedHalf2, setSelectedHalf2] = useState<Product | null>(null);
  const [pizzaMode, setPizzaMode] = useState<'normal' | 'half-and-half'>('normal'); // 'normal' por padrão

  const isPizzaCategory = product?.category === 'Pizzas';
  const availablePizzaFlavors = allProducts.filter(p => p.category === 'Pizzas');

  const hasAvailableVariations = product?.variations && product.variations.length > 0;

  useEffect(() => {
    // Ao abrir o modal ou mudar o produto
    if (product) {
      setQuantity(1);
      // Se for uma pizza, define o modo inicial como normal e reseta seleções
      if (isPizzaCategory) {
        setPizzaMode('normal'); // Começa sempre como 'normal' para pizzas
        setSelectedHalf1(product); // No modo normal, a "primeira metade" é a própria pizza
        setSelectedHalf2(null); // Sem segunda metade
        if (product.variations && product.variations.length > 0) {
            setSelectedVariation(product.variations[0]); // Seleciona o primeiro tamanho
        }
      } else {
        // Se não for pizza, seleciona a primeira variação padrão se houver
        if (hasAvailableVariations) {
          setSelectedVariation(product.variations![0]);
        } else {
          setSelectedVariation(null);
        }
      }
    }
  }, [product, isPizzaCategory, hasAvailableVariations]);

  // NOVO: useEffect para ajustar selectedHalf1/2 quando o modo de pizza muda
  useEffect(() => {
    if (isPizzaCategory) {
      if (pizzaMode === 'normal') {
        setSelectedHalf1(product); // No modo normal, a primeira metade é a própria pizza clicada
        setSelectedHalf2(null);
      } else { // 'half-and-half'
        // Reseta as seleções de metade se o usuário mudar para "meia a meia"
        setSelectedHalf1(null);
        setSelectedHalf2(null);
      }
    }
  }, [pizzaMode, product, isPizzaCategory]);


  // Lógica para calcular o preço da pizza "meio a meio"
  const calculateHalfAndHalfPrice = (): number => {
    if (!selectedHalf1 || !selectedHalf2 || !selectedVariation) return 0;

    const getPriceForVariation = (pizza: Product, variationName: string): number => {
      const variation = pizza.variations?.find(v => v.name === variationName);
      return variation ? variation.price : 0;
    };

    const priceHalf1 = getPriceForVariation(selectedHalf1, selectedVariation.name);
    const priceHalf2 = getPriceForVariation(selectedHalf2, selectedVariation.name);

    return Math.max(priceHalf1, priceHalf2); // Preço baseado na metade de maior valor
  };

  // Preço a ser exibido e usado para adicionar ao carrinho
  const currentItemPrice = isPizzaCategory && pizzaMode === 'half-and-half'
    ? calculateHalfAndHalfPrice() // Se for pizza e meio a meio, calcula
    : (selectedVariation?.price || product?.price || 0); // Senão, usa variação ou preço base

  const finalPrice = currentItemPrice * quantity;

  // Habilitar o botão "Adicionar"
  let isAddButtonEnabled = false;
  if (isPizzaCategory) {
    if (pizzaMode === 'normal') {
      isAddButtonEnabled = selectedVariation !== null && currentItemPrice > 0;
    } else { // 'half-and-half'
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
            ...product!, // Usa o produto original (base da pizza) como base
            id: `half-${selectedHalf1.id}-${selectedHalf2.id}-${selectedVariation.name}`, // ID único para o combo
            name: `Pizza ${selectedHalf1.name} / ${selectedHalf2.name}`, // Nome formatado
            description: `Meio ${selectedHalf1.name} e Meio ${selectedHalf2.name}. Tamanho: ${selectedVariation.name}.`,
            category: 'Pizzas',
            price: currentItemPrice, // Preço calculado
            image: product.image || selectedHalf1.image, // Usa a imagem do produto original ou da primeira metade
            variations: product.variations,
            quantity: 1,
            selectedVariation: selectedVariation,
            isHalfAndHalf: true,
            half1: { id: selectedHalf1.id, name: selectedHalf1.name, price: getPriceForVariation(selectedHalf1, selectedVariation.name) },
            half2: { id: selectedHalf2.id, name: selectedHalf2.name, price: getPriceForVariation(selectedHalf2, selectedVariation.name) }
        };
        for (let i = 0; i < quantity; i++) {
            addToCart(halfAndHalfProduct, selectedVariation);
        }
        toast.success(`${quantity}x Pizza ${selectedHalf1.name} / ${selectedHalf2.name} adicionada(s)!`);
        onClose();
        return;

    } else if (product && selectedVariation) {
        // Lógica para produtos normais (incluindo pizzas inteiras) com variação
        const itemToAdd: CartItem = { ...product, quantity: 1 };
        for (let i = 0; i < quantity; i++) {
            addToCart(itemToAdd, selectedVariation);
        }
        toast.success(`${quantity}x ${product.name} (${selectedVariation.name}) adicionado(s)!`);
        onClose();
        return;
    } else if (product) {
        // Lógica para produtos normais (não pizzas) sem variação (preço base)
        const itemToAdd: CartItem = { ...product, quantity: 1 };
        for (let i = 0; i < quantity; i++) {
            addToCart(itemToAdd, undefined);
        }
        toast.success(`${quantity}x ${product.name} adicionado(s)!`);
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
                // Interface para Meia a Meia
                <HalfPizzaSelectGroup>
                    <HalfPizzaSelect
                        value={selectedHalf1 ? selectedHalf1.id : ''}
                        onChange={(e) => setSelectedHalf1(availablePizzaFlavors.find(p => p.id === e.target.value) || null)}
                    >
                        <option value="">Selecione a 1ª Metade</option>
                        {availablePizzaFlavors.map(pizza => (
                            <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
                        ))}
                    </HalfPizzaSelect>
                    <HalfPizzaSelect
                        value={selectedHalf2 ? selectedHalf2.id : ''}
                        onChange={(e) => setSelectedHalf2(availablePizzaFlavors.find(p => p.id === e.target.value) || null)}
                    >
                        <option value="">Selecione a 2ª Metade</option>
                        {availablePizzaFlavors.map(pizza => (
                            <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
                        ))}
                    </HalfPizzaSelect>
                </HalfPizzaSelectGroup>
            ) : (
                // Interface para produtos normais (incluindo Pizzas Inteiras) ou outros produtos
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
                            {variation.name} (R$ {getPriceForVariation(product, variation.name).toFixed(2).replace('.', ',')}) {/* Usar 'product' aqui */}
                        </VariationOption>
                        ))}
                    </VariationsContainer>
                )
            )}
            
            {!hasAvailableVariations && !isPizzaCategory && ( // Para produtos sem variações e não-pizzas
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
                    <Plus size={16} /> Adicionar R$ {finalPrice.toFixed(2).replace('.', ',')}
                </AddButton>
            </ProductActions>
          </ProductInfo>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProductModal;