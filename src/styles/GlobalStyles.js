import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
    padding-bottom: 10px; /* Ajuste esse valor para ser maior que a altura do seu botão flutuante + a notificação */

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding-bottom: 10px; /* Ajuste para telas menores se necessário */
    }

  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-bottom: 1rem;
  }

  button {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.main};
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .App {
    padding-bottom: 10px;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primaryDark};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export default GlobalStyle;