// src/components/PrivateRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importe seu hook de autenticação

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // Opcional: para rotas que exigem funções específicas
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth(); // Obtém o usuário e o estado de carregamento do AuthContext

  // Enquanto estiver carregando o estado de autenticação, podemos mostrar um loader ou null
  if (loading) {
    return <div>Carregando autenticação...</div>; // Ou um spinner, null, etc.
  }

  // Se não há usuário logado, redireciona para a página de login
  if (!currentUser) {
    return <Navigate to="/admin" replace />;
  }

  // Se houver papéis permitidos e o usuário não tiver um desses papéis, redireciona
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Você pode redirecionar para uma página de "Acesso Negado" ou para a página inicial
    return <Navigate to="/" replace />;
  }

  // Se o usuário está logado e tem o papel permitido, renderiza os filhos (o componente da rota protegida)
  return <>{children}</>;
};

export default PrivateRoute;