import React, { createContext, useState, useContext } from 'react';

export const CafeContext = createContext();

export const CafeProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: '시그니처 아메리카노',
      description: '깊은 풍미의 프리미엄 블렌드',
      image: 'https://example.com/americano.jpg'
    },
    {
      id: 2,
      name: '봉봉 라떼',
      description: '부드러운 우유와 에스프레소의 조화',
      image: 'https://example.com/latte.jpg'
    },
    {
      id: 3,
      name: '수제 디저트',
      description: '매일 아침 갓 구운 베이커리',
      image: 'https://example.com/dessert.jpg'
    }
  ]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    );
  };

  return (
    <CafeContext.Provider value={{
      menuItems,
      setMenuItems,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity
    }}>
      {children}
    </CafeContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCart must be used within a CafeProvider');
  }
  return context;
}; 