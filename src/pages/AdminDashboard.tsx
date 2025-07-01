import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
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
  price: string; // Manter como string para o input, converter ao salvar
  image: string;
  category: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentSection, setCurrentSection] = useState('products');
  const navigate = useNavigate(); // Não está sendo usado diretamente, mas mantido caso haja planos futuros.

  const [formData, setFormData] = useState<ProductFormState>({
    id: '',
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  const categories = [
    'Hambúrgueres Tradicionais',
    'Hambúrgueres Artesanais',
    'Porções',
    'Pizzas',
    'Pizzas Doces',
    'Bebidas',
    'Combos',
    'Churrasco' // Adicionando a nova categoria de churrasco
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
    });
    setEditingProduct(null);
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    // Aqui você pode adicionar lógica para navegar ou carregar dados específicos da seção
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
      price: product.price.toString(),
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
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      } as Product; // Cast para Product, pois 'id' será gerado ou já existe

      if (editingProduct) {
        await updateProduct(productData);
        toast.success('Produto atualizado com sucesso!');
      } else {
        // Quando adicionando, o id é gerado pelo addProduct no contexto
        await addProduct(productData);
        toast.success('Produto adicionado com sucesso!');
      }

      setShowForm(false);
      resetForm();
    } catch (error) {
      toast.error('Erro ao salvar produto. Verifique os dados e tente novamente.');
    }
  };

  // Filtrar produtos com base na seção atual, se necessário
  const filteredProducts = products.filter(product => {
    // Se estiver na seção de produtos, mostra todos.
    // Se houver uma seção específica, você pode filtrar aqui.
    // Por enquanto, como as outras seções são apenas toasts, mostramos todos em 'products'
    return true; // Por padrão, mostra todos os produtos
  });


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
        ) : products.length === 0 ? ( // Usar products.length para verificar se há produtos
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
                <TableHeader>Preço</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {filteredProducts.map((product) => ( // Usar filteredProducts aqui
                <TableRow key={product.id}>
                  <TableCell>
                    <TableImage src={product.image} alt={product.name} />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>R$ {product.price.toFixed(2).replace('.', ',')}</TableCell>
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