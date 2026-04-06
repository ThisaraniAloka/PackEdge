import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      authService
        .getCurrentUser()
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
          setIsAdmin(res.data.role === 'ADMIN');
        })
        .catch(() => {
          localStorage.removeItem('authToken');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    localStorage.setItem('authToken', res.data.token);
    setUser(res.data.user);
    setIsAuthenticated(true);
    setIsAdmin(res.data.user.role === 'ADMIN');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return { user, isAuthenticated, isAdmin, loading, login, logout };
};
