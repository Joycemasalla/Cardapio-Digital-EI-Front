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
  VariationOption
} from './ProductCardStyles';
import { Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product, ProductVariation } from '../../contexts/ProductContext';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
  isListView?: boolean;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isListView = false, onProductClick }) => {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const { addToCart } = useCart();
  
  // Condição para determinar se o produto tem variações ou opcionais
  const hasOptions = (product.variations && product.variations.length > 0) || (product.optionals && product.optionals.length > 0);
  const hasMultipleVariations = product.variations && product.variations.length > 1;

  useEffect(() => {
    // Seleciona a primeira variação por padrão se houver, ou a primeira metade da pizza
    if (product.variations && product.variations.length > 0) {
      setSelectedVariation(product.variations[0]);
    } else {
      setSelectedVariation(null);
    }
  }, [product]);

  // A função para adicionar ao carrinho agora abre o modal
  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };
  
  const handleAddToCardClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no botão ative o clique no card
    // Se o produto tiver opções, abre o modal. Se não, adiciona diretamente.
    if (hasOptions) {
      if (onProductClick) {
        onProductClick(product);
      }
    } else {
      if (product.price !== undefined && product.price !== null && product.price > 0) {
        addToCart({ ...product, quantity: 1 });
      } else {
        toast.error('Preço inválido para adicionar ao carrinho!');
      }
    }
  }

  let displayedPriceText: string;
  
  if (product.variations && product.variations.length > 0) {
    // Se tiver variações, mostra o preço da primeira variação por padrão
    const firstVariationPrice = product.variations[0].price;
    displayedPriceText = `A partir de R$ ${firstVariationPrice.toFixed(2).replace('.', ',')}`;
  } else {
    // Se não tiver variações, mostra o preço normal
    displayedPriceText = product.price !== undefined && product.price !== null && product.price > 0
      ? `R$ ${product.price.toFixed(2).replace('.', ',')}`
      : 'N/A';
  }
  
  const buttonLabel = hasOptions ? "Opções" : "Adicionar";

  return (
    <CardContainer 
      className={isListView ? 'list-view' : ''}
      onClick={handleCardClick}
      $clickable={true} // O card é sempre clicável para abrir o modal
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
            disabled={!product.price && !product.variations}
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