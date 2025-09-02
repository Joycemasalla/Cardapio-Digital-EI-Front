import React, { useState, useEffect } from 'react';
import {
  CardContainer,
  ImageContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
  AddButton
} from './ProductCardStyles';
import { Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product, ProductVariation, ProductAdditional } from '../../contexts/ProductContext';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
  isListView?: boolean;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isListView = false, onProductClick }) => {
  const { addToCart } = useCart();
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

  // CORRIGIDO: Referência a 'additionals'
  const hasOptions = (product.variations && product.variations.length > 0) || (product.additionals && product.additionals.length > 0);
  const hasMultipleVariations = product.variations && product.variations.length > 1;

  useEffect(() => {
    if (product.variations && product.variations.length > 0) {
      setSelectedVariation(product.variations[0]);
    } else {
      setSelectedVariation(null);
    }
  }, [product]);

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };
  
  const handleAddToCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasOptions) {
      if (onProductClick) {
        onProductClick(product);
      }
    } else {
      if (product.price !== undefined && product.price !== null && product.price > 0) {
        addToCart({
            ...product,
            quantity: 1,
            selectedAdditionals: [],
            selectedVariation: undefined,
        });
      } else {
        toast.error('Preço inválido para adicionar ao carrinho!');
      }
    }
  };

  let displayedPriceText: string;
  
  if (product.variations && product.variations.length > 0) {
    const firstVariationPrice = product.variations[0].price;
    displayedPriceText = `A partir de R$ ${firstVariationPrice.toFixed(2).replace('.', ',')}`;
  } else {
    displayedPriceText = product.price !== undefined && product.price !== null && product.price > 0
      ? `R$ ${product.price.toFixed(2).replace('.', ',')}`
      : 'N/A';
  }
  
  const buttonLabel = hasOptions ? "Opções" : "Adicionar";

  return (
    <CardContainer 
      className={isListView ? 'list-view' : ''}
      onClick={handleCardClick}
      $clickable={true}
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

        <ProductPrice>
          <span>{displayedPriceText}</span>
          <AddButton 
            type="button" 
            onClick={handleAddToCardClick} 
            disabled={!product.price && (!product.variations || product.variations.length === 0)}
          >
            <Plus size={16} /> 
            {buttonLabel}
          </AddButton>
        </ProductPrice>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;