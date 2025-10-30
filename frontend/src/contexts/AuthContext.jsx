import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../utils/api';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        localStorage.setItem('token', token);
        try {
          const response = await api.getMe();
          setUser(response.data.user);
        } catch (error) {
          console.error('Failed to load user:', error);
          setToken(null);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        localStorage.removeItem('token');
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    const response = await api.login({ email, password });
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  // Register function
  const register = async (name, email, password) => {
    const response = await api.register({ name, email, password });
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;