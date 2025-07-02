import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { ChevronDown } from 'lucide-react';
import { Product } from '../../contexts/ProductContext'; // Importa Product
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
  isListView?: boolean; // NOVO: Prop para controlar a visualização
};

const CategorySection: React.FC<CategorySectionProps> = ({ title, id, products, isListView = false }) => { // isListView com valor padrão
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
      
      {/* NOVO: Aplica classe condicionalmente para ajustar o grid */}
      <ProductsGrid className={`${isExpanded ? '' : 'collapsed'} ${isListView ? 'list-view-grid' : ''}`}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            isListView={isListView} // NOVO: Passa a prop isListView
          />
        ))}
      </ProductsGrid>
    </SectionContainer>
  );
};

export default CategorySection;