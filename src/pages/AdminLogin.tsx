import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { KeyRound, Loader } from 'lucide-react';
import {
  AdminContainer,
  AdminForm,
  AdminTitle,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
} from './PageStyles';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AdminContainer>
      <AdminForm onSubmit={handleSubmit}>
        <KeyRound size={40} color="#c59d5f" />
        <AdminTitle>Login de Administrador</AdminTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? <Loader size={20} className="animate-spin" /> : 'Entrar'}
        </SubmitButton>
      </AdminForm>
    </AdminContainer>
  );
};

export default AdminLogin;