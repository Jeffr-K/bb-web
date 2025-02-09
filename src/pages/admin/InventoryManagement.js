import React, { useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
`;

const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    object-fit: cover;
  }
`;

const StockControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    padding: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &.increase {
      background: #2ecc71;
      color: white;
    }

    &.decrease {
      background: #e74c3c;
      color: white;
    }
  }

  input {
    width: 60px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
  }
`;

const StockStatus = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;

  &.high {
    background: #e1f8e9;
    color: #2e7d32;
  }

  &.medium {
    background: #fff3e0;
    color: #e65100;
  }

  &.low {
    background: #ffebee;
    color: #c62828;
  }
`;

function InventoryManagement() {
  const [inventory] = useState([
    {
      id: 1,
      image: '/images/product1.jpg',
      name: '바닐라 라떼',
      category: '음료',
      currentStock: 100,
      minStock: 20,
      maxStock: 200,
      lastUpdated: '2024-03-15'
    },
    // ... 더미 데이터
  ]);

  const getStockStatus = (current, min, max) => {
    if (current <= min) return 'low';
    if (current >= max * 0.8) return 'high';
    return 'medium';
  };

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>재고 관리</Title>
        </Header>
        <InventoryTable>
          <thead>
            <tr>
              <th>상품</th>
              <th>카테고리</th>
              <th>현재 재고</th>
              <th>최소/최대</th>
              <th>상태</th>
              <th>재고 조정</th>
              <th>최근 업데이트</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={item.image} alt={item.name} />
                    {item.name}
                  </div>
                </td>
                <td>{item.category}</td>
                <td>{item.currentStock}</td>
                <td>{item.minStock} / {item.maxStock}</td>
                <td>
                  <StockStatus className={getStockStatus(item.currentStock, item.minStock, item.maxStock)}>
                    {item.currentStock <= item.minStock ? '부족' : 
                     item.currentStock >= item.maxStock * 0.8 ? '충분' : '보통'}
                  </StockStatus>
                </td>
                <td>
                  <StockControl>
                    <button className="decrease">
                      <FaMinus />
                    </button>
                    <input type="number" defaultValue={0} min={0} />
                    <button className="increase">
                      <FaPlus />
                    </button>
                  </StockControl>
                </td>
                <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </InventoryTable>
      </Container>
    </AdminLayout>
  );
}

export default InventoryManagement; 