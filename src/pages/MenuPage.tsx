import React, { useEffect, useState } from 'react';
import CategorySection from '../components/CategorySection/CategorySection';
import { PageContainer, HeroSection, HeroContent, HeroTitle, HeroSubtitle } from './PageStyles';
import { useProducts, Product } from '../contexts/ProductContext';
import { ViewToggleContainer, ViewToggleButton } from '../components/ProductCard/ProductCardStyles';
import { Grid, List } from 'lucide-react';
import CategoryQuickLinks from '../components/CategoryQuickLinks/CategoryQuickLinks'; // NOVO: Importa CategoryQuickLinks

type CategoryType = {
  id: string;
  name: string;
  products: Product[];
};

const MenuPage = () => {
  const { products, loading } = useProducts();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const [isListView, setIsListView] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const categoriesMap: { [key: string]: Product[] } = {};

      products.forEach((product) => {
        if (!categoriesMap[product.category]) {
          categoriesMap[product.category] = [];
        }
        categoriesMap[product.category].push(product);
      });

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
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  };

  // NOVO: Função para scrollar para a categoria (copiada e adaptada do Header)
  const handleCategoryScroll = (categoryId: string) => {
    const section = document.getElementById(categoryId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Espaço Imperial</HeroTitle>
          <HeroSubtitle>Sabores que conquistam</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ViewToggleContainer>
        <ViewToggleButton $active={!isListView} onClick={() => setIsListView(false)}>
          <Grid size={20} /> Grade
        </ViewToggleButton>
        <ViewToggleButton $active={isListView} onClick={() => setIsListView(true)}>
          <List size={20} /> Lista
        </ViewToggleButton>
      </ViewToggleContainer>

      {/* NOVO: Seção de Links Rápidos para Categorias */}
      <CategoryQuickLinks onCategoryClick={handleCategoryScroll} />


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
              isListView={isListView}
            />
          ))
      )}
    </PageContainer>
  );
};

export default MenuPage;