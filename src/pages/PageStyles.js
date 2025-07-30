// src/pages/PageStyles.js
import styled from 'styled-components';

// =========================================================
// VERSÃO FINAL CORRIGIDA PARA DUPLICAÇÃO E LAYOUT MOBILE DO ADMINHEADER
// =========================================================

// 1. Shared/Base Styles (Componentes mais genéricos ou que não dependem de outros Styled Components)
export const PageContainer = styled.div`
  padding-bottom: 0.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-family: ${({ theme }) => theme.fonts.main};
  transition: ${({ theme }) => theme.transition};
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
  }
`;

export const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
  }
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: ${({ theme }) => theme.transition};
  width: 100%;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.textDark};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background-color: rgba(255, 82, 82, 0.1);
  border: 1px solid rgba(255, 82, 82, 0.2);
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;


// 2. Menu Page Styles
export const HeroSection = styled.div`
  height: 300px;
  background-image: url('https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 200px;
  }
`;

export const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 80%;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.2rem;
  }
`;


// 3. Admin Login Styles
export const AdminContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 72px);
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem 0.5rem;
  }
`;

export const AdminForm = styled.form`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: 100%;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1.5rem;
    width: calc(100% - 2rem);
    max-width: 350px;
  }
`;

// AdminTitle é usado em AdminHeader
export const AdminTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 1rem 0 2rem;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.3rem;
    margin: 0.8rem 0 1.5rem;
  }
`;


// 4. Admin Dashboard - Componentes auxiliares (filhos) devem vir antes de seus pais/containers.

// Componentes usados dentro de outros estilos (Table, Form, Select)
export const TableImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
  }
`;

// ActionButton é usado em VariationItem
export const ActionButton = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.delete {
    color: ${({ theme }) => theme.colors.error};
    
    &:hover {
      background-color: rgba(255, 82, 82, 0.1);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.3rem;
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

// AddButton é usado em AdminControls
export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: auto;
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
    gap: 0.3rem;

    svg {
        width: 14px;
        height: 14px;
    }
  }
`;

// AdminMenuToggleButton é usado em AdminHeader
export const AdminMenuToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  cursor: pointer;
  z-index: 10;
  
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

// AdminControls é usado em AdminHeader
export const AdminControls = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: relative; /* Ajustado para fluir, não absoluto */
    margin-left: auto; /* Empurra para a direita */
    right: auto;
    top: auto;
    transform: none;
    padding-left: 0;
    
    ${AddButton} { /* Referencia AddButton */
    }
  }
`;

// AdminHeader usa AdminTitle, AdminMenuToggleButton e AdminControls, então ele deve vir depois deles
export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: nowrap;
  position: relative;
  min-height: 60px;
  padding: 0 1rem;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    /* NOVO: Garante que o cabeçalho seja um container flex para seus filhos */
    display: flex;
    justify-content: space-between; /* Espalha os itens */
    align-items: center;

    /* NOVO: Oculta o logo (se houver) no cabeçalho mobile do admin */
    /* Exemplo: .logo { display: none; } */

    /* Garante que o AdminTitle ocupe o espaço e centralize */
    ${AdminTitle} {
      flex-grow: 1;
      text-align: center;
      margin: 0;
      /* Ajuste a largura máxima para o título não empurrar os botões */
      max-width: calc(100% - 60px - 60px); /* Largura total - largura do botão menu - largura do botão add */
      @media (max-width: 400px) {
        font-size: 1.1rem;
      }
    }

    /* Posiciona o AdminMenuToggleButton no canto esquerdo */
    ${AdminMenuToggleButton} {
        flex-shrink: 0;
        margin-right: 0.5rem;
        position: absolute; /* Usar absolute dentro de um flex container */
        left: 0.5rem; /* Mais perto da borda */
        top: 50%;
        transform: translateY(-50%);
    }
    /* Posiciona o AdminControls no canto direito */
    ${AdminControls} {
        flex-shrink: 0;
        margin-left: 0.5rem;
        position: absolute; /* Usar absolute para o grupo de controles */
        right: 0.5rem; /* Mais perto da borda */
        top: 50%;
        transform: translateY(-50%);
    }
  }
`;

// Componentes da Tabela de Produtos
export const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  
  .actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0; 
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block; 
    width: 100%; 
    border: none; 
    overflow-x: hidden; 
    
    thead {
      display: none; 
    }

    tbody {
      display: flex; 
      flex-direction: column; 
      gap: 0.6rem;
      width: 100%;
    }

    tr {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.6rem;
      padding: 0.6rem;
      background-color: ${({ theme }) => theme.colors.backgroundCard};
      border-radius: ${({ theme }) => theme.borderRadius.medium};
      box-shadow: ${({ theme }) => theme.shadows.light};
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: 100%; 
      height: auto; 
      min-height: unset;
      position: relative; 
    }

    td {
      display: flex; 
      flex-direction: column;
      justify-content: center;
      padding: 0;
      border: none;
      font-size: 0.8rem; 
      color: ${({ theme }) => theme.colors.text};
      white-space: normal; 
      overflow: visible;
      text-overflow: clip;
      flex-shrink: 0; 
      flex-basis: auto; 
      
      &::before {
        display: none;
      }

      &:nth-child(1) {
        width: 45px;
        height: 45px;
        min-width: 45px; 
        overflow: hidden; 
        border-radius: ${({ theme }) => theme.borderRadius.small};
        margin-right: 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:nth-child(2) {
        flex-grow: 1; 
        min-width: 0; 
        font-weight: 600;
        color: ${({ theme }) => theme.colors.text};
        font-size: 0.9rem;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        padding-right: 0.4rem;
      }
      
      &:nth-child(3) {
        display: none; 
      }

      &:nth-child(4) {
        flex-direction: column; 
        align-items: flex-end;
        font-size: 0.8rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary};
        white-space: normal; 
        overflow: visible; 
        text-overflow: clip; 
        margin-top: 0;
        width: auto;
        flex-shrink: 1;
        padding-right: 0.4rem;
        
        div {
          white-space: nowrap; 
          font-size: 0.7rem;
          line-height: 1.2;
          text-align: right;
        }
      }

      &:last-child {
        flex-direction: row; 
        justify-content: flex-end; 
        padding-top: 0;
        border-top: none;
        margin-top: 0;
        gap: 0.4rem;
        width: auto;
        min-width: unset; 
        align-self: flex-end;
      }
    }
  }
  /* Responsivo para tablets */
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    
    thead, tbody, tr, th, td {
      white-space: nowrap;
    }
    
    th, td {
      padding: 0.8rem 0.5rem;
      font-size: 0.8rem;
    }
    
    th:nth-child(1), td:nth-child(1) { min-width: 70px; }
    th:nth-child(2), td:nth-child(2) { min-width: 120px; }
    th:nth-child(3), td:nth-child(3) { min-width: 90px; }
    th:nth-child(4), td:nth-child(4) { min-width: 90px; }
    th:nth-child(5), td:nth-child(5) { min-width: 80px; }
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  font-size: 0.9rem;
  min-width: 80px;
  &:nth-child(1) { min-width: 80px; }
  &:nth-child(2) { min-width: 150px; }
  &:nth-child(3) { min-width: 120px; }
  &:nth-child(4) { min-width: 120px; }
  &:nth-child(5) { min-width: 100px; }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.8rem 0.5rem;
    font-size: 0.75rem;
    min-width: 60px;
    &:nth-child(1) { min-width: 70px; }
    &:nth-child(2) { min-width: 120px; }
    &:nth-child(3) { min-width: 90px; }
    &:nth-child(4) { min-width: 90px; }
    &:nth-child(5) { min-width: 80px; }
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.8rem 0.5rem;
    font-size: 0.75rem;
  }
`;

export const NoProducts = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  p {
    margin-bottom: 1.5rem;
  }
  
  button {

    margin: 0 auto;
  }
`;

// 8. ProductForm (o formulário de adição/edição de produtos)
// Este componente e seus sub-componentes podem ser declarados no final
// pois eles não são usados como seletores por outros styled-components.
export const ProductForm = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: 90%;
  max-width: 500px;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.strong};
  max-height: 90vh;
  overflow-y: auto;
  
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .form-select {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.text};
    padding: 0.75rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    font-family: ${({ theme }) => theme.fonts.main};
    transition: ${({ theme }) => theme.transition};
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
    }
    
    option {
      background-color: ${({ theme }) => theme.colors.backgroundLight};
    }
  }
`;