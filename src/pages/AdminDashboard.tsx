import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, Product, ProductVariation } from '../contexts/ProductContext';
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
  TableImage
} from './PageStyles';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { FormGroup, Label, Input, Textarea, SubmitButton } from './PageStyles';
import { toast } from 'react-toastify';


interface ProductFormState {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string; // CORRIGIDO: `image` agora é opcional aqui
  category: string;
  variations: string;
}


const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentSection, setCurrentSection] = useState('products');
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductFormState>({
    id: '',
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    variations: '',
  });

  const categories = [
    'Hambúrgueres Tradicionais',
    'Hambúrgueres Artesanais',
    'Porções',
    'Pizzas',
    'Pizzas Doces',
    'Bebidas',
    'Combos',
    'Churrasco'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? value.replace(',', '.') : value,
    });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      variations: '',
    });
    setEditingProduct(null);
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    switch(section) {
      case 'categories':
        toast.info('Gerenciamento de categorias em desenvolvimento');
        break;
      case 'orders':
        toast.info('Sistema de pedidos em desenvolvimento');
        break;
      case 'settings':
        toast.info('Configurações em desenvolvimento');
        break;
      default:
        break;
    }
  };

  const handleAddNewClick = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditClick = (product: Product) => {
    setFormData({
      ...product,
      price: product.price != null ? product.price.toString() : '', 
      variations: product.variations ? JSON.stringify(product.variations, null, 2) : '', 
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

    try {
      let productData: Product;
      let parsedVariations: ProductVariation[] | undefined;

      if (formData.variations.trim() !== '') {
        try {
          parsedVariations = JSON.parse(formData.variations);
          if (!Array.isArray(parsedVariations) || !parsedVariations.every(v => typeof v.name === 'string' && typeof v.price === 'number')) {
            throw new Error('Formato de variações inválido. Use um array de objetos com "name" (string) e "price" (número).');
          }
        } catch (error: any) {
          toast.error(`Erro no formato das variações: ${error.message || error}`);
          return;
        }
      }

      if (parsedVariations && parsedVariations.length > 0) {
        productData = {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          image: formData.image,
          category: formData.category,
          variations: parsedVariations,
          price: undefined
        };
      } else {
        const priceValue = parseFloat(formData.price);
        if (isNaN(priceValue)) {
            toast.error('Por favor, insira um preço válido para o produto sem variações.');
            return;
        }
        productData = {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          price: priceValue,
          image: formData.image,
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

  const filteredProducts = products.filter(product => true);


  return (
    <AdminDashboardContainer>
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
            <li
              className={currentSection === 'categories' ? 'active' : ''}
              onClick={() => handleSectionChange('categories')}
            >
              Categorias
            </li>
            <li
              className={currentSection === 'orders' ? 'active' : ''}
              onClick={() => handleSectionChange('orders')}
            >
              Pedidos
            </li>
            <li
              className={currentSection === 'settings' ? 'active' : ''}
              onClick={() => handleSectionChange('settings')}
            >
              Configurações
            </li>
          </ul>
        </div>
      </AdminSidebar>

      <AdminContent>
        <AdminHeader>
          <AdminTitle>Gerenciar Produtos</AdminTitle>
          <AdminControls>
            <AddButton onClick={handleAddNewClick}>
              <Plus size={16} />
              Adicionar Produto
            </AddButton>
          </AdminControls>
        </AdminHeader>

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
                  <TableCell>
                    <TableImage src={product.image || 'https://via.placeholder.com/60'} alt={product.name} />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.variations && product.variations.length > 0 ? (
                      product.variations.map((v, i) => (
                        <div key={i}>{v.name}: R$ {v.price.toFixed(2).replace('.', ',')}</div>
                      ))
                    ) : (
                      product.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : 'N/A'
                    )}
                  </TableCell>
                  <TableCell className="actions">
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
                <X size={20} />
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
              <Label htmlFor="category">Categoria</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="variations">Variações (JSON Array)</Label>
              <Textarea
                id="variations"
                name="variations"
                value={formData.variations}
                onChange={handleInputChange}
                placeholder='Ex: [{"name": "Pequena", "price": 30.00}, {"name": "Média", "price": 35.00}]'
              />
              <p style={{ fontSize: '0.8rem', color: '#ccc', marginTop: '0.2rem' }}>
                Deixe vazio se o produto não tiver variações.
              </p>
            </FormGroup>

            {formData.variations.trim() === '' && (
              <FormGroup>
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0,00"
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
              <Input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
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