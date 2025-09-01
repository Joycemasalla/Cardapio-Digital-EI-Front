// src/components/ProductCard/ProductCard.tsx
import React, { useState, useEffect } from 'react';
import {
  CardContainer,
  ImageContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
  AddButton,
  VariationsContainer,
  VariationOption,
  // NOVO: Importa componentes para o modal de escolha
  PizzaChoiceModal,
  PizzaChoiceOverlay,
  PizzaChoiceContainer,
  PizzaChoiceTitle,
  PizzaChoiceButton,
  PizzaChoiceButtons,
} from './ProductCardStyles';
import { Plus, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product, ProductVariation } from '../../contexts/ProductContext';
import { CartItem } from '../../contexts/CartContext';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
  isListView?: boolean;
  onProductClick?: (product: Product, initialMode?: 'normal' | 'half-and-half') => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isListView = false, onProductClick }) => {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [showPizzaChoice, setShowPizzaChoice] = useState(false); // NOVO: Estado para controlar o modal de escolha
  const { addToCart } = useCart();

  const hasAvailableVariations = product.variations && product.variations.length > 0;
  const isPizzaCategory = product.category === 'Pizzas' || product.category === 'Pizzas Doces';

  useEffect(() => {
    if (product) {
      if (hasAvailableVariations) {
        setSelectedVariation(product.variations![0]);
      } else {
        setSelectedVariation(null);
      }
    }
  }, [product, hasAvailableVariations]);

  // NOVO: Verifica se é pizza grande selecionada
  const isLargePizzaSelected = isPizzaCategory && selectedVariation?.name === 'Grande';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // NOVO: Se for pizza grande, mostra o modal de escolha
    if (isLargePizzaSelected) {
      setShowPizzaChoice(true);
      return;
    }
    
    // Lógica original para outros casos
    if (hasAvailableVariations) {
      if (!selectedVariation) {
        toast.error('Por favor, selecione um tamanho!');
        return;
      }
      const itemToAdd: CartItem = { ...product, quantity: 1 }; 
      addToCart(itemToAdd, selectedVariation); 
    } else {
      if (product.price === undefined || product.price === null || product.price <= 0) {
        toast.error('Preço inválido para adicionar ao carrinho!');
        return;
      }
      const itemToAdd: CartItem = { ...product, quantity: 1 };
      addToCart(itemToAdd, undefined); 
    }
  };

  // NOVO: Função para lidar com a escolha do tipo de pizza
  const handlePizzaChoice = (choice: 'normal' | 'half-and-half') => {
    console.log('🍕 ProductCard - escolha:', choice);
    setShowPizzaChoice(false);
    
    if (choice === 'normal') {
      // Adiciona pizza inteira diretamente ao carrinho
      const itemToAdd: CartItem = { ...product, quantity: 1 };
      addToCart(itemToAdd, selectedVariation!);
      toast.success(`Pizza ${product.name} (${selectedVariation?.name}) adicionada ao carrinho!`);
    } else {
      // CORRIGIDO: Cria uma versão "fake" da pizza já configurada como Grande
      console.log('🎯 Chamando onProductClick com modo half-and-half');
      
      if (onProductClick) {
        // Abre o modal já no modo meia a meia, com pizza Grande pré-selecionada
        onProductClick(product, 'half-and-half');
      }
    }
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  let displayedPriceText: string;
  let isAddButtonEnabled: boolean;

  if (hasAvailableVariations) {
    if (selectedVariation) {
      displayedPriceText = `R$ ${selectedVariation.price.toFixed(2).replace('.', ',')}`;
      isAddButtonEnabled = true;
    } else {
      const minPrice = product.variations!.reduce((min, v) => Math.min(min, v.price), Infinity);
      displayedPriceText = `A partir de R$ ${minPrice.toFixed(2).replace('.', ',')}`;
      isAddButtonEnabled = false;
    }
  } else {
    displayedPriceText = product.price !== undefined && product.price !== null && product.price > 0
      ? `R$ ${product.price.toFixed(2).replace('.', ',')}`
      : 'N/A';
    isAddButtonEnabled = product.price !== undefined && product.price !== null && product.price > 0;
  }

  return (
    <>
      <CardContainer 
        className={isListView ? 'list-view' : ''}
        onClick={handleCardClick} 
        $clickable={!!onProductClick} 
      >
        <ImageContainer>
          <ProductImage src={product.image || 'https://via.placeholder.com/300x200'} alt={product.name} />
        </ImageContainer>
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductDescription>
            {product.description && product.description.length > 50 
              ? product.description.substring(0, 50) + '...' 
              : product.description || 'Descrição não disponível.'
            }
          </ProductDescription>

          {hasAvailableVariations && (
            <VariationsContainer onClick={(e) => e.stopPropagation()}>
              {product.variations!.map((variation, index) => (
                <VariationOption
                  key={variation.name}
                  $selected={selectedVariation?.name === variation.name}
                >
                  <input
                    type="radio"
                    name={`card-variation-${product.id}`}
                    value={variation.name}
                    checked={selectedVariation?.name === variation.name}
                    onChange={() => setSelectedVariation(variation)}
                  />
                  {variation.name.length <= 3 ? variation.name.substring(0, 1).toUpperCase() : variation.name}
                </VariationOption>
              ))}
            </VariationsContainer>
          )}

          <ProductPrice>
            <span>{displayedPriceText}</span>
            <AddButton 
              type="button" 
              onClick={handleAddToCart} 
              disabled={!isAddButtonEnabled}
            >
              <Plus size={16} /> 
              {isLargePizzaSelected ? 'Escolher' : 'Add'}
            </AddButton>
          </ProductPrice>
        </ProductInfo>
      </CardContainer>

      {/* NOVO: Modal de escolha para pizza grande */}
      {showPizzaChoice && (
        <PizzaChoiceOverlay onClick={() => setShowPizzaChoice(false)}>
          <PizzaChoiceContainer onClick={(e) => e.stopPropagation()}>
            <button 
              style={{
                position: 'absolute',
                top: '0.8rem',
                right: '0.8rem',
                background: 'none',
                border: 'none',
                color: '#999',
                cursor: 'pointer',
                padding: '0.2rem'
              }}
              onClick={() => setShowPizzaChoice(false)}
            >
              <X size={20} />
            </button>
            
            <PizzaChoiceTitle>Como você quer sua pizza?</PizzaChoiceTitle>
            
            <PizzaChoiceButtons>
              <PizzaChoiceButton onClick={() => handlePizzaChoice('normal')}>
                <div>
                  <strong>Pizza Inteira</strong>
                  <span>{product.name}</span>
                </div>
              </PizzaChoiceButton>
              
              <PizzaChoiceButton onClick={() => handlePizzaChoice('half-and-half')}>
                <div>
                  <strong>Meia a Meia</strong>
                  <span>Escolha 2 sabores</span>
                </div>
              </PizzaChoiceButton>
            </PizzaChoiceButtons>
          </PizzaChoiceContainer>
        </PizzaChoiceOverlay>
      )}
    </>
  );
};

export default ProductCard;