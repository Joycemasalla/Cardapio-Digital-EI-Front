// src/components/BackToTopButton/BackToTopButton.tsx
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { ScrollButton } from './BackToTopButtonStyles';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostra o botão após uma certa rolagem
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Aparece após 300px de rolagem
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Rolagem suave para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <ScrollButton onClick={scrollToTop} $isVisible={isVisible}>
      <ChevronUp size={24} />
    </ScrollButton>
  );
};

export default BackToTopButton;