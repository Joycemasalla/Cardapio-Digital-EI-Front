// src/components/ProductModal/ProductModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product, ProductVariation } from '../../contexts/ProductContext';
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
  PriceDisplay,
  VariationsContainer,
  VariationOption,
  QuantityControl,
  QuantityButton,
  QuantityDisplay,
  AddButton,
  ProductActions
} from './ProductModalStyles.js';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, cartItems } = useCart();
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Determina se o produto tem variações disponíveis para seleção
  const hasAvailableVariations = product?.variations && product.variations.length > 0;

  useEffect(() => {
    // Ao abrir o modal ou mudar o produto, reseta quantidade e seleciona a primeira variação se houver
    if (product) {
      setQuantity(1);
      if (hasAvailableVariations) {
        setSelectedVariation(product.variations![0]);
      } else {
        setSelectedVariation(null);
      }
    }
  }, [product, hasAvailableVariations]);

  if (!product) return null; // Não renderiza se não houver produto

  const displayPrice = hasAvailableVariations && selectedVariation
    ? selectedVariation.price
    : product.price;

  const handleAddToCart = () => {
    if (hasAvailableVariations && !selectedVariation) {
      toast.error('Por favor, selecione uma opção para o produto!');
      return;
    }
    for (let i = 0; i < quantity; i++) {
        addToCart(product, selectedVariation || undefined);
    }
    // toast.success(`${quantity}x ${product.name}${selectedVariation ? ` (${selectedVariation.name})` : ''} adicionado(s) ao carrinho!`);
    onClose(); // Fecha o modal após adicionar ao carrinho
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const finalPrice = (displayPrice ?? 0) * quantity;

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

            {hasAvailableVariations && (
              <VariationsContainer>
                {product.variations!.map((variation, index) => (
                  <VariationOption
                    key={index}
                    $selected={selectedVariation?.name === variation.name}
                  >
                    <input
                      type="radio"
                      name={`modal-variation-${product.id}`}
                      value={variation.name}
                      checked={selectedVariation?.name === variation.name}
                      onChange={() => setSelectedVariation(variation)}
                    />
                    {variation.name} (R$ {variation.price.toFixed(2).replace('.', ',')})
                  </VariationOption>
                ))}
              </VariationsContainer>
            )}

            <ProductActions>
                <QuantityControl>
                    <QuantityButton onClick={handleDecrement}>-</QuantityButton>
                    <QuantityDisplay>{quantity}</QuantityDisplay>
                    <QuantityButton onClick={handleIncrement}>+</QuantityButton>
                </QuantityControl>
                <AddButton 
                    onClick={handleAddToCart}
                    disabled={hasAvailableVariations && !selectedVariation}>
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