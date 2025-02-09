import React, { useState } from 'react';
import styled from 'styled-components';
import { useBulkOrders } from '../../context/BulkOrderContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import AdminLayout from '../../components/admin/AdminLayout';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case '대기중': return '#ffeaa7';
      case '승인': return '#55efc4';
      case '거절': return '#ff7675';
      case '픽업 완료': return '#74b9ff';
      default: return '#dfe6e9';
    }
  }};
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  background: ${props => props.approve ? '#00b894' : '#d63031'};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const ReceiptModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;

const Receipt = styled.div`
  font-family: 'Pretendard', sans-serif;
  background: white;
  padding: 20px;
  
  .header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #e67e22;

    h2 {
      font-size: 24px;
      color: #e67e22;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      margin: 5px 0;
      
      &:last-child {
        font-size: 0.9rem;
        color: #888;
      }
    }
  }

  .customer-info {
    margin: 20px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;

    p {
      margin: 8px 0;
      color: #2c3e50;
      display: flex;
      justify-content: space-between;
      
      span:first-child {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }
  
  .items {
    margin: 25px 0;
    border-top: 1px dashed #ddd;
    border-bottom: 1px dashed #ddd;
    padding: 15px 0;
    margin-bottom: 20px;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;

      .item-name {
        font-weight: 500;
        color: #2c3e50;
      }

      .item-details {
        text-align: right;
        
        .item-total {
          color: #e67e22;
          font-weight: 600;
          margin-left: 10px;
        }
      }
    }
  }
  
  .total {
    text-align: right;
    font-size: 1.2rem;
    font-weight: 600;
    color: #e67e22;
    padding: 15px;
    background: #fff3e0;
    border-radius: 8px;
    margin-bottom: 10px;
    display: block;
    width: 100%;
  }
`;

const PrintButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  
  &:hover {
    background: #27ae60;
  }
`;

const DownloadButton = styled.button`
  flex: 1;
  padding: 10px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #27ae60;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  flex: 1;
  padding: 10px;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #7f8c8d;
  }
`;

const OrderDetailsButton = styled.button`
  padding: 6px 12px;
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

const OrderDetailsModal = styled(ReceiptModal)`
  max-width: 900px;
  width: 90%;
`;

const OrderDetailsContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;

  h3 {
    color: #2c3e50;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e67e22;
  }

  .products-list {
    margin: 20px 0;
    
    .product-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #eee;
      
      &:last-child {
        border-bottom: none;
      }

      .product-info {
        display: flex;
        align-items: center;
        gap: 15px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 4px;
          object-fit: cover;
        }

        .name {
          font-weight: 500;
        }
      }

      .quantity {
        color: #666;
      }
    }
  }

  .delivery-info {
    margin-top: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;

    h4 {
      color: #666;
      font-size: 1rem;
      margin-bottom: 8px;
    }

    p {
      color: #2c3e50;
      line-height: 1.5;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .message {
      white-space: pre-wrap;
    }
  }
`;

const Modal = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 900px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
`;

const OrderDetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
`;

// 날짜 포맷 함수
const formatDate = (date) => {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long'
  });
};

function BulkOrderManagement() {
  const { bulkOrders, updateOrderStatus } = useBulkOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(null);

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (newStatus === '픽업 완료') {
      const order = bulkOrders.find(o => o.id === orderId);
      setSelectedOrder(order);
    }
  };

  const generateReceiptPDF = async (orderData) => {
    try {
      const receiptElement = document.querySelector('.receipt-content');
      if (!receiptElement) {
        console.error('Receipt element not found');
        return;
      }

      // 렌더링 완료를 위한 대기 시간 증가
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: receiptElement.scrollWidth,
        windowHeight: receiptElement.scrollHeight,
        // 캡처 영역 확장
        height: receiptElement.scrollHeight + 50,
        y: 0
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // PDF 크기 조정
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // 이미지 비율 계산
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      // 이미지 크기와 위치 조정
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      pdf.addImage(imgData, 'PNG', imgX, 0, finalWidth, finalHeight);
      pdf.save(`봉봉카페_영수증_${orderData.companyName}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  const handlePrint = () => {
    window.print();
    setSelectedOrder(null);
  };

  return (
    <AdminLayout>
      <Container>
        <Title>단체 주문 견적 관리</Title>
        <OrderTable>
          <thead>
            <tr>
              <th>주문일시</th>
              <th>회사/단체명</th>
              <th>담당자</th>
              <th>주문 상품</th>
              <th>총 금액</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {bulkOrders.map(order => (
              <tr key={order.id}>
                <td>{formatDate(order.createdAt)}</td>
                <td>{order.companyName}</td>
                <td>{order.contactName}</td>
                <td>
                  <OrderDetailsButton onClick={() => setShowOrderDetails(order)}>
                    상품 목록 ({order.products.length}개)
                  </OrderDetailsButton>
                </td>
                <td>{order.totalAmount.toLocaleString()}원</td>
                <td><StatusBadge status={order.status}>{order.status}</StatusBadge></td>
                <td>
                  {order.status === '대기중' && (
                    <>
                      <ActionButton
                        approve
                        onClick={() => handleStatusUpdate(order.id, '승인')}
                      >
                        승인
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleStatusUpdate(order.id, '거절')}
                      >
                        거절
                      </ActionButton>
                    </>
                  )}
                  {order.status === '승인' && (
                    <>
                      <ActionButton
                        approve
                        onClick={() => handleStatusUpdate(order.id, '픽업 완료')}
                      >
                        픽업 완료
                      </ActionButton>
                      <DownloadButton onClick={() => setSelectedOrder(order)}>
                        영수증 보기
                      </DownloadButton>
                    </>
                  )}
                  {order.status === '픽업 완료' && (
                    <DownloadButton onClick={() => setSelectedOrder(order)}>
                      영수증 보기
                    </DownloadButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </OrderTable>

        {/* 주문 상세 모달 */}
        {showOrderDetails && (
          <>
            <Overlay onClick={() => setShowOrderDetails(null)} />
            <OrderDetailsModal>
              <OrderDetailsContent>
                <h3>단체 주문 상세 내역</h3>
                <div className="products-list">
                  {showOrderDetails.products.map((product, index) => (
                    <div key={index} className="product-item">
                      <div className="product-info">
                        <img src={product.image} alt={product.name} />
                        <div className="name">{product.name}</div>
                      </div>
                      <div className="quantity">
                        {product.quantity}개
                        <span className="price">
                          ({product.price.toLocaleString()}원)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="delivery-info">
                  <h4>배송 희망일</h4>
                  <p>
                    {new Date(showOrderDetails.deliveryDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    })}
                  </p>

                  <h4>배송지 주소</h4>
                  <p>{showOrderDetails.deliveryAddress}</p>

                  {showOrderDetails.message && (
                    <>
                      <h4>추가 요청사항</h4>
                      <p className="message">{showOrderDetails.message}</p>
                    </>
                  )}
                </div>
              </OrderDetailsContent>
              <ButtonGroup>
                <CloseButton onClick={() => setShowOrderDetails(null)}>
                  닫기
                </CloseButton>
              </ButtonGroup>
            </OrderDetailsModal>
          </>
        )}

        {/* 영수증 모달 */}
        {selectedOrder && (
          <>
            <Overlay onClick={() => setSelectedOrder(null)} />
            <ReceiptModal>
              <Receipt className="receipt-content">
                <div className="header">
                  <h2>봉봉 카페</h2>
                  <p>단체 주문 영수증</p>
                  <p>{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div className="customer-info">
                  <p>
                    <span>회사/단체명</span>
                    <span>{selectedOrder.companyName}</span>
                  </p>
                  <p>
                    <span>담당자</span>
                    <span>{selectedOrder.contactName}</span>
                  </p>
                  <p>
                    <span>연락처</span>
                    <span>{selectedOrder.phone}</span>
                  </p>
                </div>
                <div className="items">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="item">
                      <span className="item-name">{product.name}</span>
                      <div className="item-details">
                        <span>{product.price.toLocaleString()}원 x {product.quantity}개</span>
                        <span className="item-total">
                          {(product.price * product.quantity).toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="total">
                  총 금액: {selectedOrder.totalAmount.toLocaleString()}원
                </div>
              </Receipt>
              <ButtonGroup>
                <DownloadButton onClick={() => generateReceiptPDF(selectedOrder)}>
                  영수증 다운로드
                </DownloadButton>
                <CloseButton onClick={() => setSelectedOrder(null)}>
                  닫기
                </CloseButton>
              </ButtonGroup>
            </ReceiptModal>
          </>
        )}
      </Container>
    </AdminLayout>
  );
}

export default BulkOrderManagement; 