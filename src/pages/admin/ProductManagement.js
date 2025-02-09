import React, { useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ProductModal from '../../components/admin/ProductModal';

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

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #e67e22;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #d35400;
  }
`;

const ProductTable = styled.table`
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
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  gap: 5px;

  &.edit {
    background: #3498db;
    color: white;
    
    &:hover {
      background: #2980b9;
    }
  }

  &.delete {
    background: #e74c3c;
    color: white;

    &:hover {
      background: #c0392b;
    }
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;

  &.active {
    background: #e1f8e9;
    color: #2e7d32;
  }

  &.inactive {
    background: #ffebee;
    color: #c62828;
  }
`;

function ProductManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: '바닐라 라떼',
      category: '음료',
      price: 4500,
      stock: 100,
      status: 'active'
    },
    // ... 더미 데이터
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (formData) => {
    if (selectedProduct) {
      // 상품 수정 로직
      setProducts(prev => prev.map(p => 
        p.id === selectedProduct.id ? { ...p, ...formData } : p
      ));
    } else {
      // 상품 추가 로직
      setProducts(prev => [...prev, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    // 삭제 확인 모달 열기
  };

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>상품 관리</Title>
          <AddButton onClick={handleAddProduct}>
            <FaPlus /> 상품 추가
          </AddButton>
        </Header>

        <ProductTable>
          <thead>
            <tr>
              <th>상품명</th>
              <th>카테고리</th>
              <th>가격</th>
              <th>재고</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price.toLocaleString()}원</td>
                <td>{product.stock}개</td>
                <td>
                  <StatusBadge className={product.status}>
                    {product.status === 'active' ? '판매중' : '판매중지'}
                  </StatusBadge>
                </td>
                <td>
                  <ActionButton 
                    className="edit"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <FaEdit /> 수정
                  </ActionButton>
                  <ActionButton 
                    className="delete"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash /> 삭제
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>

        {isModalOpen && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveProduct}
          />
        )}
      </Container>
    </AdminLayout>
  );
}

export default ProductManagement; 