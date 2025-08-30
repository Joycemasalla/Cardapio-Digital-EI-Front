// src/pages/MenuPage.tsx
import React, { useEffect, useState } from 'react';
import CategorySection from '../components/CategorySection/CategorySection';
import { PageContainer, HeroSection, HeroContent, HeroTitle, HeroSubtitle } from './PageStyles';
import { useProducts, Product } from '../contexts/ProductContext';
import { Grid, List } from 'lucide-react';
import CategoryQuickLinks from '../components/CategoryQuickLinks/CategoryQuickLinks';
import ProductModal from '../components/ProductModal/ProductModal';
import { ViewToggleContainer, ViewToggleButton } from '../components/ProductCard/ProductCardStyles';


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
  
  // NOVO: estado para o modal, agora armazena também o modo inicial
  const [modalState, setModalState] = useState<{
    product: Product | null;
    initialPizzaMode: 'normal' | 'half-and-half';
  }>({ product: null, initialPizzaMode: 'normal' });
  

  // NOVO: Define a ordem customizada das categorias
  const customCategoryOrder = [
    'Pizzas',
    'Pizzas Doces',
    'Hambúrgueres Tradicionais',
    'Hambúrgueres Artesanais',
    'Porções',
    'Bebidas',
    'Combos',
    'Churrasco',
    // Adicione outras categorias aqui se você quiser uma ordem específica para elas também
    // Ex: 'Porções', 'Bebidas', 'Pizzas Doces'
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

      // NOVO: Aplica a ordenação customizada
      categoriesArray.sort((a, b) => {
        const indexA = customCategoryOrder.indexOf(a.name);
        const indexB = customCategoryOrder.indexOf(b.name);

        // Se ambos estão na ordem customizada, ordena pela posição na lista customizada
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        // Se apenas 'a' está na ordem customizada, 'a' vem primeiro
        if (indexA !== -1) {
          return -1;
        }
        // Se apenas 'b' está na ordem customizada, 'b' vem primeiro
        if (indexB !== -1) {
          return 1;
        }
        // Se nenhum está na ordem customizada, mantém a ordem alfabética pelo nome
        return a.name.localeCompare(b.name);
      });

      setCategories(categoriesArray);
    }
  }, [products]); // A dependência é `products` para que a ordem seja recalculada quando os produtos mudam

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

  // NOVO: Agora a função recebe o modo inicial do modal
  const handleProductClick = (product: Product, initialPizzaMode: 'normal' | 'half-and-half' = 'normal') => {
    setModalState({ product, initialPizzaMode });
  };
  
  const handleCloseModal = () => {
    setModalState({ product: null, initialPizzaMode: 'normal' });
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
              onProductClick={handleProductClick}
            />
          ))
      )}

      {/* NOVO: Passa o estado do modal para o ProductModal */}
      <ProductModal
        product={modalState.product}
        onClose={handleCloseModal}
        initialPizzaMode={modalState.initialPizzaMode}
      />
    </PageContainer>
  );
};

export default MenuPage;