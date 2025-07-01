import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // A propriedade 'exclude' previne que o Vite tente pré-bundle o pacote,
    // o que pode ser útil para pacotes que não funcionam bem com o pré-bundling
    // ou que já estão otimizados.
    // A propriedade 'include' força o pré-bundling.
    // Baseado no seu package.json, lucide-react é uma dependência direta,
    // e o erro que você viu antes de refatorar poderia estar relacionado a
    // como o Vite lida com ele. A configuração 'exclude' na versão JS era mais comum
    // para certas situações. Se estiver funcionando com 'include', mantenha.
    // Por enquanto, vamos priorizar a versão TS que usa 'include'.
    include: ['lucide-react'],
  },
});