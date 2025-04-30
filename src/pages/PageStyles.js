import styled from 'styled-components';

// Shared Styles
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
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-family: ${({ theme }) => theme.fonts.main};
  transition: ${({ theme }) => theme.transition};
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
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

// Menu Page Styles
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

// Admin Login Styles
export const AdminContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 72px);
  padding: 2rem;
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
`;

export const AdminTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 1rem 0 2rem;
  text-align: center;
`;

// Admin Dashboard Styles
export const AdminDashboardContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 72px);
`;

export const AdminSidebar = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  padding: 2rem 1rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
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
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    &.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.background};
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 60px;
    padding: 1rem 0;
    
    h3 {
      display: none;
    }
    
    li {
      text-align: center;
      padding: 0.75rem 0;
      font-size: 0.8rem;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const AdminContent = styled.div`
  flex: 1;
  padding: 2rem;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const AdminControls = styled.div`
  display: flex;
  gap: 1rem;
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
`;

export const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  .actions {
    display: flex;
    gap: 0.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    overflow-x: auto;
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  font-size: 0.9rem;
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
`;

export const TableImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
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