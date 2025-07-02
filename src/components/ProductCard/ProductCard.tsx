import React, { useState, useEffect, useRef } from 'react';
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
  ToggleDescriptionButton
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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [showToggle, setShowToggle] = useState(false);

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

    // Lógica para verificar se o botão "Ver Mais" deve aparecer
    // Esta verificação deve ser feita após a renderização e o CSS terem sido aplicados
    const checkToggleVisibility = () => {
      if (descriptionRef.current && !isListView) { // Só verifica na grade
        // Compara a altura de rolagem com a altura real para ver se o conteúdo está cortado
        setShowToggle(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
      } else if (isListView) { // No modo lista, o toggle é sempre desativado
        setShowToggle(false);
        setIsDescriptionExpanded(false); // Garante que não esteja expandido ao mudar para lista
      }
    };

    // Pequeno atraso para garantir que o layout foi computado
    const timeoutId = setTimeout(checkToggleVisibility, 50); 
    
    // Limpa o timeout se o componente for desmontado ou props mudarem
    return () => clearTimeout(timeoutId);

  }, [product, selectedVariation, isListView]);

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.variations && !selectedVariation) {
      toast.error('Por favor, selecione uma opção para o produto!');
      return;
    }
    addToCart(product, selectedVariation || undefined);
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
        <ProductDescription 
          ref={descriptionRef} 
          className={isDescriptionExpanded ? 'expanded' : ''}
          onClick={showToggle ? toggleDescription : undefined}
        >
          {product.description || 'Descrição não disponível.'}
        </ProductDescription>
        
        {showToggle && ( // Oculta o botão no modo lista via CSS
          <ToggleDescriptionButton onClick={toggleDescription}>
            {isDescriptionExpanded ? 'Ver Menos' : 'Ver Mais'}
          </ToggleDescriptionButton>
        )}

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
          <AddButton onClick={handleAddToCart} disabled={!canAddToCart}>
            <Plus size={16} /> Adicionar
          </AddButton>
        </ProductPrice>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;