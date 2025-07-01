import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard/ProductCard';
import styled from 'styled-components';
import { PageContainer } from './PageStyles'; // Reutilizando PageContainer de PageStyles

// Tipagem para os produtos, conforme definido em ProductContext
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const CategoryContainer = styled(PageContainer)` // Estendendo PageContainer
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
    text-align: center;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
`;

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>(); // Tipando useParams
  const { products } = useProducts();

  // Função para normalizar a string da categoria para comparação
  const normalizeCategory = (cat: string): string => {
    return cat
      .toLowerCase()
      .normalize('NFD')                   // Remove acentos
      .replace(/[\u0300-\u036f]/g, '')   // Remove caracteres diacríticos
      .replace(/\s+/g, '-')              // Espaço vira hífen
      .replace(/[^\w-]/g, '');           // Remove caracteres especiais
  };

  const categoryProducts = products.filter(
    (product: Product) => normalizeCategory(product.category) === category
  );

  const categoryTitle = categoryProducts.length > 0 
    ? categoryProducts[0].category 
    : 'Categoria não encontrada';

  return (
    <CategoryContainer>
      <CategoryTitle>{categoryTitle}</CategoryTitle>
      <ProductsGrid>
        {categoryProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
    </CategoryContainer>
  );
};

export default CategoryPage;