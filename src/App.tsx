// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importações dos seus contextos
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';

// Importações dos seus componentes e páginas
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import FloatingCartButton from './components/FloatingCartButton/FloatingCartButton';
import BackToTopButton from './components/BackToTopButton/BackToTopButton';
import MenuPage from './pages/MenuPage';
import CategoryPage from './pages/CategoryPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// NOVO: Importe o WhatsAppButton
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';

import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Router>
              {/* O Header geralmente aparece em todas as páginas do cardápio */}
              <Header />

              {/* As rotas da sua aplicação */}
              <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/categoria/:categoryName" element={<CategoryPage />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* Adicione outras rotas conforme necessário */}
              </Routes>

              {/* Componentes fixos/flutuantes que devem aparecer em todas as páginas */}
              <Cart /> {/* O carrinho lateral */}
              <FloatingCartButton /> {/* O botão flutuante do carrinho */}
              <BackToTopButton /> {/* O botão de voltar ao topo */}

              {/* NOVO: Adicione o botão do WhatsApp aqui */}
              <WhatsAppButton /> 

              {/* Container para as notificações (toasts) */}
              <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </Router>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;