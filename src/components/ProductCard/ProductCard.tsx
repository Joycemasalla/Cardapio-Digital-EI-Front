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
import { toast } from 'react-toastify';


interface ProductCardProps {
  product: Product;
  isListView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isListView = false }) => {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const { addToCart } = useCart();

  // Variável auxiliar para verificar se o produto realmente possui variações para seleção
  const hasAvailableVariations = product.variations && product.variations.length > 0;

  useEffect(() => {
    // Lógica para selecionar a primeira variação por padrão
    if (hasAvailableVariations) {
      // Para satisfazer o TypeScript: usamos uma asserção non-null
      // pois 'hasAvailableVariations' já confirmou que 'product.variations' não é undefined
      const currentVariations = product.variations!; // <--- CORREÇÃO AQUI (Linha 36 indiretamente)

      if (!selectedVariation || !currentVariations.some(v => v.name === selectedVariation.name)) {
        setSelectedVariation(currentVariations[0]);
      }
    } else {
      setSelectedVariation(null);
    }
  }, [product, hasAvailableVariations]); // Dependências: 'product' e 'hasAvailableVariations'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('Botão "Add" clicado para o produto:', product.name);

    if (hasAvailableVariations && !selectedVariation) {
      toast.error('Por favor, selecione uma opção para o produto!');
      console.warn('Produto com variações, mas nenhuma selecionada. Não adicionando ao carrinho.');
      return;
    }

    console.log('Chamando addToCart com produto:', product, 'e variação selecionada:', selectedVariation);

    try {
      addToCart(product, selectedVariation || undefined);
      console.log('addToCart chamado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  // Ajusta o preço exibido com base na seleção de variação
  const displayPrice = hasAvailableVariations && selectedVariation
    ? selectedVariation.price
    : product.price;

  // Lógica do `canAddToCart` para habilitar/desabilitar o botão
  const canAddToCart = hasAvailableVariations
    ? (selectedVariation !== null) // Se tem variações, uma precisa estar selecionada
    : (product.price !== undefined && product.price !== null); // Se não tem variações, o preço base precisa existir

  return (
    <CardContainer className={isListView ? 'list-view' : ''}>
      <ImageContainer>
        <ProductImage src={product.image || 'https://via.placeholder.com/300x200'} alt={product.name} />
      </ImageContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description || 'Descrição não disponível.'}</ProductDescription>

        {/* Renderiza as variações apenas se houver variações disponíveis */}
        {hasAvailableVariations && ( // Isso garante que product.variations não é undefined ou null
          <VariationsContainer onClick={(e) => e.stopPropagation()}>
            {product.variations!.map((variation, index) => ( // <--- CORREÇÃO AQUI (Linha 87)
              <VariationOption
                key={index}
                $selected={selectedVariation?.name === variation.name}
              >
                <input
                  type="radio"
                  name={`variation-${product.id}`}
                  value={variation.name}
                  checked={selectedVariation?.name === variation.name}
                  onChange={() => setSelectedVariation(variation)}
                />
                {variation.name} (R$ {variation.price.toFixed(2).replace('.', ',')})
              </VariationOption>
            ))}
          </VariationsContainer>
        )}

        <ProductPrice>
          {displayPrice !== undefined && displayPrice !== null ? (
            <span>R$ {displayPrice.toFixed(2).replace('.', ',')}</span>
          ) : (
            <span>Selecione uma opção</span>
          )}
          <AddButton type="button" onClick={handleAddToCart} disabled={!canAddToCart}>
            <Plus size={16} /> Add
          </AddButton>
        </ProductPrice>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;