import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FunctionComponent } from 'react';


type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in from localStorage
    const user = localStorage.getItem('user');
    
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll just check if email is admin@example.com and password is admin
      if (email === 'admin@example.com' && password === 'admin') {
        const user = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin'
        };
        
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const logout = (): void => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};