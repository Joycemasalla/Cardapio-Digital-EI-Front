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
} from './ProductCardStyles';
import { Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product, ProductVariation } from '../../contexts/ProductContext';
// NOVO: Importa CartItem para tipagem correta
import { CartItem } from '../../contexts/CartContext';
import { toast } from 'react-toastify';


interface ProductCardProps {
  product: Product;
  isListView?: boolean;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isListView = false, onProductClick }) => {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Lógica para abrir o modal para pizza grande
    if (isPizzaCategory && selectedVariation?.name === 'Grande' && onProductClick) {
        onProductClick(product);
        return;
    }
    
    if (hasAvailableVariations) {
      if (!selectedVariation) {
        toast.error('Por favor, selecione um tamanho para a pizza!');
        return;
      }
      // CORRIGIDO: Garante que o argumento seja do tipo CartItem (com quantity)
      const itemToAdd: CartItem = { ...product, quantity: 1 }; 
      addToCart(itemToAdd, selectedVariation); 
      // toast.success(`${product.name} (${selectedVariation.name}) adicionado ao carrinho!`);
    } else {
      if (product.price === undefined || product.price === null || product.price <= 0) {
        toast.error('Preço inválido para adicionar ao carrinho!');
        return;
      }
      // CORRIGIDO: Garante que o argumento seja do tipo CartItem (com quantity)
      const itemToAdd: CartItem = { ...product, quantity: 1 };
      addToCart(itemToAdd, undefined); 
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
            <Plus size={16} /> Add
          </AddButton>
        </ProductPrice>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;