// src/components/CategoryQuickLinks/CategoryQuickLinks.tsx
import React, { useState, useEffect, useRef } from 'react'; // Adicionado useRef
import { useProducts, Product } from '../../contexts/ProductContext';
import { ChevronDown } from 'lucide-react'; // Importado para o ícone de seta
import {
  QuickLinksContainer,
  CustomSelectContainer, // NOVO: Container principal do select customizado
  SelectButton, // NOVO: Botão do select customizado
  ChevronIcon, // NOVO: Ícone de seta
  DropdownList, // NOVO: Lista de opções
  DropdownItem // NOVO: Item da lista de opções
} from './CategoryQuickLinksStyles';

const normalizeId = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
};

interface CategoryQuickLinksProps {
  onCategoryClick: (categoryId: string) => void;
}

const CategoryQuickLinks: React.FC<CategoryQuickLinksProps> = ({ onCategoryClick }) => {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar se o dropdown está aberto
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null);
  const selectRef = useRef<HTMLDivElement>(null); // Ref para detectar cliques fora

  // Categorias únicas
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  ).map(categoryName => ({
    name: categoryName,
    id: normalizeId(categoryName)
  }));

  // Define a categoria "Todas as Categorias" como selecionada inicialmente
  useEffect(() => {
    if (!selectedCategory) {
      setSelectedCategory({ id: '', name: 'Todas as Categorias' });
    }
  }, [selectedCategory]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (category: { id: string; name: string }) => {
    setSelectedCategory(category);
    onCategoryClick(category.id);
    setIsOpen(false);
  };

  return (
    <QuickLinksContainer>
      <CustomSelectContainer ref={selectRef}>
        <SelectButton className={isOpen ? 'open' : ''} onClick={handleButtonClick}>
          <span>{selectedCategory ? selectedCategory.name : 'Todas as Categorias'}</span>
          <ChevronIcon className={isOpen ? 'rotated' : ''}>
            <ChevronDown size={20} />
          </ChevronIcon>
        </SelectButton>

        {isOpen && (
          <DropdownList>
            <DropdownItem
              className={selectedCategory?.id === '' ? 'selected' : ''}
              onClick={() => handleItemClick({ id: '', name: 'Todas as Categorias' })}
            >
              Todas as Categorias
            </DropdownItem>
            {uniqueCategories.map((category) => (
              <DropdownItem
                key={category.id}
                className={selectedCategory?.id === category.id ? 'selected' : ''}
                onClick={() => handleItemClick(category)}
              >
                {category.name}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </CustomSelectContainer>
    </QuickLinksContainer>
  );
};

export default CategoryQuickLinks;