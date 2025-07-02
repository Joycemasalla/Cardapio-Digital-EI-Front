// src/components/CategoryQuickLinks/CategoryQuickLinksStyles.js
import styled from 'styled-components';

export const QuickLinksContainer = styled.div`
  padding: 0 2rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Para posicionar o dropdown list */
  z-index: 50; /* Garante que o dropdown fique acima de outros elementos quando aberto */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 1rem;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

// NOVO: Container principal do select customizado
export const CustomSelectContainer = styled.div`
  width: 100%;
  max-width: 280px; /* Largura máxima do dropdown */
  position: relative; /* Para posicionamento absoluto da lista */
  text-align: left; /* Alinha o texto dentro */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 240px;
  }
`;

// NOVO: Estilo para o botão que abre/fecha o dropdown
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

  /* Ajustes para quando o dropdown está aberto */
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

// NOVO: Estilo para o ícone de seta dentro do botão
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

// NOVO: Estilo para a lista de opções (ul)
export const DropdownList = styled.ul`
  position: absolute;
  top: 100%; /* Posiciona abaixo do botão */
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-top: none; /* Remove a borda superior para se juntar ao botão */
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.small};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.small};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px; /* Altura máxima para scroll */
  overflow-y: auto; /* Adiciona scroll se muitas opções */
  z-index: 100; /* Garante que a lista esteja acima de tudo */
`;

// NOVO: Estilo para cada item da lista (li)
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

  &.selected { /* Estilo para a opção selecionada */
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.9rem;
    padding: 0.6rem 0.9rem;
  }
`;