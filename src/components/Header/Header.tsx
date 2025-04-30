import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
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
  AdminLink
} from './HeaderStyles'; // Importando corretamente o arquivo de estilos em JS

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems, toggleCart } = useCart();
  const { currentUser } = useAuth();
  const location = useLocation();

  const isAdminPage = location.pathname.includes('/admin');
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

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <HeaderContainer style={{ backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent' }}>
      <LogoContainer>
        <Logo to="/">Espaço Imperial</Logo>
      </LogoContainer>

      <Nav>
        <NavLink to="/#hamburgueres-tradicionais">Hambúrgueres Tradicionais</NavLink>
        <NavLink to="/#hamburgueres-artesanais">Hambúrgueres Artesanais</NavLink>
        <NavLink to="/#porcoes">Porções</NavLink>
        <NavLink to="/#pizzas">Pizzas</NavLink>
        <NavLink to="/#pizzas-doces">Pizzas Doces</NavLink>
        <NavLink to="/#bebidas">Bebidas</NavLink>
        <NavLink to="/#combos">Combos</NavLink>
      </Nav>

      <HeaderActions>
        {!isAdminPage && (
          <CartButton onClick={toggleCart}>
            <ShoppingCart size={24} />
            {itemCount > 0 && <ItemCount>{itemCount}</ItemCount>}
          </CartButton>
        )}

        <AdminLink to={currentUser ? "/admin/dashboard" : "/admin"}>
          <User size={24} />
        </AdminLink>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </HeaderActions>

      {mobileMenuOpen && (
        <MobileNav>
          <NavLink to="/#hamburgueres-tradicionais" onClick={handleMobileNavClick}>Hambúrgueres Tradicionais</NavLink>
          <NavLink to="/#hamburgueres-artesanais" onClick={handleMobileNavClick}>Hambúrgueres Artesanais</NavLink>
          <NavLink to="/#porcoes" onClick={handleMobileNavClick}>Porções</NavLink>
          <NavLink to="/#pizzas" onClick={handleMobileNavClick}>Pizzas</NavLink>
          <NavLink to="/#pizzas-doces" onClick={handleMobileNavClick}>Pizzas Doces</NavLink>
          <NavLink to="/#bebidas" onClick={handleMobileNavClick}>Bebidas</NavLink>
          <NavLink to="/#combos" onClick={handleMobileNavClick}>Combos</NavLink>
        </MobileNav>
      )}
    </HeaderContainer>
  );
};

export default Header;
