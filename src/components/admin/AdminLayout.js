import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  FaBox, 
  FaShoppingBag, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaClipboardList,
  FaComments,
  FaTruck,
  FaPercent,
  FaStore,
  FaHome
} from 'react-icons/fa';

// GNB 스타일 컴포넌트
const AdminGNB = styled.nav`
  background: #2c3e50;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const GNBLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const AdminTitle = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: white;
`;

const AdminName = styled.span`
  color: #e67e22;
`;

const LogoutButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #e67e22;
  color: #e67e22;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e67e22;
    color: white;
  }
`;

const BackToApp = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 1rem;
  }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  padding-top: 60px; // GNB 높이만큼 패딩 추가
  position: relative;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px 0;
  position: fixed;
  height: calc(100vh - 60px); // GNB 높이 제외
  top: 60px; // GNB 아래에 위치
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #34495e;
  }

  &::-webkit-scrollbar-thumb {
    background: #576574;
    border-radius: 4px;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #576574 #34495e;

  /* 하단 패딩 추가 */
  & > *:last-child {
    margin-bottom: 100px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const Logo = styled.div`
  padding: 0 20px 20px 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #e67e22;
  border-bottom: 1px solid #34495e;
  margin-bottom: 20px;
`;

const MenuSection = styled.div`
  margin-bottom: 30px;  // 섹션 간 간격 증가

  &:last-child {
    margin-bottom: 40px;  // 마지막 섹션 하단 여백 증가
  }

  h3 {
    padding: 0 20px;
    color: #95a5a6;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;  // 제목과 메뉴 항목 간 간격 증가
  }
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }

  &:hover {
    background: #34495e;
  }

  &.active {
    background: #e67e22;
    color: white;
  }
`;

const menuItems = [
  {
    section: '상품 관리',
    items: [
      { to: '/admin/products', icon: FaBox, label: '상품 목록' },
      { to: '/admin/categories', icon: FaStore, label: '카테고리 관리' },
      { to: '/admin/inventory', icon: FaClipboardList, label: '재고 관리' }
    ]
  },
  {
    section: '주문 관리',
    items: [
      { to: '/admin/orders', icon: FaShoppingBag, label: '일반 주문 관리' },
      { to: '/admin/bulk-orders', icon: FaTruck, label: '단체 주문 관리' },
      { to: '/admin/delivery', icon: FaTruck, label: '배송 관리' }
    ]
  },
  {
    section: '회원 관리',
    items: [
      { to: '/admin/customers', icon: FaUsers, label: '회원 목록' },
      { to: '/admin/reviews', icon: FaComments, label: '리뷰 관리' }
    ]
  },
  {
    section: '프로모션',
    items: [
      { to: '/admin/promotions', icon: FaPercent, label: '프로모션 관리' },
      { to: '/admin/coupons', icon: FaPercent, label: '쿠폰 관리' }
    ]
  },
  {
    section: '통계/설정',
    items: [
      { to: '/admin/analytics', icon: FaChartBar, label: '매출 통계' },
      { to: '/admin/settings', icon: FaCog, label: '환경 설정' }
    ]
  }
];

function AdminLayout({ children }) {
  const location = useLocation();
  const handleLogout = () => {
    // 로그아웃 처리
  };

  return (
    <>
      <AdminGNB>
        <GNBLeft>
          <AdminTitle>봉봉 카페 관리자</AdminTitle>
          <BackToApp to="/">
            <FaHome />
            앱으로 돌아가기
          </BackToApp>
        </GNBLeft>
        <AdminInfo>
          <AdminName>관리자님</AdminName>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </AdminInfo>
      </AdminGNB>
      <Container>
        <Sidebar>
          {/* Logo 제거 (GNB로 이동) */}
          {menuItems.map((section, index) => (
            <MenuSection key={index}>
              <h3>{section.section}</h3>
              {section.items.map((item, idx) => (
                <MenuItem 
                  key={idx} 
                  to={item.to}
                  className={location.pathname === item.to ? 'active' : ''}
                >
                  {React.createElement(item.icon)}
                  {item.label}
                </MenuItem>
              ))}
            </MenuSection>
          ))}
        </Sidebar>
        <MainContent>
          {children}
        </MainContent>
      </Container>
    </>
  );
}

export default AdminLayout; 