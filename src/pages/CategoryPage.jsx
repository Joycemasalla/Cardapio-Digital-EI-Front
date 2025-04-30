import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard/ProductCard';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 2rem;
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

const CategoryPage = () => {
  const { category } = useParams();
  const { products } = useProducts();

  const normalizeCategory = (cat) => cat.toLowerCase().replace(/\s+/g, '-');

  const categoryProducts = products.filter(
    product => normalizeCategory(product.category) === category
  );

  const categoryTitle = categoryProducts[0]?.category || 'Categoria não encontrada';

  console.log('Category from URL:', category);
  console.log('Products:', products);
  
  return (
    <CategoryContainer>
      <CategoryTitle>{categoryTitle}</CategoryTitle>
      <ProductsGrid>
        {categoryProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
    </CategoryContainer>
  );
};

export default CategoryPage;