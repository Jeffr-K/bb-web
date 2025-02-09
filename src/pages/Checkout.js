import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CafeContext';

const CheckoutContainer = styled.div`
  padding: 100px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 10px;

  label {
    font-size: 1.1rem;
    color: #2c3e50;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
`;

const OrderSummary = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;

  h3 {
    margin-bottom: 20px;
  }
`;

const SubmitButton = styled.button`
  background: #2c3e50;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #34495e;
  }
`;

function Checkout() {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 결제 처리 로직 추가
    console.log('주문 정보:', formData);
    console.log('주문 상품:', cartItems);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <CheckoutContainer>
      <h2>주문/결제</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>전화번호</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>배송주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <OrderSummary>
          <h3>주문 내역</h3>
          {cartItems.map(item => (
            <div key={item.id}>
              <p>{item.name} x {item.quantity} = {(item.price * item.quantity).toLocaleString()}원</p>
            </div>
          ))}
          <h3>총 결제금액: {total.toLocaleString()}원</h3>
        </OrderSummary>

        <SubmitButton type="submit">결제하기</SubmitButton>
      </Form>
    </CheckoutContainer>
  );
}

export default Checkout; 