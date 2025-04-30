import styled from 'styled-components';
import { Link } from 'react-router-dom';



export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.background : 'rgba(18, 18, 18, 0.9)'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(8px)' : 'none')};
  box-shadow: ${({ $scrolled, theme }) =>
    $scrolled ? theme.shadows.medium : 'none'};
  transition: ${({ theme }) => theme.transition};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
  }
`;


export const LogoContainer = styled.div`
  flex: 0.4 0 auto;
  display: flex;
  align-items: center;
  max-height: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: 60px;
  }

  @media (max-width: 480px) {
    max-height: 50px;
  }
`;




export const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.7rem;
  font-weight: 00;
  color: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => theme.transition};
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
    transition: all 0.3s ease;

  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.3rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  font-size: 1rem;
  margin-right: auto; /* Garante que os links de navegação fiquem à esquerda */
  padding-right: 20px; /* Adiciona algum espaçamento à direita */
  transition: all 0.3s ease;

  

  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  transition: ${({ theme }) => theme.transition};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transition};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    
    &:after {
      width: 100%;
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto; /* Garante que os itens da navegação e o carrinho fiquem à direita */
  margin-right: 0.4em; /* Garante que os itens da navegação e o carrinho fiquem à direita */


`;

export const CartButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ItemCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const AdminLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const MobileMenuButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  display: none;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

export const MobileNav = styled.div`
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  z-index: 99;
  box-shadow: ${({ theme }) => theme.shadows.strong};
  animation: slideDown 0.3s ease;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const LogoImage = styled.img`
  height: 80px;
  max-width: 100%;
  object-fit: contain;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 60px;
  }

  @media (max-width: 480px) {
    height: 50px;
  }
`;