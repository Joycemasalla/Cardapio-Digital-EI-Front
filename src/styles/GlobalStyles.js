// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Estilos globais para a sua aplicação */
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 17px;
  }
  
  body {
    line-height: 1.5;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    line-height: 1.2;
    margin-bottom: 0.5em;
  }
  
  p {
    margin-bottom: 1em;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
    // Removendo a borda de todos os botões para um visual mais limpo
    border: none; 
    // Garante que o contorno de foco não adicione uma borda indesejada
    outline: none;
    // Opcional: Remove qualquer sombra que possa parecer uma borda
    box-shadow: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;