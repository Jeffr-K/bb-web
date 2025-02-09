import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes, FaPrint } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

// 한글 폰트 데이터
const koreanFontBase64 = "YOUR_KOREAN_FONT_BASE64_HERE"; // 실제 폰트 데이터로 교체해야 함

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #2c3e50;
    color: white;
    font-weight: 600;
  }

  tr:hover {
    background: #f8f9fa;
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'pending': return '#ffeaa7';
      case 'approved': return '#55efc4';
      case 'completed': return '#74b9ff';
      case 'rejected': return '#ff7675';
      default: return '#dfe6e9';
    }
  }};
  color: ${props => props.status === 'pending' ? '#2c3e50' : 'white'};
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  margin-right: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  transition: all 0.3s ease;

  &.approve {
    background: #00b894;
    color: white;
    &:hover { background: #00a884; }
  }

  &.reject {
    background: #d63031;
    color: white;
    &:hover { background: #c62828; }
  }

  &.print {
    background: #0984e3;
    color: white;
    &:hover { background: #0874c3; }
  }
`;

const OrderDetails = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 10px;

  h4 {
    margin: 0 0 10px 0;
    color: #2c3e50;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
`;

function BulkOrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      cafeName: "봉봉카페 강남점",
      productName: "아메리카노",
      quantity: 50,
      orderName: "김철수",
      orderDate: "2024-03-01",
      pickupLocation: "서울시 강남구 테헤란로 123",
      status: "pending",
      additionalNotes: "모든 음료는 ICE로 부탁드립니다."
    },
    // 더미 데이터 추가
  ]);

  const handleApprove = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: 'approved'} : order
    ));
  };

  const handleReject = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: 'rejected'} : order
    ));
  };

  const handleComplete = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: 'completed'} : order
    ));
  };

  const printInvoice = async (order) => {
    // HTML 템플릿 생성
    const template = document.createElement('div');
    template.style.padding = '20px';
    template.style.fontFamily = "'Noto Sans KR', sans-serif";
    template.style.width = '800px';
    template.style.background = 'white';
    
    template.innerHTML = `
      <div style="padding: 40px;">
        <h1 style="text-align: center; font-size: 24px; margin-bottom: 40px;">봉봉카페 단체주문 거래명세서</h1>
        
        <div style="margin-bottom: 30px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; font-size: 14px;">주문번호: ${order.id}</td>
              <td style="padding: 8px; font-size: 14px;">주문일자: ${order.orderDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-size: 14px;">카페명: ${order.cafeName}</td>
              <td style="padding: 8px; font-size: 14px;">주문자: ${order.orderName}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 8px; font-size: 14px;">픽업장소: ${order.pickupLocation}</td>
            </tr>
          </table>

          <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
            <thead>
              <tr style="background: #2c3e50; color: white;">
                <th style="padding: 12px; text-align: left;">상품명</th>
                <th style="padding: 12px; text-align: right;">수량</th>
                <th style="padding: 12px; text-align: right;">단가</th>
                <th style="padding: 12px; text-align: right;">금액</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px;">${order.productName}</td>
                <td style="padding: 12px; text-align: right;">${order.quantity}</td>
                <td style="padding: 12px; text-align: right;">${(order.price || 6500).toLocaleString()}원</td>
                <td style="padding: 12px; text-align: right;">${((order.price || 6500) * order.quantity).toLocaleString()}원</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="background: #f8f9fa;">
                <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold;">총 금액</td>
                <td style="padding: 12px; text-align: right; font-weight: bold;">${((order.price || 6500) * order.quantity).toLocaleString()}원</td>
              </tr>
            </tfoot>
          </table>

          <div style="margin: 30px 0;">
            <h3 style="font-size: 16px; margin-bottom: 10px;">요청사항</h3>
            <p style="padding: 12px; background: #f8f9fa; border-radius: 4px;">${order.additionalNotes || '없음'}</p>
          </div>

          <div style="margin-top: 50px; font-size: 12px; color: #666;">
            <p>* 본 명세서는 단체주문 거래 증빙용으로 발행되었습니다.</p>
            <p>* 문의사항: 02-123-4567 (봉봉카페 고객센터)</p>
          </div>

          <div style="margin-top: 30px; text-align: right; font-size: 14px;">
            발행일자: ${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일
          </div>
        </div>
      </div>
    `;

    // 임시로 body에 추가
    document.body.appendChild(template);

    try {
      // HTML을 이미지로 변환
      const canvas = await html2canvas(template, {
        scale: 2, // 해상도를 높이기 위해 2배 스케일 적용
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // PDF 생성
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`봉봉카페_단체주문명세서_${order.id}.pdf`);
    } catch (error) {
      console.error('PDF 생성 중 오류 발생:', error);
    } finally {
      // 임시 엘리먼트 제거
      document.body.removeChild(template);
    }
  };

  return (
    <Container>
      <Title>단체 주문 관리</Title>
      <OrdersTable>
        <thead>
          <tr>
            <th>주문 번호</th>
            <th>카페명</th>
            <th>상품명</th>
            <th>수량</th>
            <th>주문자</th>
            <th>주문일</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <React.Fragment key={order.id}>
              <tr>
                <td>{order.id}</td>
                <td>{order.cafeName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.orderName}</td>
                <td>{order.orderDate}</td>
                <td>
                  <StatusBadge status={order.status}>
                    {order.status === 'pending' && '승인 대기'}
                    {order.status === 'approved' && '승인 완료'}
                    {order.status === 'completed' && '픽업 완료'}
                    {order.status === 'rejected' && '거절됨'}
                  </StatusBadge>
                </td>
                <td>
                  {order.status === 'pending' && (
                    <>
                      <ActionButton 
                        className="approve"
                        onClick={() => handleApprove(order.id)}
                      >
                        <FaCheck /> 승인
                      </ActionButton>
                      <ActionButton 
                        className="reject"
                        onClick={() => handleReject(order.id)}
                      >
                        <FaTimes /> 거절
                      </ActionButton>
                    </>
                  )}
                  {order.status === 'approved' && (
                    <ActionButton 
                      className="approve"
                      onClick={() => handleComplete(order.id)}
                    >
                      <FaCheck /> 픽업완료
                    </ActionButton>
                  )}
                  {order.status === 'completed' && (
                    <ActionButton 
                      className="print"
                      onClick={() => printInvoice(order)}
                    >
                      <FaPrint /> 명세서
                    </ActionButton>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="8">
                  <OrderDetails>
                    <h4>추가 정보</h4>
                    <p><strong>픽업 장소:</strong> {order.pickupLocation}</p>
                    <p><strong>요청사항:</strong> {order.additionalNotes}</p>
                  </OrderDetails>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </OrdersTable>
    </Container>
  );
}

export default BulkOrderManagement; 