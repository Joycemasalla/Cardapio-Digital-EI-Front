// src/components/CategorySection/CategorySection.tsx
import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { ChevronDown } from 'lucide-react'; 
import { Product } from '../../contexts/ProductContext';
import {
  SectionContainer,
  SectionTitle,
  ProductsGrid,
  Divider,
  CategoryAnchor,
  TitleContainer,
  ToggleIcon
} from './CategorySectionStyles';

type CategorySectionProps = {
  id: string;
  title: string;
  products: Product[];
  isListView?: boolean;
  onProductClick?: (product: Product) => void; // NOVO: Recebe a prop
};

const CategorySection: React.FC<CategorySectionProps> = ({ title, id, products, isListView = false, onProductClick }) => {
  const [isExpanded, setIsExpanded] = useState(true); 

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SectionContainer>
      <CategoryAnchor id={id} />
      <TitleContainer onClick={toggleExpanded}>
        <SectionTitle>{title}</SectionTitle>
        <ToggleIcon className={isExpanded ? '' : 'rotated'}>
          <ChevronDown size={24} />
        </ToggleIcon>
      </TitleContainer>
      <Divider />
      
      <ProductsGrid className={`${isExpanded ? '' : 'collapsed'} ${isListView ? 'list-view-grid' : ''}`}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            isListView={isListView} 
            onProductClick={onProductClick} // NOVO: Repassa a prop para o ProductCard
          />
        ))}
      </ProductsGrid>
    </SectionContainer>
  );
};

export default CategorySection;