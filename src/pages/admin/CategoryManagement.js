import React, { useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';
import { Container, Header, Title } from '../../components/admin/CommonStyles';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import CategoryModal from '../../components/admin/CategoryModal';

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

const CategoryTable = styled.table`
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

const SubCategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SubCategoryTag = styled.span`
  padding: 4px 8px;
  background: #f1f2f6;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #2c3e50;
`;

function CategoryManagement() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: '음료',
      subCategories: ['커피', '차', '스무디'],
      productCount: 15
    },
    {
      id: 2,
      name: '디저트',
      subCategories: ['케이크', '쿠키', '베이커리'],
      productCount: 8
    },
    // ... 더미 데이터
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('정말 이 카테고리를 삭제하시겠습니까?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const handleSaveCategory = (formData) => {
    if (selectedCategory) {
      // 카테고리 수정
      setCategories(prev => prev.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      // 새 카테고리 추가
      setCategories(prev => [...prev, {
        id: Date.now(),
        ...formData,
        productCount: 0
      }]);
    }
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>카테고리 관리</Title>
          <AddButton onClick={handleAddCategory}>
            <FaPlus /> 카테고리 추가
          </AddButton>
        </Header>

        <CategoryTable>
          <thead>
            <tr>
              <th>카테고리명</th>
              <th>하위 카테고리</th>
              <th>상품 수</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <SubCategoryList>
                    {category.subCategories.map((subCat, index) => (
                      <SubCategoryTag key={index}>
                        {subCat}
                      </SubCategoryTag>
                    ))}
                  </SubCategoryList>
                </td>
                <td>{category.productCount}개</td>
                <td>
                  <ActionButton 
                    className="edit"
                    onClick={() => handleEditCategory(category)}
                  >
                    <FaEdit /> 수정
                  </ActionButton>
                  <ActionButton 
                    className="delete"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <FaTrash /> 삭제
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </CategoryTable>

        {isModalOpen && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveCategory}
          />
        )}
      </Container>
    </AdminLayout>
  );
}

export default CategoryManagement; 