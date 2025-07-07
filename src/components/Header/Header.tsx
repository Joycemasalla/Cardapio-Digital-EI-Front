// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import logoespaco from '../../assets/logoespaco.png';
import {
  HeaderContainer,
  Logo,
  Nav,
  NavLink,
  CartButton,
  MobileMenuButton,
  MobileNav,
  LogoContainer,
  ItemCount,
  HeaderActions,
  AdminLink,
  LogoImage
} from './HeaderStyles';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems, toggleCart } = useCart();
  const { currentUser } = useAuth(); // Obtém o usuário logado
  const location = useLocation();

  const isAdminPage = location.pathname.includes('/admin'); // Verifica se a página atual é de admin
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId: string) => {
    const section = document.getElementById(categoryId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // LÓGICA ALTERADA: O ícone do Admin só aparece se houver um usuário logado E não estivermos já em uma página de admin.
  // Se o admin já está no dashboard, o ícone não precisa aparecer na barra de navegação principal.
  // Se o usuário não está logado, ele não vê o ícone em nenhuma página pública.
  const shouldShowAdminIcon = currentUser && !isAdminPage;

  return (
    <HeaderContainer $scrolled={scrolled}>
      <LogoContainer>
        <Logo to="/" onClick={scrollToTop}>
          <LogoImage src={logoespaco} alt="Espaço Imperial Logo" />
        </Logo>
      </LogoContainer>

      {!isAdminPage && ( // A navegação principal é escondida nas páginas de admin
        <Nav>
          <NavLink onClick={() => handleCategoryClick('hamburgueres-tradicionais')}>
            Hambúrgueres Tradicionais
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('hamburgueres-artesanais')}>
            Hambúrgueres Artesanais
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('porcoes')}>
            Porções
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('pizzas')}>
            Pizzas
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('pizzas-doces')}>
            Pizzas Doces
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('bebidas')}>
            Bebidas
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('churrasco')}>
            Churrasco
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('combos')}>
            Combos
          </NavLink>
        </Nav>
      )}

      <HeaderActions>
        {!isAdminPage && ( // O botão do carrinho é escondido nas páginas de admin
          <CartButton onClick={toggleCart}>
            <ShoppingCart size={24} />
            {itemCount > 0 && <ItemCount>{itemCount}</ItemCount>}
          </CartButton>
        )}

        {/* CONDIÇÃO MODIFICADA AQUI: */}
        {shouldShowAdminIcon && ( 
          <AdminLink to="/admin/dashboard">
            <User size={24} />
          </AdminLink>
        )}

        {!isAdminPage && ( // O botão do menu mobile é escondido nas páginas de admin
          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        )}
      </HeaderActions>

      {mobileMenuOpen && !isAdminPage && ( // A navegação mobile é escondida nas páginas de admin
        <MobileNav>
          <NavLink onClick={() => handleCategoryClick('hamburgueres-tradicionais')}>
            Hambúrgueres Tradicionais
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('hamburgueres-artesanais')}>
            Hambúrgueres Artesanais
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('porcoes')}>
            Porções
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('pizzas')}>
            Pizzas
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('pizzas-doces')}>
            Pizzas Doces
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('bebidas')}>
            Bebidas
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('churrasco')}>
            Churrasco
          </NavLink>
          <NavLink onClick={() => handleCategoryClick('combos')}>
            Combos
          </NavLink>
        </MobileNav>
      )}
    </HeaderContainer>
  );
};

export default Header;