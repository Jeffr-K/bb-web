import React from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';
import { Container, Header, Title } from '../../components/admin/CommonStyles';
import { FaShoppingBag, FaUsers, FaBox, FaTruck, FaExclamationCircle } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
  }

  &.orders .icon { background: #e67e22; }
  &.users .icon { background: #3498db; }
  &.products .icon { background: #2ecc71; }
  &.delivery .icon { background: #9b59b6; }

  .content {
    flex: 1;

    h3 {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 5px;
    }

    .value {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .change {
      font-size: 0.85rem;
      margin-top: 3px;
      
      &.positive { color: #2ecc71; }
      &.negative { color: #e74c3c; }
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;

  .order-info {
    .order-id {
      font-weight: 500;
      color: #2c3e50;
      margin-bottom: 5px;
    }

    .order-details {
      font-size: 0.9rem;
      color: #7f8c8d;
    }
  }

  .order-status {
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;

    &.pending { background: #fff3e0; color: #e67e22; }
    &.processing { background: #e3f2fd; color: #2196f3; }
    &.completed { background: #e8f5e9; color: #4caf50; }
  }
`;

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AlertItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  align-items: center;

  .icon {
    color: #e74c3c;
    font-size: 1.2rem;
  }

  .content {
    flex: 1;
    
    .title {
      font-weight: 500;
      color: #2c3e50;
      margin-bottom: 3px;
    }

    .time {
      font-size: 0.85rem;
      color: #7f8c8d;
    }
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 50px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled(Section)`
  height: 400px;
  padding: 20px;
  margin-bottom: 20px;
`;

function AdminHome() {
  const recentOrders = [
    { id: 'ORD-2024-001', customer: '김철수', items: 3, total: 15000, status: 'pending', time: '10분 전' },
    { id: 'ORD-2024-002', customer: '이영희', items: 2, total: 12000, status: 'processing', time: '25분 전' },
    { id: 'ORD-2024-003', customer: '박지민', items: 5, total: 28000, status: 'completed', time: '1시간 전' },
    { id: 'ORD-2024-004', customer: '최유진', items: 1, total: 4500, status: 'pending', time: '2시간 전' },
  ];

  const alerts = [
    { title: '아메리카노 재고 부족', time: '5분 전' },
    { title: '바닐라 시럽 재고 20% 미만', time: '1시간 전' },
    { title: '신규 리뷰 5건 등록', time: '2시간 전' },
    { title: '결제 취소 요청 1건', time: '3시간 전' },
  ];

  // 접속량 차트 데이터
  const visitorData = {
    labels: ['00시', '03시', '06시', '09시', '12시', '15시', '18시', '21시'],
    datasets: [
      {
        label: '접속자 수',
        data: [120, 80, 50, 180, 250, 280, 320, 210],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const visitorOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '시간대별 접속자 수'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '명';
          }
        }
      }
    }
  };

  // 인기 상품 차트 데이터
  const popularProductsData = {
    labels: ['아메리카노', '카페라떼', '바닐라라떼', '카푸치노', '에스프레소'],
    datasets: [
      {
        label: '조회수',
        data: [1200, 950, 880, 720, 650],
        backgroundColor: [
          'rgba(230, 126, 34, 0.8)',
          'rgba(52, 152, 219, 0.8)',
          'rgba(46, 204, 113, 0.8)',
          'rgba(155, 89, 182, 0.8)',
          'rgba(52, 73, 94, 0.8)'
        ],
        borderWidth: 1
      }
    ]
  };

  const popularProductsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '인기 상품 조회수'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '회';
          }
        }
      }
    }
  };

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>대시보드</Title>
        </Header>

        <DashboardGrid>
          <StatCard className="orders">
            <div className="icon">
              <FaShoppingBag />
            </div>
            <div className="content">
              <h3>오늘 주문</h3>
              <div className="value">128건</div>
              <div className="change positive">+12.5% ▲</div>
            </div>
          </StatCard>

          <StatCard className="users">
            <div className="icon">
              <FaUsers />
            </div>
            <div className="content">
              <h3>신규 회원</h3>
              <div className="value">24명</div>
              <div className="change positive">+8.3% ▲</div>
            </div>
          </StatCard>

          <StatCard className="products">
            <div className="icon">
              <FaBox />
            </div>
            <div className="content">
              <h3>재고 부족</h3>
              <div className="value">3개</div>
              <div className="change negative">+2건 ▲</div>
            </div>
          </StatCard>

          <StatCard className="delivery">
            <div className="icon">
              <FaTruck />
            </div>
            <div className="content">
              <h3>배송 중</h3>
              <div className="value">15건</div>
              <div className="change">진행중</div>
            </div>
          </StatCard>
        </DashboardGrid>

        {/* 차트 섹션 추가 */}
        <ChartGrid>
          <ChartSection>
            <h2>접속자 통계</h2>
            <Line data={visitorData} options={visitorOptions} />
          </ChartSection>
          <ChartSection>
            <h2>인기 상품</h2>
            <Bar data={popularProductsData} options={popularProductsOptions} />
          </ChartSection>
        </ChartGrid>

        <ContentGrid>
          <Section>
            <h2>최근 주문</h2>
            <OrderList>
              {recentOrders.map((order, index) => (
                <OrderItem key={index}>
                  <div className="order-info">
                    <div className="order-id">{order.id}</div>
                    <div className="order-details">
                      {order.customer} • {order.items}개 상품 • {order.total.toLocaleString()}원
                    </div>
                  </div>
                  <div className={`order-status ${order.status}`}>
                    {order.status === 'pending' && '대기중'}
                    {order.status === 'processing' && '처리중'}
                    {order.status === 'completed' && '완료'}
                  </div>
                </OrderItem>
              ))}
            </OrderList>
          </Section>

          <Section>
            <h2>알림</h2>
            <AlertList>
              {alerts.map((alert, index) => (
                <AlertItem key={index}>
                  <div className="icon">
                    <FaExclamationCircle />
                  </div>
                  <div className="content">
                    <div className="title">{alert.title}</div>
                    <div className="time">{alert.time}</div>
                  </div>
                </AlertItem>
              ))}
            </AlertList>
          </Section>
        </ContentGrid>
      </Container>
    </AdminLayout>
  );
}

export default AdminHome; 