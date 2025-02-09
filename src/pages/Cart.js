import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CafeContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';

const CartContainer = styled.div`
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CartHeader = styled.div`
  margin-bottom: 40px;
  
  h2 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .cart-summary {
    color: #666;
    font-size: 1.1rem;
  }
`;

const BackToShop = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #666;
  text-decoration: none;
  font-size: 1.1rem;
  margin-bottom: 20px;
  
  &:hover {
    color: #2c3e50;
  }
`;

const CartItemsContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px 2fr 1fr 1fr auto;
  align-items: center;
  gap: 30px;
  padding: 25px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const ItemInfo = styled.div`
  h3 {
    font-size: 1.3rem;
    color: #2c3e50;
    margin-bottom: 8px;
    
    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: #3498db;
      }
    }
  }

  .price {
    font-size: 1.2rem;
    color: #e74c3c;
    font-weight: 600;
  }

  .item-options {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #666;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  width: fit-content;

  button {
    background: #2c3e50;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;

    &:hover {
      background: #34495e;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2c3e50;
    min-width: 30px;
    text-align: center;
  }
`;

const ItemTotal = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #fee2e2;
    transform: scale(1.1);
  }
`;

const CartSummary = styled.div`
  margin-top: 40px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 1.1rem;
    color: #666;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid #eee;
    font-size: 1.4rem;
    font-weight: 700;
    color: #2c3e50;
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  background: #2c3e50;
  color: white;
  text-decoration: none;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin-top: 30px;
  font-size: 1.3rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(44, 62, 80, 0.2);

  &:hover {
    background: #34495e;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(44, 62, 80, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

  svg {
    font-size: 4rem;
    color: #ccc;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 15px;
  }

  p {
    color: #666;
    margin-bottom: 30px;
  }
`;

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 30000 ? 0 : 3000;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <BackToShop to="/products">
          <FaArrowLeft /> 상품 목록으로 돌아가기
        </BackToShop>
        <EmptyCart>
          <FaShoppingBag />
          <h3>장바구니가 비어있습니다</h3>
          <p>봉봉카페의 다양한 메뉴를 둘러보세요!</p>
          <CheckoutButton to="/products">쇼핑 계속하기</CheckoutButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <BackToShop to="/products">
        <FaArrowLeft /> 상품 목록으로 돌아가기
      </BackToShop>
      
      <CartHeader>
        <h2>
          <FaShoppingBag /> 장바구니
        </h2>
        <p className="cart-summary">총 {cartItems.length}개의 상품</p>
      </CartHeader>

      <CartItemsContainer>
        {cartItems.map(item => (
          <CartItem key={item.id}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemInfo>
              <h3>
                <Link to={`/product/${item.id}`}>
                  {item.name}
                </Link>
              </h3>
              <p className="price">{item.price.toLocaleString()}원</p>
              {item.options && (
                <p className="item-options">
                  옵션: {item.options}
                </p>
              )}
            </ItemInfo>
            <QuantityControl>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </QuantityControl>
            <ItemTotal>
              {(item.price * item.quantity).toLocaleString()}원
            </ItemTotal>
            <DeleteButton onClick={() => removeFromCart(item.id)}>
              <FaTrash />
            </DeleteButton>
          </CartItem>
        ))}
      </CartItemsContainer>

      <CartSummary>
        <div className="summary-row">
          <span>상품 금액</span>
          <span>{subtotal.toLocaleString()}원</span>
        </div>
        <div className="summary-row">
          <span>배송비</span>
          <span>
            {deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`}
            {deliveryFee > 0 && (
              <small style={{display: 'block', fontSize: '0.8rem', color: '#666'}}>
                * 30,000원 이상 구매 시 무료배송
              </small>
            )}
          </span>
        </div>
        <div className="total-row">
          <span>총 결제금액</span>
          <span>{total.toLocaleString()}원</span>
        </div>
        <CheckoutButton to="/checkout">
          결제하기 ({total.toLocaleString()}원)
        </CheckoutButton>
      </CartSummary>
    </CartContainer>
  );
}

export default Cart; 