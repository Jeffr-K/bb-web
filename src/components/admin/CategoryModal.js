import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: #e67e22;
    outline: none;
  }
`;

const SubCategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const SubCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 0.9rem;

  button {
    border: none;
    background: none;
    color: #e74c3c;
    cursor: pointer;
    padding: 0;
    font-size: 1.1rem;
  }
`;

const AddSubCategoryButton = styled.button`
  padding: 5px 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #2980b9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &.save {
    background: #e67e22;
    color: white;

    &:hover {
      background: #d35400;
    }
  }

  &.cancel {
    background: #95a5a6;
    color: white;

    &:hover {
      background: #7f8c8d;
    }
  }
`;

function CategoryModal({ category, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    subCategories: []
  });
  const [newSubCategory, setNewSubCategory] = useState('');

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        subCategories: [...category.subCategories]
      });
    }
  }, [category]);

  const handleAddSubCategory = () => {
    if (newSubCategory.trim()) {
      setFormData(prev => ({
        ...prev,
        subCategories: [...prev.subCategories, newSubCategory.trim()]
      }));
      setNewSubCategory('');
    }
  };

  const handleRemoveSubCategory = (index) => {
    setFormData(prev => ({
      ...prev,
      subCategories: prev.subCategories.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Title>{category ? '카테고리 수정' : '카테고리 추가'}</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>카테고리명</Label>
            <Input
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="카테고리명을 입력하세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>하위 카테고리</Label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Input
                value={newSubCategory}
                onChange={e => setNewSubCategory(e.target.value)}
                placeholder="하위 카테고리명을 입력하세요"
              />
              <AddSubCategoryButton type="button" onClick={handleAddSubCategory}>
                추가
              </AddSubCategoryButton>
            </div>
            <SubCategoryList>
              {formData.subCategories.map((subCat, index) => (
                <SubCategory key={index}>
                  {subCat}
                  <button type="button" onClick={() => handleRemoveSubCategory(index)}>
                    ×
                  </button>
                </SubCategory>
              ))}
            </SubCategoryList>
          </FormGroup>

          <ButtonGroup>
            <Button type="button" className="cancel" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" className="save">
              {category ? '수정하기' : '추가하기'}
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
}

export default CategoryModal; 