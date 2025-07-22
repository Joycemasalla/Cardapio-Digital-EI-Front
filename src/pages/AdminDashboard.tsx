// src/pages/AdminDashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, Product, ProductVariation } from '../contexts/ProductContext';
import { NumericFormat } from 'react-number-format'; // Importar NumericFormat

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
  AdminNavLink
} from './PageStyles';
import { FormGroup, Label, Input, Textarea, SubmitButton } from './PageStyles';
import { toast } from 'react-toastify';

// Interface atualizada para armazenar 'price' como number diretamente no formulário
interface ProductVariationForm extends Omit<ProductVariation, 'price'> {
  price: number; // Armazena o número puro do NumericFormat
}

interface ProductFormState {
  id: string;
  name: string;
  description: string;
  price: number; // Armazena o número puro do NumericFormat
  image?: string;
  imageFile: File | null;
  category: string;
  dynamicVariations: ProductVariationForm[];
}

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentSection, setCurrentSection] = useState('products');
  const navigate = useNavigate();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categorySelectRef = useRef<HTMLDivElement>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [selectedProductCategoryFilter, setSelectedProductCategoryFilter] = useState('Todos os Produtos');

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const customAdminCategoryOrder = [
    'Pizzas',
    'Hambúrgueres Tradicionais',
    'Hambúrgueres Artesanais',
    'Combos',
    'Churrasco',
    'Porções',
    'Pizzas Doces',
    'Bebidas'
  ];

  const allCategories = [
    'Todos os Produtos',
    ...[
      'Hambúrgueres Tradicionais',
      'Hambúrgueres Artesanais',
      'Porções',
      'Pizzas',
      'Pizzas Doces',
      'Bebidas',
      'Combos',
      'Churrasco'
    ].sort((a, b) => {
      const indexA = customAdminCategoryOrder.indexOf(a);
      const indexB = customAdminCategoryOrder.indexOf(b);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) {
        return -1;
      }
      if (indexB !== -1) {
        return 1;
      }
      return a.localeCompare(b);
    })
  ];

  useEffect(() => {
    const handleClickOutsideFormDropdown = (event: MouseEvent) => {
      if (categorySelectRef.current && !categorySelectRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideFormDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideFormDropdown);
    };
  }, [categorySelectRef]);

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

  const [formData, setFormData] = useState<ProductFormState>({
    id: '',
    name: '',
    description: '',
    price: 0, // Inicializa como número
    image: '',
    imageFile: null,
    category: '',
    dynamicVariations: [],
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

  // Função para formatar preço para exibição (em tabelas, etc.)
  const formatCurrency = (value: number | undefined): string => {
    if (value === undefined || isNaN(value)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // A função parseCurrency não é mais necessária para valores que vêm do NumericFormat,
  // pois ele já nos dá o floatValue diretamente.

  const formCategories = allCategories.filter(cat => cat !== 'Todos os Produtos');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Para campos que não são preço, mantém a lógica existente
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler para os campos de preço usando NumericFormat - AGORA SALVA O NÚMERO DIRETO
  const handlePriceChange = (floatValue: number | undefined, name: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: floatValue !== undefined ? floatValue : 0, // Salva o floatValue diretamente
    }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      imageFile: file,
    });
  };

  // Handler para variações - AGORA SALVA O NÚMERO DIRETO
  const handleVariationChange = (index: number, field: keyof ProductVariationForm, value: string | number) => {
    const newVariations = [...formData.dynamicVariations];
    // Se o campo for 'price', o 'value' já será o floatValue do NumericFormat
    // Caso contrário, apenas atribui o valor
    (newVariations[index] as any)[field] = value;
    setFormData({ ...formData, dynamicVariations: newVariations });
  };


  const addVariation = () => {
    setFormData(prevData => ({
      ...prevData,
      dynamicVariations: [...prevData.dynamicVariations, { name: '', price: 0 }], // Inicializa price como número
    }));
  };

  const removeVariation = (index: number) => {
    const newVariations = formData.dynamicVariations.filter((_, i) => i !== index);
    setFormData({ ...formData, dynamicVariations: newVariations });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: 0, // Resetado para número
      image: '',
      imageFile: null,
      category: '',
      dynamicVariations: [],
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
      price: product.price !== undefined ? product.price : 0, // Passa o número diretamente para o estado
      dynamicVariations: product.variations ? product.variations.map(v => ({
        ...v,
        price: v.price // Passa o número diretamente
      })) : [],
      imageFile: null,
    });
    setEditingProduct(product);
    setShowForm(true);
  };

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


        // CORREÇÃO: Usar a URL do backend hospedado no Render.com para o upload
        const uploadResponse = await fetch('https://cardapio-digital-ei-back.onrender.com/api/upload', {
          method: 'POST',
          body: uploadFormData, // Multer espera FormData
        });


        //   const uploadResponse = await fetch('http://localhost:3001/api/upload', { // Rota de upload do seu backend
        //   method: 'POST',
        //   body: uploadFormData, // Multer espera FormData
        // });


        if (!uploadResponse.ok) {
          throw new Error('Erro no upload da imagem');
        }
        const uploadResult = await uploadResponse.json();
        finalImageUrl = uploadResult.imageUrl; // Obtém a URL do Cloudinary
        toast.success('Upload da imagem concluído!');
      }

      let productData: Product;

      if (formData.dynamicVariations.length > 0) {
        // Os preços das variações já estão como number no formData.dynamicVariations
        const parsedVariations = formData.dynamicVariations.map(v => {
          return {
            name: v.name,
            price: v.price // Já é um número
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
          variations: parsedVariations, // Envia as variações com preço como number
          price: undefined
        };
      } else {
        // O preço do produto principal já está como number em formData.price
        const priceValue = formData.price;

        if (isNaN(priceValue) || priceValue <= 0) {
          toast.error('Por favor, insira um preço válido (maior que zero) para o produto.');
          return;
        }
        productData = {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          price: priceValue, // Envia o preço como number
          image: finalImageUrl,
          category: formData.category,
          variations: undefined
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
    return `Gerenciar Produtos (${selectedProductCategoryFilter})`;
  };

  return (
    <AdminDashboardContainer>
      <AdminDrawerOverlay $isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />
      <AdminMobileDrawer $isOpen={isDrawerOpen} ref={drawerRef}>
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
      </AdminNav>

      <AdminContent>
        <AdminHeader>
          <AdminTitle>{getAdminTitle()}</AdminTitle>
          <AdminControls>
            <AddButton onClick={handleAddNewClick}>
              <Plus size={16} />
              Adicionar Produto
            </AddButton>
          </AdminControls>
        </AdminHeader>

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

        {showForm && (
          <ProductForm onSubmit={handleSubmit}>
            <div className="form-header">
              <FormTitle>
                {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
              </FormTitle>
              <CloseFormButton type="button" onClick={() => setShowForm(false)}>
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

            {/* Início da correção: Bloco VariationsEditor com NumericFormat */}
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
                  {/* NumericFormat para o preço da variação */}
                  <NumericFormat
                    value={variation.price} // Passa o número diretamente para o componente
                    onValueChange={(values) => {
                      handleVariationChange(index, 'price', values.floatValue !== undefined ? values.floatValue : 0); // Salva o floatValue
                    }}
                    thousandSeparator="." // Separador de milhares
                    decimalSeparator="," // Separador decimal
                    prefix="R$ " // Prefixo da moeda
                    decimalScale={2} // Duas casas decimais
                    fixedDecimalScale={true} // Sempre mostra duas casas decimais
                    allowNegative={false} // Não permite números negativos
                    placeholder="R$ 0,00"
                    customInput={Input} // Usa o seu componente Input estilizado
                    className="variation-input" // Mantenha suas classes de estilo
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
            {/* Fim da correção: Bloco VariationsEditor */}

            {formData.dynamicVariations.length === 0 && (
              <FormGroup>
                <Label htmlFor="price">Preço (R$)</Label>
                {/* NumericFormat para o preço principal */}
                <NumericFormat
                  value={formData.price} // Passa o número diretamente para o componente
                  onValueChange={(values) => {
                    handlePriceChange(values.floatValue, 'price'); // Salva o floatValue
                  }}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  placeholder="R$ 0,00"
                  customInput={Input} // Usa o seu componente Input estilizado
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
        )}
      </AdminContent>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;