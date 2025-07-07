import React, { useState, useEffect } from 'react'; // Removido useRef
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
  // Removido ToggleDescriptionButton
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
  
  // Removido isDescriptionExpanded, toggleDescription, descriptionRef, showToggle
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    // Lógica para selecionar a primeira variação por padrão
    if (product.variations && product.variations.length > 0) {
      if (!selectedVariation || !product.variations.some(v => v.name === selectedVariation.name)) {
        setSelectedVariation(product.variations?.[0] || null);
      }
    } else {
      setSelectedVariation(null);
    }
    // Removida a lógica de verificação de overflow da descrição
  }, [product, selectedVariation]);

  // const handleAddToCart = (e: React.MouseEvent) => {
  //     e.preventDefault(); // Mude de stopPropagation para preventDefault

  //   e.stopPropagation(); // Impede que o clique no botão propague
  //       console.log('Botão "Add" clicado para o produto:', product.name); // LOG 1: Clicou no botão

  //   if (product.variations && !selectedVariation) {
  //     toast.error('Por favor, selecione uma opção para o produto!');
  //           console.warn('Produto com variações, mas nenhuma selecionada. Não adicionando ao carrinho.'); // LOG 2: Variação faltando

  //     return;
  //   }
  //       console.log('Chamando addToCart com produto:', product, 'e variação selecionada:', selectedVariation); // LOG 3: Chamando a função

  //   addToCart(product, selectedVariation || undefined);
  // };



  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Mude de stopPropagation para preventDefault
    e.stopPropagation(); // Mantenha este também

    console.log('Botão "Add" clicado para o produto:', product.name);

    if (product.variations && product.variations.length > 0 && !selectedVariation) {
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

  const displayPrice = product.variations && selectedVariation
    ? selectedVariation.price
    : product.price;

  const canAddToCart = product.variations
    ? (selectedVariation !== null)
    : (product.price !== undefined && product.price !== null);

  return (
    <CardContainer className={isListView ? 'list-view' : ''}>
      <ImageContainer>
        <ProductImage src={product.image || 'https://via.placeholder.com/300x200'} alt={product.name} />
      </ImageContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        {/* NOVO: Descrição sem lógica de expansão, controlada puramente por CSS */}
        <ProductDescription>{product.description || 'Descrição não disponível.'}</ProductDescription>

        {/* Removido ToggleDescriptionButton */}

        {product.variations && product.variations.length > 0 && (
          <VariationsContainer onClick={(e) => e.stopPropagation()}>
            {product.variations.map((variation, index) => (
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