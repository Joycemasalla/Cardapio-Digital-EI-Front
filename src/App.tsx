import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyles.js';
import { theme } from './styles/theme';
import Header from './components/Header/Header';
import MenuPage from './pages/MenuPage';
import CategoryPage from './pages/CategoryPage.js';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './components/Cart/Cart';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FloatingCartButton from './components/FloatingCartButton/FloatingCartButton';
import BackToTopButton from './components/BackToTopButton/BackToTopButton';


type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <div className="App">
                <Header />
                <Routes>
                  <Route path="/" element={<MenuPage />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <Cart />
                <FloatingCartButton />
                <BackToTopButton />
                <ToastContainer position="bottom-right" theme="dark" />
              </div>
            </ThemeProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;