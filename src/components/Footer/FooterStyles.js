// src/components/Footer/FooterStyles.js
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundLight}; /* Fundo escuro, consistente com o tema */
  color: ${({ theme }) => theme.colors.textSecondary}; /* Cor do texto secundária */
  padding: 1.5rem 2rem; /* Espaçamento interno */
  text-align: center; /* Texto centralizado */
  font-size: 0.9rem; /* Tamanho da fonte */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
    font-size: 0.8rem;
  }
`;

export const FooterText = styled.p`
  margin: 0; /* Remove margem padrão de parágrafo */
  line-height: 1.5;
`;