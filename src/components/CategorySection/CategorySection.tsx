import React, { useState } from 'react'; // Importar useState
import ProductCard from '../ProductCard/ProductCard';
import { ChevronDown } from 'lucide-react'; // Importar ícone ChevronDown
import {
  SectionContainer,
  SectionTitle,
  ProductsGrid,
  Divider,
  CategoryAnchor,
  TitleContainer,
  ToggleIcon // Importar ToggleIcon
} from './CategorySectionStyles'; // Garantir que ToggleIcon está importado aqui

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
  // Estado para controlar se a categoria está expandida ou colapsada
  // Começamos com 'true' (expandida) para que os produtos sejam visíveis ao carregar.
  // Se preferir que todas as categorias comecem colapsadas, mude para 'false'.
  const [isExpanded, setIsExpanded] = useState(true); 

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SectionContainer>
      <CategoryAnchor id={id} />
      <TitleContainer onClick={toggleExpanded}> {/* Adicionado onClick para alternar */}
        <SectionTitle>{title}</SectionTitle>
        <ToggleIcon className={isExpanded ? '' : 'rotated'}> {/* Aplica classe 'rotated' quando colapsado */}
          <ChevronDown size={24} /> {/* Ícone de seta */}
        </ToggleIcon>
      </TitleContainer>
      <Divider /> {/* Mantém a linha divisória abaixo do título */}
      
      <ProductsGrid className={isExpanded ? '' : 'collapsed'}> {/* Aplica classe 'collapsed' */}
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