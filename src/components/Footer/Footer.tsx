// src/components/Footer/Footer.tsx
import React from 'react';
import { FooterContainer, FooterText } from './FooterStyles.js';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const devName = "Joyce Masalla"; // <-- SUBSTITUA PELO SEU NOME COMPLETO

  return (
    <FooterContainer>
      <FooterText>
        &copy; {currentYear} Espaço Imperial - Desenvolvido por {devName}
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;