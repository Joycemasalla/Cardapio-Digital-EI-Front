// src/pages/MenuPage.tsx
import React, { useEffect, useState } from 'react';
import CategorySection from '../components/CategorySection/CategorySection';
import { PageContainer, HeroSection, HeroContent, HeroTitle, HeroSubtitle } from './PageStyles';
import { useProducts, Product } from '../contexts/ProductContext';
import { ViewToggleContainer, ViewToggleButton } from '../components/ProductCard/ProductCardStyles';
import { Grid, List } from 'lucide-react';
import CategoryQuickLinks from '../components/CategoryQuickLinks/CategoryQuickLinks';
import ProductModal from '../components/ProductModal/ProductModal'; // NOVO: Importa o modal

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
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null); // NOVO: Estado para o produto do modal

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

  const handleCategoryScroll = (categoryId: string) => {
    const section = document.getElementById(categoryId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // NOVO: Função para abrir o modal
  const handleProductClick = (product: Product) => {
    setSelectedProductForModal(product);
  };

  // NOVO: Função para fechar o modal
  const handleCloseModal = () => {
    setSelectedProductForModal(null);
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
              onProductClick={handleProductClick} // NOVO: Passa a função para o CategorySection/ProductCard
            />
          ))
      )}

      {/* NOVO: Renderiza o modal se um produto estiver selecionado */}
      <ProductModal 
        product={selectedProductForModal} 
        onClose={handleCloseModal} 
      />
    </PageContainer>
  );
};

export default MenuPage;