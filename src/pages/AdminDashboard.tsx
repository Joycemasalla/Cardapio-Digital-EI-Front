import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, Product, ProductVariation, ProductAdditional } from '../contexts/ProductContext';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
// NOVO: Importa o hook para o contexto de adicionais
import { useAdditionals } from '../contexts/AdditionalContext';
import { ChevronDown, Plus, Edit, Trash2, X, Menu, UploadCloud } from 'lucide-react';
import {
  AdminDashboardContainer,
  AdminSidebar,
  AdminContent,
  AdminHeader,
  AdminTitle,
  ProductsTable,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  AddButton,
  AdminControls,
  NoProducts,
  ProductForm,
  FormTitle,
  CloseFormButton,
  TableImage,
  VariationsEditor,
  VariationItem,
  AddVariationButton,
  SelectLabel,
  SelectButton,
  ChevronIcon,
  DropdownList,
  DropdownItem,
  AdminMenuToggleButton,
  AdminMobileDrawer,
  AdminDrawerOverlay,
  CustomSelectContainer,
  InputFileContainer,
  InputFileName,
  UploadButton,
  AdminNav,
  AdminNavLink,
  // NOVOS: Styled components para a tela de adicionais
  AdditionalsListContainer,
  AdditionalsTable,
  CheckboxGroup,
  CheckboxLabel,
  CheckboxInput
} from './PageStyles';
import { FormGroup, Label, Input, Textarea, SubmitButton } from './PageStyles';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: 0.8rem;
  }
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  padding: 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  box-shadow: ${({ theme }) => theme.shadows.light};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StatTitle = styled.h4`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
  font-weight: 700;
`;

const CategoryStatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  text-align: left;
  max-height: 250px;
  overflow-y: auto;
`;

const CategoryStatItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.textDark};
  font-size: 0.9rem;

  &:last-child {
    border-bottom: none;
  }
`;

const CategoryName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  flex: 1;
`;

const CategoryValue = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;


interface ProductFormState {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageFile: File | null;
  category: string;
  dynamicVariations: ProductVariation[];
  selectedAdditionalIds: string[]; // NOVO: Campo para armazenar IDs de adicionais
}

// NOVO: Interface para o estado do formulário de adicionais
interface AdditionalFormState {
  id: string;
  name: string;
  price: number;
}

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  // NOVO: Adiciona a lista de adicionais do contexto
  const { additionals, addAdditional, updateAdditional, deleteAdditional } = useAdditionals();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentSection, setCurrentSection] = useState('products');

  const [isAdditionalFormVisible, setIsAdditionalFormVisible] = useState(false); // NOVO: Estado para mostrar o form de adicionais
  const [editingAdditional, setEditingAdditional] = useState<ProductAdditional | null>(null);
  const [additionalFormData, setAdditionalFormData] = useState<AdditionalFormState>({ id: '', name: '', price: 0 });

  const navigate = useNavigate();
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categorySelectRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [selectedProductCategoryFilter, setSelectedProductCategoryFilter] = useState('Todos os Produtos');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const customAdminCategoryOrder = [
    'Pizzas', 'Pizzas Doces', 'Hambúrgueres Tradicionais', 'Hambúrgueres Artesanais', 'Combos',
    'Churrasco', 'Porções', 'Chapas', 'Bebidas'
  ];

  const allCategories = [
    'Todos os Produtos',
    ...['Hambúrgueres Tradicionais', 'Hambúrgueres Artesanais', 'Porções', 'Pizzas', 'Pizzas Doces',
        'Bebidas', 'Combos', 'Churrasco', 'Chapas'
    ].sort((a, b) => {
      const indexA = customAdminCategoryOrder.indexOf(a);
      const indexB = customAdminCategoryOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    })
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categorySelectRef.current && !categorySelectRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && !showForm) {
        setIsDrawerOpen(false);
      }
    };
    if (isCategoryDropdownOpen || isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoryDropdownOpen, isDrawerOpen, showForm]);

  const resetAllStates = () => {
    setShowForm(false);
    setIsDrawerOpen(false);
    setIsCategoryDropdownOpen(false);
    resetForm();
  };

  useEffect(() => {
    const handleClickOutsideDrawer = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsDrawerOpen(false);
      }
    };
    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutsideDrawer);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDrawer);
    };
  }, [isDrawerOpen, drawerRef]);

  // NOVO: Adiciona o campo selectedAdditionalIds ao estado inicial do formulário
  const [formData, setFormData] = useState<ProductFormState>({
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    imageFile: null,
    category: '',
    dynamicVariations: [],
    selectedAdditionalIds: [], // NOVO
  });

  useEffect(() => {
    if (formData.imageFile) {
      const url = URL.createObjectURL(formData.imageFile);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreviewUrl(formData.image || null);
    }
  }, [formData.imageFile, formData.image]);

  const formatCurrency = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formCategories = allCategories.filter(cat => cat !== 'Todos os Produtos');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceChange = (floatValue: number | undefined, name: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: floatValue !== undefined ? floatValue : 0,
    }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      imageFile: file,
    });
  };

  const handleVariationChange = (index: number, field: keyof ProductVariation, value: string | number) => {
    const newVariations = [...formData.dynamicVariations];
    (newVariations[index] as any)[field] = value;
    setFormData({ ...formData, dynamicVariations: newVariations });
  };

  const addVariation = () => {
    setFormData(prevData => ({
      ...prevData,
      dynamicVariations: [...prevData.dynamicVariations, { name: '', price: 0 }],
    }));
  };

  const removeVariation = (index: number) => {
    const newVariations = formData.dynamicVariations.filter((_, i) => i !== index);
    setFormData({ ...formData, dynamicVariations: newVariations });
  };
  
  // NOVO: Funções para manipular a lista de adicionais
  const handleAdditionalCheckboxChange = (additionalId: string) => {
    setFormData(prevData => ({
      ...prevData,
      selectedAdditionalIds: prevData.selectedAdditionalIds.includes(additionalId)
        ? prevData.selectedAdditionalIds.filter(id => id !== additionalId)
        : [...prevData.selectedAdditionalIds, additionalId],
    }));
  };
  
  // NOVO: Funções e estados para o formulário de adicionar/editar adicionais
  const handleAdditionalFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdditionalFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleAdditionalPriceChange = (values: { floatValue: number | undefined }) => {
    setAdditionalFormData(prev => ({
      ...prev,
      price: values.floatValue !== undefined ? values.floatValue : 0,
    }));
  };

  const handleAddAdditionalClick = () => {
    setEditingAdditional(null);
    setAdditionalFormData({ id: '', name: '', price: 0 });
    setIsAdditionalFormVisible(true);
  };
  
  const handleEditAdditionalClick = (additional: ProductAdditional) => {
    setEditingAdditional(additional);
    setAdditionalFormData({ id: additional.id, name: additional.name, price: additional.price });
    setIsAdditionalFormVisible(true);
  };
  
  const handleAdditionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAdditional) {
        await updateAdditional(additionalFormData as ProductAdditional);
        toast.success('Adicional atualizado com sucesso!');
      } else {
        await addAdditional(additionalFormData as Omit<ProductAdditional, 'id'>);
        toast.success('Adicional adicionado com sucesso!');
      }
      setIsAdditionalFormVisible(false);
      setEditingAdditional(null);
      setAdditionalFormData({ id: '', name: '', price: 0 });
    } catch (error) {
      toast.error('Erro ao salvar adicional. Tente novamente.');
      console.error(error);
    }
  };
  
  const handleDeleteAdditional = async (additionalId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este adicional?')) {
      try {
        await deleteAdditional(additionalId);
        toast.success('Adicional excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir adicional. Tente novamente.');
      }
    }
  };
  // FIM DAS NOVAS FUNÇÕES PARA ADICIONAIS

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      imageFile: null,
      category: '',
      dynamicVariations: [],
      selectedAdditionalIds: [],
    });
    setEditingProduct(null);
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    setIsDrawerOpen(false);
    setSelectedProductCategoryFilter('Todos os Produtos');
  };

  const handleAddNewClick = () => {
    resetForm();
    setShowForm(true);
  };
  
  const handleEditClick = (product: Product) => {
    setFormData({
      ...product,
      price: product.price !== undefined ? product.price : 0,
      dynamicVariations: product.variations || [],
      selectedAdditionalIds: product.additionals ? product.additionals.map(a => a.id) : [],
      imageFile: null,
    });
    setEditingProduct(product);
    setShowForm(true);
  };


  useEffect(() => {
    if (showForm || isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm, isDrawerOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showForm) {
          setShowForm(false);
          resetForm();
        }
        if (isDrawerOpen) {
          setIsDrawerOpen(false);
        }
        if (isCategoryDropdownOpen) {
          setIsCategoryDropdownOpen(false);
        }
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showForm, isDrawerOpen, isCategoryDropdownOpen]);


  const handleDeleteClick = async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduct(productId);
        toast.success('Produto excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir produto. Tente novamente.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImageUrl = formData.image;

    try {
      if (formData.imageFile) {
        toast.info('Fazendo upload da imagem...');
        const uploadFormData = new FormData();
        uploadFormData.append('image', formData.imageFile);

        const uploadResponse = await fetch('https://cardapio-digital-ei-back.vercel.app/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Erro no upload da imagem');
        }
        const uploadResult = await uploadResponse.json();
        finalImageUrl = uploadResult.imageUrl;
        toast.success('Upload da imagem concluído!');
      }

      let productData: Product;

      if (formData.dynamicVariations.length > 0) {
        const parsedVariations = formData.dynamicVariations.map(v => {
          return {
            name: v.name,
            price: v.price
          };
        });

        const hasInvalidVariations = parsedVariations.some(v =>
          !v.name.trim() || isNaN(v.price) || v.price <= 0
        );
        if (hasInvalidVariations) {
          toast.error('Por favor, preencha todos os campos de Nome e Preço para cada variação, e o preço deve ser maior que zero.');
          return;
        }

        productData = {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          image: finalImageUrl,
          category: formData.category,
          variations: parsedVariations,
          price: undefined,
          additionals: formData.selectedAdditionalIds as unknown as ProductAdditional[], // NOVO: envia a lista de IDs
        };
      } else {
        const priceValue = formData.price;

        if (isNaN(priceValue) || priceValue <= 0) {
          toast.error('Por favor, insira um preço válido (maior que zero) para o produto.');
          return;
        }
        productData = {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          price: priceValue,
          image: finalImageUrl,
          category: formData.category,
          variations: undefined,
          additionals: formData.selectedAdditionalIds as unknown as ProductAdditional[], // NOVO: envia a lista de IDs
        };
      }

      if (editingProduct) {
        await updateProduct({ ...productData, id: editingProduct.id });
        toast.success('Produto atualizado com sucesso!');
      } else {
        await addProduct(productData);
        toast.success('Produto adicionado com sucesso!');
      }

      setShowForm(false);
      resetForm();
    } catch (error) {
      toast.error('Erro ao salvar produto. Verifique os dados e tente novamente.');
      console.error(error);
    }
  };

  const filteredProducts = products
    .filter(product => {
      if (selectedProductCategoryFilter === 'Todos os Produtos' || !selectedProductCategoryFilter) {
        return true;
      }
      return product.category === selectedProductCategoryFilter;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const getAdminTitle = () => {
    switch (currentSection) {
      case 'products':
        return `Gerenciar Produtos (${selectedProductCategoryFilter})`;
      case 'additionals':
        return 'Gerenciar Adicionais';
      case 'statistics':
        return 'Estatísticas do Cardápio';
      default:
        return 'Painel de Administração';
    }
  };

  const totalProductsCount = products.length;
  const totalProductsValue = products.reduce((sum, product) => {
    if (product.variations && product.variations.length > 0) {
      return sum + product.variations[0].price;
    }
    return sum + (product.price || 0);
  }, 0);

  const categoryStats: { [key: string]: { count: number; totalValue: number } } = {};
  products.forEach(product => {
    if (!categoryStats[product.category]) {
      categoryStats[product.category] = { count: 0, totalValue: 0 };
    }
    categoryStats[product.category].count++;
    if (product.variations && product.variations.length > 0) {
      categoryStats[product.category].totalValue += product.variations[0].price;
    } else {
      categoryStats[product.category].totalValue += (product.price || 0);
    }
  });

  const sortedCategoryStats = Object.entries(categoryStats).sort(([, a], [, b]) => b.totalValue - a.totalValue);


  return (
    <AdminDashboardContainer>
      <AdminDrawerOverlay
        $isOpen={isDrawerOpen && !showForm}
        onClick={() => setIsDrawerOpen(false)}
      />
      <AdminMobileDrawer $isOpen={isDrawerOpen && !showForm} ref={drawerRef}>
        <div className="drawer-header">
          <span className="drawer-title">Menu de Administração</span>
          <CloseFormButton onClick={() => setIsDrawerOpen(false)}>
            <X size={24} />
          </CloseFormButton>
        </div>
        <AdminSidebar style={{ display: 'block', width: '100%', padding: 0, border: 'none' }}>
          <h3>Navegação</h3>
          <ul>
            <li
              className={currentSection === 'products' ? 'active' : ''}
              onClick={() => handleSectionChange('products')}
            >
              Produtos
            </li>
             <li
              className={currentSection === 'additionals' ? 'active' : ''}
              onClick={() => handleSectionChange('additionals')}
            >
              Adicionais
            </li>
            <li
              className={currentSection === 'statistics' ? 'active' : ''}
              onClick={() => handleSectionChange('statistics')}
            >
              Estatísticas
            </li>
          </ul>
        </AdminSidebar>
        {currentSection === 'products' && (
          <div className="drawer-category-filter">
            <SelectLabel htmlFor="product-category-filter">Filtrar Produtos por Categoria</SelectLabel>
            <CustomSelectContainer style={{ maxWidth: '100%' }}>
              <SelectButton
                className={isCategoryDropdownOpen ? 'open' : ''}
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                type="button"
              >
                <span>{selectedProductCategoryFilter}</span>
                <ChevronIcon className={isCategoryDropdownOpen ? 'rotated' : ''}>
                  <ChevronDown size={20} />
                </ChevronIcon>
              </SelectButton>
              {isCategoryDropdownOpen && (
                <DropdownList>
                  {allCategories.map((categoryName) => (
                    <DropdownItem
                      key={categoryName}
                      className={selectedProductCategoryFilter === categoryName ? 'selected' : ''}
                      onClick={() => {
                        setSelectedProductCategoryFilter(categoryName);
                        setIsCategoryDropdownOpen(false);
                      }}
                    >
                      {categoryName}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </CustomSelectContainer>
          </div>
        )}
      </AdminMobileDrawer>

      <AdminNav>
        <AdminMenuToggleButton onClick={() => setIsDrawerOpen(true)}>
          <Menu size={24} />
        </AdminMenuToggleButton>
        <AdminNavLink
          className={currentSection === 'products' ? 'active' : ''}
          onClick={() => handleSectionChange('products')}
        >
          Produtos
        </AdminNavLink>
        <AdminNavLink
          className={currentSection === 'additionals' ? 'active' : ''}
          onClick={() => handleSectionChange('additionals')}
        >
          Adicionais
        </AdminNavLink>
        <AdminNavLink
          className={currentSection === 'statistics' ? 'active' : ''}
          onClick={() => handleSectionChange('statistics')}
        >
          Estatísticas
        </AdminNavLink>
      </AdminNav>

      <AdminContent>
        <AdminHeader>
          <AdminMenuToggleButton onClick={() => setIsDrawerOpen(true)}>
            <Menu size={24} />
          </AdminMenuToggleButton>
          <AdminTitle style={{
            textAlign: 'center',
            flex: 1,
            margin: '0 1rem'
          }}>
            {getAdminTitle()}
          </AdminTitle>
          {currentSection === 'products' && (
            <AdminControls>
              <AddButton onClick={handleAddNewClick}>
                <Plus size={16} />
                <span style={{ display: window.innerWidth > 600 ? 'inline' : 'none' }}>
                  Adicionar Produto
                </span>
              </AddButton>
            </AdminControls>
          )}
          {currentSection === 'additionals' && (
            <AdminControls>
              <AddButton onClick={handleAddAdditionalClick}>
                <Plus size={16} />
                <span style={{ display: window.innerWidth > 600 ? 'inline' : 'none' }}>
                  Adicionar Adicional
                </span>
              </AddButton>
            </AdminControls>
          )}
        </AdminHeader>
        {currentSection === 'products' && (
          <>
            <div className="main-content-category-filter">
              <SelectLabel htmlFor="product-category-filter-main">Filtrar por Categoria</SelectLabel>
              <CustomSelectContainer style={{ maxWidth: '300px', margin: '0 auto 1.5rem auto' }}>
                <SelectButton
                  className={isCategoryDropdownOpen ? 'open' : ''}
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  type="button"
                >
                  <span>{selectedProductCategoryFilter}</span>
                  <ChevronIcon className={isCategoryDropdownOpen ? 'rotated' : ''}>
                    <ChevronDown size={20} />
                  </ChevronIcon>
                </SelectButton>
                {isCategoryDropdownOpen && (
                  <DropdownList>
                    {allCategories.map((categoryName) => (
                      <DropdownItem
                        key={categoryName}
                        className={selectedProductCategoryFilter === categoryName ? 'selected' : ''}
                        onClick={() => {
                          setSelectedProductCategoryFilter(categoryName);
                          setIsCategoryDropdownOpen(false);
                        }}
                      >
                        {categoryName}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </CustomSelectContainer>
            </div>
            {loading ? (
              <div>Carregando...</div>
            ) : products.length === 0 ? (
              <NoProducts>
                <p>Nenhum produto cadastrado</p>
                <AddButton onClick={handleAddNewClick}>
                  <Plus size={16} />
                  Adicionar Produto
                </AddButton>
              </NoProducts>
            ) : (
              <ProductsTable>
                <thead>
                  <TableRow>
                    <TableHeader>Imagem</TableHeader>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>Categoria</TableHeader>
                    <TableHeader>Preço/Variações</TableHeader>
                    <TableHeader>Ações</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell data-label="Imagem">
                        <TableImage src={product.image || 'https://via.placeholder.com/60'} alt={product.name} />
                      </TableCell>
                      <TableCell data-label="Nome">{product.name}</TableCell>
                      <TableCell data-label="Categoria">{product.category}</TableCell>
                      <TableCell data-label="Preço/Variações">
                        {product.variations && product.variations.length > 0 ? (
                          product.variations.map((v, i) => (
                            <div key={i}>{v.name}: {formatCurrency(v.price)}</div>
                          ))
                        ) : (
                          formatCurrency(product.price)
                        )}
                      </TableCell>
                      <TableCell data-label="Ações" className="actions">
                        <ActionButton onClick={() => handleEditClick(product)}>
                          <Edit size={16} />
                        </ActionButton>
                        <ActionButton
                          className="delete"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </ProductsTable>
            )}
          </>
        )}
        {currentSection === 'additionals' && (
          <AdditionalsListContainer>
            <AdditionalsTable>
              <thead>
                <TableRow>
                  <TableHeader>Nome</TableHeader>
                  <TableHeader>Preço</TableHeader>
                  <TableHeader>Ações</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {additionals.map((additional) => (
                  <TableRow key={additional.id}>
                    <TableCell data-label="Nome">{additional.name}</TableCell>
                    <TableCell data-label="Preço">{formatCurrency(additional.price)}</TableCell>
                    <TableCell data-label="Ações" className="actions">
                      <ActionButton onClick={() => handleEditAdditionalClick(additional)}>
                        <Edit size={16} />
                      </ActionButton>
                      <ActionButton
                        className="delete"
                        onClick={() => handleDeleteAdditional(additional.id)}
                      >
                        <Trash2 size={16} />
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </AdditionalsTable>
          </AdditionalsListContainer>
        )}
        {currentSection === 'statistics' && (
          <StatsContainer>
            <StatCard>
              <StatTitle>Total de Produtos</StatTitle>
              <StatValue>{totalProductsCount}</StatValue>
            </StatCard>
            <StatCard>
              <StatTitle>Valor Total do Cardápio</StatTitle>
              <StatValue>{formatCurrency(totalProductsValue)}</StatValue>
            </StatCard>
            <StatCard style={{ gridColumn: 'span 2' }}>
              <StatTitle>Produtos por Categoria</StatTitle>
              <CategoryStatsList>
                {sortedCategoryStats.map(([categoryName, stats]) => (
                  <CategoryStatItem key={categoryName}>
                    <CategoryName>{categoryName}</CategoryName>
                    <CategoryValue>
                      {stats.count} itens - {formatCurrency(stats.totalValue)}
                    </CategoryValue>
                  </CategoryStatItem>
                ))}
              </CategoryStatsList>
            </StatCard>
          </StatsContainer>
        )}
        {showForm && (
          <>
            <AdminDrawerOverlay $isOpen={true} onClick={resetAllStates} />
            <ProductForm onSubmit={handleSubmit}>
              <div className="form-header">
                <FormTitle>
                  {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
                </FormTitle>
                <CloseFormButton type="button" onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}>
                  <X size={24} />
                </CloseFormButton>
              </div>
              <FormGroup>
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <SelectLabel htmlFor="category-select-admin">Categoria</SelectLabel>
                <div ref={categorySelectRef} style={{ width: '100%', position: 'relative' }}>
                  <CustomSelectContainer style={{ maxWidth: '100%' }}>
                    <SelectButton
                      className={isCategoryDropdownOpen ? 'open' : ''}
                      onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                      type="button"
                    >
                      <span>{formData.category || 'Selecione uma categoria'}</span>
                      <ChevronIcon className={isCategoryDropdownOpen ? 'rotated' : ''}>
                        <ChevronDown size={20} />
                      </ChevronIcon>
                    </SelectButton>
                    {isCategoryDropdownOpen && (
                      <DropdownList>
                        <DropdownItem
                          className={!formData.category ? 'selected' : ''}
                          onClick={() => {
                            setFormData({ ...formData, category: '' });
                            setIsCategoryDropdownOpen(false);
                          }}
                        >
                          Selecione uma categoria
                        </DropdownItem>
                        {formCategories.map((category) => (
                          <DropdownItem
                            key={category}
                            className={formData.category === category ? 'selected' : ''}
                            onClick={() => {
                              setFormData({ ...formData, category: category });
                              setIsCategoryDropdownOpen(false);
                            }}
                          >
                            {category}
                          </DropdownItem>
                        ))}
                      </DropdownList>
                    )}
                  </CustomSelectContainer>
                </div>
              </FormGroup>
              <VariationsEditor>
                <Label>Variações do Produto</Label>
                {formData.dynamicVariations.map((variation, index) => (
                  <VariationItem key={index}>
                    <Input
                      className="variation-input"
                      type="text"
                      placeholder="Nome da Variação (ex: Pequena)"
                      value={variation.name}
                      onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
                      required
                    />
                    <NumericFormat
                      value={variation.price}
                      onValueChange={(values) => {
                        handleVariationChange(index, 'price', values.floatValue !== undefined ? values.floatValue : 0);
                      }}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      fixedDecimalScale={true}
                      allowNegative={false}
                      placeholder="R$ 0,00"
                      customInput={Input}
                      className="variation-input"
                      required
                    />
                    <ActionButton
                      className="delete"
                      type="button"
                      onClick={() => removeVariation(index)}
                    >
                      <Trash2 size={16} />
                    </ActionButton>
                  </VariationItem>
                ))}
                <AddVariationButton type="button" onClick={addVariation}>
                  <Plus size={16} /> Adicionar Variação
                </AddVariationButton>
              </VariationsEditor>
              {/* NOVO: Lista de checkboxes para selecionar adicionais */}
              <FormGroup>
                <Label>Adicionais</Label>
                <CheckboxGroup>
                  {additionals.map(additional => (
                    <CheckboxLabel key={additional.id}>
                      <CheckboxInput
                        type="checkbox"
                        checked={formData.selectedAdditionalIds.includes(additional.id)}
                        onChange={() => handleAdditionalCheckboxChange(additional.id)}
                      />
                      {additional.name} 
                    </CheckboxLabel>
                  ))}
                </CheckboxGroup>
              </FormGroup>
              {formData.dynamicVariations.length === 0 && (
                <FormGroup>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <NumericFormat
                    value={formData.price}
                    onValueChange={(values) => {
                      handlePriceChange(values.floatValue, 'price');
                    }}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    placeholder="R$ 0,00"
                    customInput={Input}
                    id="price"
                    name="price"
                    required
                  />
                </FormGroup>
              )}
              <FormGroup>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="image">URL da Imagem</Label>
                <InputFileContainer>
                  <Input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    style={{ display: 'none' }}
                  />
                  <UploadButton htmlFor="imageFile">
                    <UploadCloud size={20} /> Selecionar Imagem
                  </UploadButton>
                  {formData.imageFile && (
                    <InputFileName>{formData.imageFile.name}</InputFileName>
                  )}
                  {(imagePreviewUrl && !formData.imageFile) && (
                    <InputFileName>{formData.image}</InputFileName>
                  )}
                </InputFileContainer>
                {imagePreviewUrl && (
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <img src={imagePreviewUrl} alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px', objectFit: 'contain' }} />
                  </div>
                )}
              </FormGroup>
              <SubmitButton type="submit">
                {editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
              </SubmitButton>
            </ProductForm>
          </>
        )}
        {isAdditionalFormVisible && (
          <ProductForm onSubmit={handleAdditionalSubmit} style={{ zIndex: 1250 }}>
            <div className="form-header">
              <FormTitle>
                {editingAdditional ? 'Editar Adicional' : 'Adicionar Adicional'}
              </FormTitle>
              <CloseFormButton onClick={() => setIsAdditionalFormVisible(false)}>
                <X size={24} />
              </CloseFormButton>
            </div>
            <FormGroup>
              <Label htmlFor="additional-name">Nome do Adicional</Label>
              <Input
                type="text"
                id="additional-name"
                name="name"
                value={additionalFormData.name}
                onChange={handleAdditionalFormChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="additional-price">Preço (R$)</Label>
              <NumericFormat
                value={additionalFormData.price}
                onValueChange={handleAdditionalPriceChange}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                placeholder="R$ 0,00"
                customInput={Input}
                id="additional-price"
                name="price"
                required
              />
            </FormGroup>
            <SubmitButton type="submit">
              {editingAdditional ? 'Atualizar Adicional' : 'Adicionar Adicional'}
            </SubmitButton>
          </ProductForm>
        )}
      </AdminContent>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;