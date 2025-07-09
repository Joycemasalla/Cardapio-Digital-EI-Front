// src/pages/PageStyles.js
import styled from 'styled-components';

// Shared Styles (Mantidos)
export const PageContainer = styled.div`
  padding-bottom: 2rem;
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

// Menu Page Styles (Mantidos)
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

// Admin Login Styles (Mantidos)
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

// Admin Dashboard Styles (Ajustados para responsividade da tabela)
export const AdminDashboardContainer = styled.div`
  display: flex;
  flex-direction: column; /* ALTERADO: Itens empilhados verticalmente (Nav, Header, Content) */
  min-height: calc(100vh - 72px);
  background-color: ${({ theme }) => theme.colors.background};

  /* Se a imagem de fundo estiver aqui, remova-a para evitar repetições/bugs visuais */
  /* background-image: url('CAMINHO_DA_SUA_IMAGEM_DE_FUNDO_ADMIN'); */
  /* background-size: cover; */
  /* background-position: center; */
  /* background-repeat: no-repeat; */
`;

export const AdminSidebar = styled.div`
  width: 100%; /* No drawer mobile, ocupa a largura total */
  padding: 2rem 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-right: none; /* No PC, não haverá sidebar fixa */
  
  h3 {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 1; /* Sempre visível no drawer */
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 0.75rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};
    white-space: nowrap; 
    text-align: left; /* Alinhamento padrão para lista */
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    &.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.background};
    }
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) { /* Em telas maiores que mobile */
    display: none; /* Esconde a AdminSidebar principal, que agora é só o conteúdo do drawer */
  }
`;

// AdminContent agora ocupa a largura total no PC
export const AdminContent = styled.div`
  flex: 1;
  padding: 2rem;
  position: relative;
  overflow-x: hidden;
  margin-left: 0; /* NOVO: Sem margem esquerda, ocupa a largura total */
  transition: none; /* Remove transição de margem, não é mais sidebar colapsável */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap; /* <--- NOVO: Permite que os itens quebrem a linha se não houver espaço */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const AdminControls = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%; /* Ocupa largura total para o botão "Adicionar Produto" */
  }
`;

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
    width: 100%;
    justify-content: center;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

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
      gap: 0.6rem; /* AJUSTADO: Reduz o espaço entre um card e outro (entre os <tr>) */
      width: 100%;
    }

    tr { /* Cada linha da tabela (<tr>) vira um card de produto individual */
      display: flex;
      flex-direction: column; 
      align-items: flex-start; 
      gap: 0.2rem; /* AJUSTADO: Reduz o espaço entre os elementos empilhados dentro do card (ex: entre nome e preço) */
      padding: 0.6rem; /* AJUSTADO: Reduz o padding interno do card, tornando-o mais compacto */
      background-color: ${({ theme }) => theme.colors.backgroundCard};
      border-radius: ${({ theme }) => theme.borderRadius.medium};
      box-shadow: ${({ theme }) => theme.shadows.light};
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: 100%; 
      height: auto; 
      min-height: unset; /* Garante que a altura não seja fixada e se ajuste ao conteúdo */
      position: relative; 
    }

    td { /* Cada célula (<td>) dentro do card */
      display: flex; 
      align-items: center; 
      width: 100%; 
      padding: 0; /* Zera o padding da célula, o espaçamento será controlado por margens e gaps */
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

      &:nth-child(1) { /* Célula da Imagem */
        width: 45px; /* AJUSTADO: Diminui ligeiramente o tamanho da imagem */
        height: 45px; /* AJUSTADO: Diminui ligeiramente o tamanho da imagem */
        min-width: 45px; 
        overflow: hidden; 
        border-radius: ${({ theme }) => theme.borderRadius.small};
        margin-right: 0.6rem; /* AJUSTADO: Reduz a margem à direita da imagem */
      }

      &:nth-child(2) { /* Célula do Nome do Produto */
        flex-grow: 1; 
        min-width: 0; 
        font-weight: 600;
        color: ${({ theme }) => theme.colors.text};
        font-size: 0.9rem; /* Mantém o tamanho da fonte para o nome para boa legibilidade */
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
      }
      
      &:nth-child(3) { /* Categoria */
        display: none; 
      }

      &:nth-child(4) { /* Célula do Preço/Variações */
        flex-direction: column; 
        align-items: flex-start; 
        font-size: 0.8rem; /* AJUSTADO: Reduz o tamanho da fonte para o texto "Preço/Variações" geral */
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary};
        white-space: normal; 
        overflow: visible; 
        text-overflow: clip; 
        margin-top: 0.2rem; /* AJUSTADO: Reduz a margem do topo para diminuir o espaço vertical */
        width: 100%; 
        
        div { /* Estilo para cada item de variação individual (ex: "Pequena: R$ X,XX") */
          white-space: nowrap; 
          font-size: 0.7rem; /* AJUSTADO: Reduz o tamanho da fonte para cada variação individual */
          line-height: 1.2; /* AJUSTADO: Torna o espaçamento entre as linhas de variação mais compacto */
          text-align: left; 
        }
      }

      &:last-child { /* Célula de Ações (botões de Editar/Excluir) */
        flex-direction: row; 
        justify-content: flex-end; 
        padding-top: 0.6rem; /* AJUSTADO: Reduz o padding do topo */
        border-top: 1px solid rgba(255, 255, 255, 0.1); 
        margin-top: 0.6rem; /* AJUSTADO: Reduz a margem do topo */
        gap: 0.4rem; /* AJUSTADO: Reduz o espaçamento entre os botões de ação */
        width: 100%; 
        min-width: unset; 
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

export const TableImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover; /* CORRIGIDO: Volta para cover */
  border-radius: ${({ theme }) => theme.borderRadius.small};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
  }
`;
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
  
  .form-select { /* Estilos para o select nativo (se ainda usado) */
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

export const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const CloseFormButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

// Estilos para o editor de variações (Mantidos)
export const VariationsEditor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

export const VariationItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.03);
  padding: 0.6rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};

  .variation-input {
    flex: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0.8rem;

    .variation-input {
      width: 100%;
    }

    ${ActionButton} {
      width: 100%;
      justify-content: center;
      margin-top: 0.5rem;
      padding: 0.6rem;
      font-size: 1rem;
    }
  }
`;

export const AddVariationButton = styled.button`
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin-top: 1rem;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: #43a047;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
`;

// Estilos para o select customizado (copiados do CategoryQuickLinksStyles e exportados)
export const CustomSelectContainer = styled.div`
  width: 100%;
  max-width: 280px;
  position: relative;
  text-align: left;

  /* NOVO: Ajusta o flex-basis e min-width para melhor responsividade em grupos flex */
  flex: 1; /* Permite que cresça em um grupo flex */
  min-width: 150px; /* Largura mínima para ser clicável */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 240px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    /* Em telas muito pequenas, garante que os selects ocupem a largura total */
    flex-basis: 100%; /* Ocupa 100% da largura em uma linha */
    max-width: 100%; /* Garante que não ultrapasse */
    min-width: unset; /* Remove min-width para que flex-basis 100% funcione */
  }
`;


export const SelectLabel = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-align: center;
`;

export const SelectButton = styled.button`
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 0.9rem 1rem;
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  box-shadow: ${({ theme }) => theme.shadows.light};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}50;
  }

  &.open {
    border-color: ${({ theme }) => theme.colors.primary};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.95rem;
    padding: 0.7rem 0.9rem;
  }
`;

export const ChevronIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: rotate(0deg);

  &.rotated {
    transform: rotate(180deg);
  }
`;

// MODIFICADO: Remove max-height para evitar corte
export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-width: 100%; /* NOVO: Garante que a lista não seja mais larga que seu pai */
  box-sizing: border-box; /* NOVO: Importante para cálculos de largura/padding */
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-top: none;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.small};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.small};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px; /* RE-ADICIONADO: Mantido para que a lista tenha rolagem se for muito longa, dentro do espaço do modal/drawer */
  overflow-y: auto;
  z-index: 100;
`;




export const DropdownItem = styled.li`
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  &.selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.9rem;
    padding: 0.6rem 0.9rem;
  }
`;

/// AdminMenuToggleButton agora só aparece no mobile
export const AdminMenuToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  cursor: pointer;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) { /* NOVO: Esconde em PC */
    display: none; 
  }
`;

// Estilos para o Drawer lateral do admin (mobile)
export const AdminMobileDrawer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-300px')};
  width: 250px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  transition: left 0.3s ease-in-out;
  z-index: 1100;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;

  ${AdminSidebar} {
    width: 100%;
    padding: 0;
    border: none;
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .drawer-title {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
    font-weight: 600;
  }

  .drawer-close-button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    padding: 0.2rem;
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  .drawer-category-filter {
    margin-top: 1rem;
    margin-bottom: 2rem;
    ${CustomSelectContainer} {
      max-width: 100%;
    }
  }
`;

// Estilos para o overlay do drawer
export const AdminDrawerOverlay = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  transition: opacity 0.3s ease-in-out;
`;


// Estilos para o input de arquivo e upload
export const InputFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
`;

export const InputFileName = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;

export const UploadButton = styled.label`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
// NOVO: Navegação superior do Admin (para PC)
export const AdminNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinha links à esquerda */
  background-color: ${({ theme }) => theme.colors.backgroundLight}; /* Um fundo sutil */
  padding: 0.8rem 2rem; /* Padding para a barra de navegação */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Separador */
  gap: 1.5rem; /* Espaçamento entre os links */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none; /* Esconde esta navegação no mobile, o drawer substitui */
  }
`;

export const AdminNavLink = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  padding: 0.5rem 0.2rem;
  transition: ${({ theme }) => theme.transition};
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.95rem;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    &:after {
      width: 100%;
    }
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary}; /* Cor de destaque para o link ativo */
    &:after {
      width: 100%; /* Sublinhado completo para o link ativo */
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;