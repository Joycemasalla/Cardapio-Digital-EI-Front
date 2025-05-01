import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      backgroundLight: string;
      backgroundCard: string;
      primary: string;
      primaryLight: string;
      primaryDark: string;
      text: string;
      textSecondary: string;
      textDark: string;
      success: string;
      error: string;
      warning: string;
    };
    fonts: {
      main: string;
      heading: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
    shadows: {
      light: string;
      medium: string;
      strong: string;
    };
    transition: string;
  }
}