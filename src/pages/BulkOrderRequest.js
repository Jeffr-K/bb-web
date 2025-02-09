import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 40px;
  text-align: center;
`;

const Form = styled.form`
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 25px;

  label {
    display: block;
    margin-bottom: 10px;
    color: #2c3e50;
    font-weight: 600;
  }

  input, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const OrderSummary = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const ProductList = styled.div`
  display: grid;
  gap: 20px;
`;

const ProductItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
  }

  .price {
    color: #e67e22;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    width: 60px;
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const TotalPrice = styled.div`
  text-align: right;
  padding: 20px;
  border-top: 2px solid #eee;
  margin-top: 20px;

  .total {
    font-size: 1.2rem;
    color: #e67e22;
    font-weight: 600;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #e67e22;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #d35400;
    transform: translateY(-2px);
  }
`;

function BulkOrderRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const products = location.state?.products || [];

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    deliveryDate: new Date(),
    deliveryAddress: '',
    message: ''
  });

  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => ({
      ...acc,
      [product.id]: 1
    }), {})
  );

  useEffect(() => {
    if (products.length === 0) {
      navigate('/products');
    }
  }, [products, navigate]);

  if (products.length === 0) return null;

  const handleQuantityChange = (productId, value) => {
    const newValue = Math.max(1, parseInt(value) || 1);
    setQuantities(prev => ({
      ...prev,
      [productId]: newValue
    }));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => (
      total + (product.price * quantities[product.id])
    ), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        quantity: quantities[product.id],
        price: product.price
      })),
      totalAmount: calculateTotal()
    };
    console.log('주문 데이터:', orderData);
    // TODO: API 호출 로직 추가
    alert('단체 주문이 접수되었습니다.');
    navigate('/products');
  };

  return (
    <Container>
      <Title>단체 주문 견적 요청</Title>
      <Form onSubmit={handleSubmit}>
        <OrderSummary>
          <SummaryTitle>주문 상품 정보</SummaryTitle>
          <ProductList>
            {products.map(product => (
              <ProductItem key={product.id}>
                <img src={product.image} alt={product.name} />
                <ProductInfo>
                  <h4>{product.name}</h4>
                  <div className="price">{product.price.toLocaleString()}원</div>
                </ProductInfo>
                <QuantityControl>
                  <input
                    type="number"
                    min="1"
                    value={quantities[product.id]}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  />
                  개
                </QuantityControl>
              </ProductItem>
            ))}
          </ProductList>
          <TotalPrice>
            <div className="total">총 주문금액: {calculateTotal().toLocaleString()}원</div>
          </TotalPrice>
        </OrderSummary>

        <FormGroup>
          <label>회사/단체명 *</label>
          <input
            required
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            placeholder="회사나 단체명을 입력해주세요"
          />
        </FormGroup>

        <FormGroup>
          <label>담당자명 *</label>
          <input
            required
            type="text"
            value={formData.contactName}
            onChange={(e) => setFormData({...formData, contactName: e.target.value})}
            placeholder="담당자 성함을 입력해주세요"
          />
        </FormGroup>

        <FormGroup>
          <label>이메일 *</label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="연락받으실 이메일을 입력해주세요"
          />
        </FormGroup>

        <FormGroup>
          <label>연락처 *</label>
          <input
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="연락처를 입력해주세요"
          />
        </FormGroup>

        <FormGroup>
          <label>배송 희망일 *</label>
          <DatePicker
            selected={formData.deliveryDate}
            onChange={(date) => setFormData({...formData, deliveryDate: date})}
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
            locale={ko}
            className="form-control"
          />
        </FormGroup>

        <FormGroup>
          <label>배송지 주소 *</label>
          <input
            required
            type="text"
            value={formData.deliveryAddress}
            onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
            placeholder="상세한 배송지 주소를 입력해주세요"
          />
        </FormGroup>

        <FormGroup>
          <label>추가 요청사항</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="추가 요청사항이 있다면 입력해주세요"
          />
        </FormGroup>

        <SubmitButton type="submit">견적 요청하기</SubmitButton>
      </Form>
    </Container>
  );
}

export default BulkOrderRequest; 