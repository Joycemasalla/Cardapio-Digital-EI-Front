import React, { useEffect, useState } from 'react';
import CategorySection from '../components/CategorySection/CategorySection';
import { PageContainer, HeroSection, HeroContent, HeroTitle, HeroSubtitle } from './PageStyles';
import { useProducts } from '../contexts/ProductContext';

// Tipagem dos produtos, ajuste conforme sua estrutura real
// Tipagem dos produtos com descrição obrigatória
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;  // Tornar obrigatório
  image?: string;
  category: string;
};


// Tipagem da categoria
type CategoryType = {
  id: string;
  name: string;
  products: Product[];
};

const MenuPage = () => {
  const { products, loading } = useProducts();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (products.length > 0) {
      const categoriesMap: { [key: string]: Product[] } = {};

      // Agrupar produtos por categoria
      products.forEach((product) => {
        if (!categoriesMap[product.category]) {
          categoriesMap[product.category] = [];
        }
        categoriesMap[product.category].push(product);
      });

      // Converter para array de objetos CategoryType
      const categoriesArray: CategoryType[] = Object.entries(categoriesMap).map(
        ([name, products]) => ({
          id: normalizeId(name),
          name,
          products,
        })
      );

      setCategories(categoriesArray);
    }
  }, [products]);

  const normalizeId = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')                   // Remove acentos
      .replace(/[\u0300-\u036f]/g, '')   // Remove caracteres diacríticos
      .replace(/\s+/g, '-')              // Espaço vira hífen
      .replace(/[^\w-]/g, '');           // Remove caracteres especiais
  };
  

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Espaço Imperial</HeroTitle>
          <HeroSubtitle>Sabores que conquistam</HeroSubtitle>
        </HeroContent>
      </HeroSection>


      {loading ? (
        <div>Carregando...</div>
      ) : (
        categories
          .filter(
            (category) =>
              selectedCategory === '' || category.name === selectedCategory
          )
          .map((category) => (
            <CategorySection
              key={category.id}
              id={category.id}
              title={category.name}
              products={category.products}
            />
          ))
      )}
    </PageContainer>
  );
};

export default MenuPage;
