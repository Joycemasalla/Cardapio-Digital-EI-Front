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
  VariationOption, // Reintroduzido para as opções clicáveis no card
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

  const hasAvailableVariations = product.variations && product.variations.length > 0;

  useEffect(() => {
    // Ao carregar o produto ou se houver variações, seleciona a primeira por padrão
    if (product) {
      if (hasAvailableVariations) {
        setSelectedVariation(product.variations![0]); // Seleciona a primeira variação automaticamente
      } else {
        setSelectedVariation(null); // Sem variações, limpa a seleção
      }
    }
  }, [product, hasAvailableVariations]); // Depende do produto e se ele tem variações

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do botão
    e.stopPropagation(); // Impede que o clique no botão abra o modal do card

    console.log('Botão "Add" clicado para o produto:', product.name);

    if (hasAvailableVariations) {
      // Se o produto tem variações
      if (!selectedVariation) {
        toast.error('Por favor, selecione um tamanho para a pizza!'); // Mensagem de erro se nenhuma variação for escolhida
        return;
      }
      addToCart(product, selectedVariation); // Adiciona a variação selecionada ao carrinho
    } else {
      // Se o produto não tem variações (é um produto simples)
      if (product.price === undefined || product.price === null || product.price <= 0) {
        toast.error('Preço inválido para adicionar ao carrinho!');
        return;
      }
      addToCart(product, undefined); // Adiciona o produto simples
    }
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product); // Clicar em qualquer lugar no card abre o modal de detalhes
    }
  };

  let displayedPriceText: string;
  let isAddButtonEnabled: boolean;

  if (hasAvailableVariations) {
    // Se tem variações
    if (selectedVariation) {
      // Exibe o preço da variação selecionada
      displayedPriceText = `R$ ${selectedVariation.price.toFixed(2).replace('.', ',')}`;
      isAddButtonEnabled = true; // Botão habilitado se uma variação for selecionada
    } else {
      // Se não há variação selecionada (estado inicial, teoricamente coberto pelo useEffect)
      // Exibe "A partir de R$ X,XX" e desabilita o botão
      const minPrice = product.variations!.reduce((min, v) => Math.min(min, v.price), Infinity);
      displayedPriceText = `A partir de R$ ${minPrice.toFixed(2).replace('.', ',')}`;
      isAddButtonEnabled = false; // Desabilitado até que uma variação seja selecionada
    }
  } else {
    // Se não tem variações (produto simples)
    displayedPriceText = product.price !== undefined && product.price !== null && product.price > 0
      ? `R$ ${product.price.toFixed(2).replace('.', ',')}`
      : 'N/A';
    isAddButtonEnabled = product.price !== undefined && product.price !== null && product.price > 0;
  }

  return (
    <CardContainer 
      className={isListView ? 'list-view' : ''}
      onClick={handleCardClick} // O clique no card abre o modal
      $clickable={!!onProductClick} // Indica que o card é clicável
    >
      <ImageContainer>
        <ProductImage src={product.image || 'https://via.placeholder.com/300x200'} alt={product.name} />
      </ImageContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        {/* Descrição abreviada no card, completa no modal */}
        <ProductDescription>
          {product.description && product.description.length > 50 
            ? product.description.substring(0, 50) + '...' 
            : product.description || 'Descrição não disponível.'
          }
        </ProductDescription>

        {/* Renderiza as opções de variação clicáveis se o produto tiver variações */}
        {hasAvailableVariations && (
          <VariationsContainer onClick={(e) => e.stopPropagation()}> {/* Impede que clicar nas variações abra o modal */}
            {product.variations!.map((variation, index) => (
              <VariationOption
                key={variation.name} // Chave única para cada variação
                $selected={selectedVariation?.name === variation.name}
              >
                <input
                  type="radio"
                  name={`card-variation-${product.id}`} // Garante que apenas um radio seja selecionado por produto
                  value={variation.name}
                  checked={selectedVariation?.name === variation.name}
                  onChange={() => setSelectedVariation(variation)} // Atualiza a variação selecionada
                />
                {/* Exibe a primeira letra (P, M, G) ou o nome completo se for curto */}
                {variation.name.length <= 3 ? variation.name.substring(0, 1).toUpperCase() : variation.name}
              </VariationOption>
            ))}
          </VariationsContainer>
        )}

        <ProductPrice>
          <span>{displayedPriceText}</span> {/* Exibe o preço dinâmico */}
          <AddButton 
            type="button" 
            onClick={handleAddToCart} 
            disabled={!isAddButtonEnabled} // Desabilita/habilita o botão Add
          >
            <Plus size={16} /> Add
          </AddButton>
        </ProductPrice>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;