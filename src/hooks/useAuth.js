import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('sante_wallet_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('sante_wallet_user');
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('sante_wallet_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('sante_wallet_user');
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;