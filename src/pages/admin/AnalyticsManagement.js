import React, { useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';
import { Container, Header, Title } from '../../components/admin/CommonStyles';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  ChartTitle,
  Tooltip,
  Legend
);

const StatCards = styled.div`
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

  h3 {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  .value {
    font-size: 1.8rem;
    font-weight: 600;
    color: #2c3e50;
  }

  .change {
    font-size: 0.9rem;
    margin-top: 5px;
    
    &.positive {
      color: #2ecc71;
    }
    
    &.negative {
      color: #e74c3c;
    }
  }
`;

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const TableContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SalesTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    font-weight: 600;
    color: #2c3e50;
    background: #f8f9fa;
  }

  td {
    color: #2c3e50;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e67e22;
  border-radius: 4px;
  background: ${props => props.active ? '#e67e22' : 'white'};
  color: ${props => props.active ? 'white' : '#e67e22'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e67e22;
    color: white;
  }
`;

function AnalyticsManagement() {
  const [timeFilter, setTimeFilter] = useState('week');

  // 차트 데이터
  const chartData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '매출',
        data: [650000, 590000, 800000, 810000, 1560000, 1650000, 1200000],
        borderColor: '#e67e22',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '일별 매출 추이'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString() + '원';
          }
        }
      }
    }
  };

  // 더미 데이터
  const topProducts = [
    { name: '아메리카노', sales: 1250000, quantity: 250 },
    { name: '카페라떼', sales: 980000, quantity: 180 },
    { name: '바닐라라떼', sales: 850000, quantity: 150 },
    { name: '카푸치노', sales: 720000, quantity: 120 },
    { name: '에스프레소', sales: 450000, quantity: 150 }
  ];

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>매출 통계</Title>
        </Header>

        <StatCards>
          <StatCard>
            <h3>오늘 매출</h3>
            <div className="value">1,650,000원</div>
            <div className="change positive">+12.5% ▲</div>
          </StatCard>
          <StatCard>
            <h3>이번 주 매출</h3>
            <div className="value">7,260,000원</div>
            <div className="change positive">+8.3% ▲</div>
          </StatCard>
          <StatCard>
            <h3>이번 달 매출</h3>
            <div className="value">32,150,000원</div>
            <div className="change negative">-2.1% ▼</div>
          </StatCard>
          <StatCard>
            <h3>주문 건수</h3>
            <div className="value">285건</div>
            <div className="change positive">+5.2% ▲</div>
          </StatCard>
        </StatCards>

        <FilterContainer>
          <FilterButton 
            active={timeFilter === 'week'} 
            onClick={() => setTimeFilter('week')}
          >
            주간
          </FilterButton>
          <FilterButton 
            active={timeFilter === 'month'} 
            onClick={() => setTimeFilter('month')}
          >
            월간
          </FilterButton>
          <FilterButton 
            active={timeFilter === 'year'} 
            onClick={() => setTimeFilter('year')}
          >
            연간
          </FilterButton>
        </FilterContainer>

        <ChartContainer>
          <Line data={chartData} options={chartOptions} />
        </ChartContainer>

        <TableContainer>
          <h2 style={{ marginBottom: '20px' }}>인기 상품 TOP 5</h2>
          <SalesTable>
            <thead>
              <tr>
                <th>상품명</th>
                <th>판매량</th>
                <th>매출액</th>
                <th>비중</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}잔</td>
                  <td>{product.sales.toLocaleString()}원</td>
                  <td>{((product.sales / 4250000) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </SalesTable>
        </TableContainer>
      </Container>
    </AdminLayout>
  );
}

export default AnalyticsManagement; 