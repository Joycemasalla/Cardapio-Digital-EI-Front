import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, Product, ProductVariation } from '../contexts/ProductContext';
import InputMask from 'react-input-mask';
import { ChevronDown, Plus, Edit, Trash2, X, Menu, UploadCloud } from 'lucide-react'; // NOVO: Importa UploadCloud
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
  InputFileContainer, // NOVO: Estilo para o input de arquivo
  InputFileName, // NOVO: Estilo para mostrar o nome do arquivo
  UploadButton // NOVO: Estilo para o botão de upload
} from './PageStyles'; // Adicione InputFileContainer, InputFileName, UploadButton aqui
import { FormGroup, Label, Input, Textarea, SubmitButton } from './PageStyles';
import { toast } from 'react-toastify';


interface ProductFormState {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string; // Continua sendo a URL final
  imageFile: File | null; // NOVO: Para o arquivo selecionado
  category: string;
  dynamicVariations: ProductVariation[];
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

  // NOVO: Estado para a pré-visualização da imagem
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);


  const allCategories = [
    'Todos os Produtos',
    'Hambúrgueres Tradicionais',
    'Hambúrgueres Artesanais',
    'Porções',
    'Pizzas',
    'Pizzas Doces',
    'Bebidas',
    'Combos',
    'Churrasco'
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
    price: '',
    image: '',
    imageFile: null, // Inicializa como nulo
    category: '',
    dynamicVariations: [],
  });

  // NOVO: Efeito para criar URL de preview quando um arquivo é selecionado
  useEffect(() => {
    if (formData.imageFile) {
      const url = URL.createObjectURL(formData.imageFile);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url); // Limpa a URL do objeto quando o componente desmonta ou o arquivo muda
    } else {
      setImagePreviewUrl(formData.image || null); // Se não há arquivo, mostra a URL existente do produto
    }
  }, [formData.imageFile, formData.image]);


  const formCategories = allCategories.filter(cat => cat !== 'Todos os Produtos');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | React.ChangeEvent<HTMLTextAreaElement> | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // NOVO: Handler para o input de arquivo
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      imageFile: file,
    });
  };


  const handleVariationChange = (index: number, field: keyof ProductVariation, value: string) => {
    const newVariations = [...formData.dynamicVariations];
    let parsedValue: string | number = value;

    if (field === 'price') {
      const cleanValue = value.replace('R$', '').replace(/\./g, '').replace(',', '.');
      parsedValue = parseFloat(cleanValue) || 0;
    }

    (newVariations[index] as any)[field] = parsedValue;

    setFormData({ ...formData, dynamicVariations: newVariations });
  };

  const addVariation = () => {
    setFormData({
      ...formData,
      dynamicVariations: [...formData.dynamicVariations, { name: '', price: 0 }],
    });
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
      price: '',
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
      price: product.price != null ? product.price.toFixed(2).replace('.', ',') : '',
      dynamicVariations: product.variations || [],
      imageFile: null, // Ao editar, não há arquivo pré-selecionado
    } as ProductFormState);
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

    let finalImageUrl = formData.image; // Assume a URL existente por padrão

    try {
      // NOVO: Se um arquivo de imagem foi selecionado, faça o upload primeiro
      if (formData.imageFile) {
        toast.info('Fazendo upload da imagem...');
        const uploadFormData = new FormData();
        uploadFormData.append('image', formData.imageFile);

        // CORREÇÃO: Altere esta linha para a URL do seu backend no Render
        const uploadResponse = await fetch('https://cardapio-digital-ei-back.onrender.com/api/upload', { // Rota de upload do seu backend
          // const uploadResponse = await fetch('http://localhost:3001/api/upload', { // Remova ou comente esta linha
          method: 'POST',
          body: uploadFormData, // Multer espera FormData
        });

        if (!uploadResponse.ok) {
          throw new Error('Erro no upload da imagem');
        }
        const uploadResult = await uploadResponse.json();
        finalImageUrl = uploadResult.imageUrl; // Obtém a URL do Cloudinary
        toast.success('Upload da imagem concluído!');
      }

      let productData: Product;

      if (formData.dynamicVariations.length > 0) {
        const hasInvalidVariations = formData.dynamicVariations.some(v =>
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
          image: finalImageUrl, // Usa a URL final (Cloudinary ou original)
          category: formData.category,
          variations: formData.dynamicVariations,
          price: undefined
        };
      } else {
        const priceValue = parseFloat(formData.price.replace('R$', '').replace(/\./g, '').replace(',', '.'));
        if (isNaN(priceValue) || priceValue <= 0) {
          toast.error('Por favor, insira um preço válido (maior que zero) para o produto.');
          return;
        }
        productData = {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          price: priceValue,
          image: finalImageUrl, // Usa a URL final (Cloudinary ou original)
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

  const filteredProducts = products.filter(product => {
    if (selectedProductCategoryFilter === 'Todos os Produtos' || !selectedProductCategoryFilter) {
      return true;
    }
    return product.category === selectedProductCategoryFilter;
  });

  const getAdminTitle = () => {
    return `Gerenciar Produtos (${selectedProductCategoryFilter})`;
  };


  return (
    <AdminDashboardContainer>
      <AdminDrawerOverlay $isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />
      <AdminMobileDrawer $isOpen={isDrawerOpen} ref={drawerRef}>
        <div className="drawer-header">
          <span className="drawer-title">Menu de Administração</span>
          <button className="drawer-close-button" onClick={() => setIsDrawerOpen(false)}>
            <X size={24} />
          </button>
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


      <AdminSidebar>
        <div className="sidebar-menu">
          <h3>Menu</h3>
          <ul>
            <li
              className={currentSection === 'products' ? 'active' : ''}
              onClick={() => handleSectionChange('products')}
            >
              Produtos
            </li>
          </ul>
        </div>
      </AdminSidebar>

      <AdminContent>
        <AdminHeader>
          <AdminMenuToggleButton onClick={() => setIsDrawerOpen(true)}>
            <Menu size={24} />
          </AdminMenuToggleButton>
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
                        <div key={i}>{v.name}: R$ {v.price.toFixed(2).replace('.', ',')}</div>
                      ))
                    ) : (
                      product.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : 'N/A'
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
                  <InputMask
                    mask="R$ 99,99"
                    maskChar={null}
                    className="variation-input"
                    placeholder="R$ 0,00"
                    value={variation.price.toFixed(2).replace('.', ',')}
                    onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
                    required
                  >
                    {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => <Input {...inputProps} />}
                  </InputMask>
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

            {formData.dynamicVariations.length === 0 && (
              <FormGroup>
                <Label htmlFor="price">Preço (R$)</Label>
                <InputMask
                  mask="R$ 99,99"
                  maskChar={null}
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="R$ 0,00"
                  required
                >
                  {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => <Input {...inputProps} />}
                </InputMask>
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
              {/* NOVO: Input de arquivo para imagem e pré-visualização */}
              <InputFileContainer>
                <Input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleImageFileChange} // Novo handler para arquivo
                  style={{ display: 'none' }} // Esconde o input file original
                />
                <UploadButton htmlFor="imageFile">
                  <UploadCloud size={20} /> Selecionar Imagem
                </UploadButton>
                {formData.imageFile && (
                  <InputFileName>{formData.imageFile.name}</InputFileName>
                )}
                {(imagePreviewUrl && !formData.imageFile) && ( // Mostra URL original se não houver arquivo novo
                  <InputFileName>{formData.image}</InputFileName>
                )}
              </InputFileContainer>
              {imagePreviewUrl && ( // Pré-visualização da imagem
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <img src={imagePreviewUrl} alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px', objectFit: 'contain' }} />
                </div>
              )}
              {/* REMOVIDO: O input de URL de imagem que era usado antes */}
              {/* <Input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              /> */}
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