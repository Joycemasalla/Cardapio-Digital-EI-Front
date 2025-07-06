import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { ChevronDown } from 'lucide-react'; // Importar ícone ChevronDown
// CORRIGIDO: Importa o tipo Product do ProductContext
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


// REMOVIDO: A tipagem local Product (agora importada do ProductContext)
/*
type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
};
*/

// Tipagem do CategorySectionProps, onde "products" usa o tipo Product importado
type CategorySectionProps = {
  id: string;
  title: string;
  products: Product[]; // Usa o tipo Product importado
  isListView?: boolean; // Mantido
};

const CategorySection: React.FC<CategorySectionProps> = ({ title, id, products, isListView = false }) => {
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
            isListView={isListView} // Passa a prop isListView
          />
        ))}
      </ProductsGrid>
    </SectionContainer>
  );
};

export default CategorySection;