import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import logoespaco from '..//..//assets/logoespaco.png';
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

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems, toggleCart } = useCart();
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminPage = location.pathname.includes('/admin');

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCategoryClick = (categoryId) => {
    console.log('Categoria clicada:', categoryId); // verifica se está recebendo o valor correto
    const section = document.getElementById(categoryId);
    if (section) {
      console.log('Elemento encontrado:', section); // verifica se encontrou o elemento no DOM
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    } else {
      console.warn('Elemento não encontrado para:', categoryId);
    }
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <LogoContainer>

        <Logo to="/" onClick={scrollToTop}>
          <LogoImage src={logoespaco} alt="Espaço Imperial Logo" />
        </Logo>

      </LogoContainer>

      <Nav >
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
        <NavLink onClick={() => handleCategoryClick('combos')}>
          Combos
        </NavLink>
      </Nav>

      <HeaderActions>
        {!isAdminPage && (
          <CartButton onClick={toggleCart}>
            <ShoppingCart size={24} />
            {itemCount > 0 && <ItemCount>{itemCount}</ItemCount>}
          </CartButton>
        )}

        {currentUser ? (
          <AdminLink to="/admin/dashboard">
            <User size={24} />
          </AdminLink>
        ) : (
          <AdminLink to="/admin">
            <User size={24} />
          </AdminLink>
        )}

        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </HeaderActions>

      {mobileMenuOpen && (
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
          <NavLink onClick={() => handleCategoryClick('combos')}>
            Combos
          </NavLink>
        </MobileNav>
      )}
    </HeaderContainer>
  );
};

export default Header;