import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUpload } from 'react-icons/fa';

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
  max-width: 600px;
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

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: #e67e22;
    outline: none;
  }
`;

const ImageUpload = styled.div`
  border: 2px dashed #ddd;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  
  &:hover {
    border-color: #e67e22;
  }

  img {
    max-width: 200px;
    max-height: 200px;
    margin-top: 10px;
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

function ProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active',
    image: null,
    imagePreview: null
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        status: product.status,
        image: null,
        imagePreview: product.image
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Title>{product ? '상품 수정' : '상품 추가'}</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>상품 이미지</Label>
            <ImageUpload onClick={() => document.getElementById('imageInput').click()}>
              {formData.imagePreview ? (
                <img src={formData.imagePreview} alt="상품 이미지" />
              ) : (
                <>
                  <FaUpload size={24} />
                  <p>이미지를 업로드하세요</p>
                </>
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </ImageUpload>
          </FormGroup>

          <FormGroup>
            <Label>상품명</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="상품명을 입력하세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>카테고리</Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">카테고리 선택</option>
              <option value="음료">음료</option>
              <option value="디저트">디저트</option>
              <option value="원두">원두</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>가격</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="가격을 입력하세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>재고</Label>
            <Input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="재고 수량을 입력하세요"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>상태</Label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">판매중</option>
              <option value="inactive">판매중지</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <Button type="button" className="cancel" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" className="save">
              {product ? '수정하기' : '추가하기'}
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
}

export default ProductModal; 