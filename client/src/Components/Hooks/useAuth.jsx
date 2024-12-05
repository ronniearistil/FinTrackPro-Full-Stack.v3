import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const { data } = await axios.get('http://localhost:5555/auth/validate-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
          setCurrentUser(data.user);
        } catch {
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  return { isAuthenticated, currentUser, loading };
};
