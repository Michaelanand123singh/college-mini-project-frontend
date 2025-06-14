import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const value = {
    user,
    cart,
    login,
    logout,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};