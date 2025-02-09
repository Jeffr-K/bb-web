import React, { createContext, useContext, useState, useEffect } from 'react';

const BulkOrderContext = createContext();

export function BulkOrderProvider({ children }) {
  // localStorage에서 데이터 불러오기
  const [bulkOrders, setBulkOrders] = useState(() => {
    const savedOrders = localStorage.getItem('bulkOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // bulkOrders가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('bulkOrders', JSON.stringify(bulkOrders));
  }, [bulkOrders]);

  const addBulkOrder = (orderData) => {
    setBulkOrders(prev => [
      {
        id: Date.now(),
        ...orderData,
        status: '대기중',
        createdAt: new Date().toISOString(),
      },
      ...prev  // 새 주문을 배열 앞에 추가
    ]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setBulkOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <BulkOrderContext.Provider value={{ bulkOrders, addBulkOrder, updateOrderStatus }}>
      {children}
    </BulkOrderContext.Provider>
  );
}

export function useBulkOrders() {
  return useContext(BulkOrderContext);
} 