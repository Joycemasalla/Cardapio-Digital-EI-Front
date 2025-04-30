import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { 
  SectionContainer, 
  SectionTitle, 
  ProductsGrid,
  Divider,
  CategoryAnchor,
  TitleContainer
} from './CategorySectionStyles';

// Tipagem do CategorySectionProps, onde "products" pode ter description como undefined
type CategorySectionProps = {
  id: string;
  title: string;
  products: {
    id: string;
    name: string;
    price: number;
    description?: string;  // Deixe description opcional
    image?: string;
    category: string;
  }[];
};


const CategorySection: React.FC<CategorySectionProps> = ({ title, id, products }) => {
  return (
    <SectionContainer>
      <CategoryAnchor id={id} />
      <TitleContainer>
        <SectionTitle>{title}</SectionTitle>
        <Divider />
      </TitleContainer>
      
      <ProductsGrid>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
          />
        ))}
      </ProductsGrid>
    </SectionContainer>
  );
};

export default CategorySection;