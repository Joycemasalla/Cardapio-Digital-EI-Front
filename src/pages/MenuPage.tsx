// src/pages/MenuPage.tsx
import React, { useEffect, useState } from 'react';
import CategorySection from '../components/CategorySection/CategorySection';
import { PageContainer, HeroSection, HeroContent, HeroTitle, HeroSubtitle } from './PageStyles';
import { useProducts, Product } from '../contexts/ProductContext';
import CategoryQuickLinks from '../components/CategoryQuickLinks/CategoryQuickLinks';
import ProductModal from '../components/ProductModal/ProductModal';

type CategoryType = {
  id: string;
  name: string;
  products: Product[];
};

const MenuPage = () => {
  const { products, loading } = useProducts();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isListView, setIsListView] = useState(true);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [initialModeForModal, setInitialModeForModal] = useState<'normal' | 'half-and-half' | undefined>(undefined);

  // Define a ordem customizada das categorias
  const customCategoryOrder = [
    'Pizzas',
    'Pizzas Doces',
    'Hambúrgueres Tradicionais',
    'Hambúrgueres Artesanais',
    'Porções',
    'Bebidas',
    'Combos',
    'Churrasco',
  ];

  useEffect(() => {
    if (products.length > 0) {
      const categoriesMap: { [key: string]: Product[] } = {};

      products.forEach((product) => {
        if (!categoriesMap[product.category]) {
          categoriesMap[product.category] = [];
        }
        categoriesMap[product.category].push(product);
      });

      let categoriesArray: CategoryType[] = Object.entries(categoriesMap).map(
        ([name, products]) => ({
          id: normalizeId(name),
          name,
          products,
        })
      );

      // Aplica a ordenação customizada
      categoriesArray.sort((a, b) => {
        const indexA = customCategoryOrder.indexOf(a.name);
        const indexB = customCategoryOrder.indexOf(b.name);

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        if (indexA !== -1) {
          return -1;
        }
        if (indexB !== -1) {
          return 1;
        }
        return a.name.localeCompare(b.name);
      });

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

  const handleProductClick = (product: Product, initialMode?: 'normal' | 'half-and-half') => {
    setSelectedProductForModal(product);
    setInitialModeForModal(initialMode);
  };

  const handleCloseModal = () => {
    setSelectedProductForModal(null);
    setInitialModeForModal(undefined);
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Espaço Imperial</HeroTitle>
          <HeroSubtitle>Sabores que conquistam</HeroSubtitle>
        </HeroContent>
      </HeroSection>

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
              onProductClick={handleProductClick}
            />
          ))
      )}

      <ProductModal
        product={selectedProductForModal}
        onClose={handleCloseModal}
        initialMode={initialModeForModal}
      />
    </PageContainer>
  );
};

export default MenuPage;