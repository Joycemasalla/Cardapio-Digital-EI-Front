// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importações dos seus contextos
import { AuthProvider } from './contexts/AuthContext'; //
import { ProductProvider } from './contexts/ProductContext'; //
import { CartProvider } from './contexts/CartContext'; //

// Importações dos seus componentes e páginas
import Header from './components/Header/Header'; //
import Cart from './components/Cart/Cart'; //
import FloatingCartButton from './components/FloatingCartButton/FloatingCartButton'; //
import BackToTopButton from './components/BackToTopButton/BackToTopButton'; //
import MenuPage from './pages/MenuPage'; //
import CategoryPage from './pages/CategoryPage'; //
import AdminLogin from './pages/AdminLogin'; //
import AdminDashboard from './pages/AdminDashboard'; //
import PrivateRoute from './components/PrivateRoute'; // <--- NOVO: Importa o componente de rota protegida

import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'; //

import GlobalStyles from './styles/GlobalStyles'; //
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme'; //
import Footer from './components/Footer/Footer';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider> {/* */}
        <ProductProvider> {/* */}
          <CartProvider> {/* */}
            <Router>
              {/* O Header geralmente aparece em todas as páginas do cardápio */}
              <Header /> {/* */}

              {/* As rotas da sua aplicação */}
              <Routes>
                <Route path="/" element={<MenuPage />} /> {/* */}
                <Route path="/categoria/:categoryName" element={<CategoryPage />} /> {/* */}
                <Route path="/admin" element={<AdminLogin />} /> {/* */}
                {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

                {/* <--- ALTERAÇÃO PRINCIPAL AQUI: Rota protegida para o Dashboard */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute allowedRoles={['admin']}> {/* Adapte o papel 'admin' conforme seu AuthContext */}
                      <AdminDashboard /> {/* */}
                    </PrivateRoute>
                  }
                />
                {/* Adicione outras rotas conforme necessário */}
              </Routes>

              {/* Componentes fixos/flutuantes que devem aparecer em todas as páginas */}
              <Cart /> {/* */}
              <FloatingCartButton /> {/* */}
              <BackToTopButton /> {/* */}

              {/* NOVO: Adicione o botão do WhatsApp aqui */}
              <WhatsAppButton /> {/* */}

              {/* Container para as notificações (toasts) */}
              <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
              <Footer />
            </Router>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;