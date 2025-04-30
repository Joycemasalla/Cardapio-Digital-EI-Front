import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import {
  CardContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductPrice,
  AddButton,
  ImageContainer
} from './ProductCardStyles';

type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  

  const handleAddToCart = () => {
    console.log('Botão de adicionar clicado'); // ✅ Aqui está certo
    addToCart(product);
  };
  
  return (
    <CardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} />
      </ImageContainer>

      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        {product.description && (
          <ProductDescription>{product.description}</ProductDescription>
        )}
        <ProductPrice>
          R$ {product.price.toFixed(2).replace('.', ',')}
          <AddButton 
            data-hovered={isHovered}
            onClick={handleAddToCart}

          >
            <PlusCircle size={20} />
            {isHovered && 'Adicionar'}
          </AddButton>

        </ProductPrice>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;
