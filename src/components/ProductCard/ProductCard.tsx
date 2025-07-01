import React, { useState } from 'react';
import {
  CardContainer,
  ImageContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
  AddButton,
  ToggleDescriptionButton // Importe o novo componente de estilo
} from './ProductCardStyles';
import { Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { addToCart } = useCart();
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <CardContainer>
      <ImageContainer>
        <ProductImage src={product.image || 'https://via.placeholder.com/300x200'} alt={product.name} />
      </ImageContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription className={isDescriptionExpanded ? 'expanded' : ''}>
          {product.description || 'Descrição não disponível.'}
        </ProductDescription>
        {product.description && product.description.length > 100 && ( // Mostrar "Ver Mais" se a descrição for longa
          <ToggleDescriptionButton onClick={toggleDescription}>
            {isDescriptionExpanded ? 'Ver Menos' : 'Ver Mais'}
          </ToggleDescriptionButton>
        )}
        <ProductPrice>
          <span>R$ {product.price.toFixed(2).replace('.', ',')}</span>
          <AddButton onClick={() => addToCart(product)}>
            <Plus size={18} /> Adicionar
          </AddButton>
        </ProductPrice>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;