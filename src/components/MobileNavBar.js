import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaList, FaCoffee, FaShoppingCart, FaUser, FaChevronLeft } from 'react-icons/fa';

const NavBarContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 10px 0 6px 0;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
  }
`;

const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${props => props.active ? props.theme.colors.primary : '#666'};
  font-size: 0.7rem;
  min-width: 50px;

  svg {
    font-size: 1.3rem;
    margin-bottom: 2px;
  }
`;

const CategorySlideMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  transform: translateX(${props => props.show ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const CategoryHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 15px;

  button {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #666;
    padding: 5px;
    display: flex;
    align-items: center;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
  }
`;

const CategoryContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const MainCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

const MainCategoryItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 15px 10px;
  background: ${props => props.active ? props.theme.colors.primary + '15' : 'white'};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : '#eee'};
  border-radius: 12px;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text.primary};
  font-size: 0.9rem;
  transition: all 0.2s ease;

  svg {
    font-size: 1.5rem;
  }
`;

const SubCategories = styled.div`
  display: ${props => props.show ? 'grid' : 'none'};
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 12px;
`;

const SubCategoryItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: white;
  border: 1px solid ${props => props.active ? props.theme.colors.primary : '#eee'};
  border-radius: 8px;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text.primary};
  font-size: 0.85rem;
  transition: all 0.2s ease;

  svg {
    font-size: 1.1rem;
  }
`;

function MobileNavBar({ categories, categoryIcons, subCategoryIcons, onCategorySelect }) {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 카테고리 메뉴 관련 렌더링은 categories가 배열일 때만 표시
  const showCategoryMenu = Array.isArray(categories) && categories.length > 0;

  // 네비게이션 처리 함수
  const handleNavigation = (path) => {
    if (showCategories) {
      setShowCategories(false);  // 카테고리 메뉴가 열려있으면 닫기
    }
    navigate(path);
  };

  const handleMainCategoryClick = (category) => {
    setSelectedMainCategory(category === selectedMainCategory ? null : category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  // 뒤로가기 이벤트 핸들러 추가
  useEffect(() => {
    const handleBackButton = (e) => {
      if (showCategories) {
        e.preventDefault();
        setShowCategories(false);
      }
    };

    window.addEventListener('popstate', handleBackButton);
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [showCategories]);

  // 카테고리 메뉴 열 때 history에 state 추가
  const handleShowCategories = () => {
    window.history.pushState({ type: 'category' }, '');
    setShowCategories(true);
  };

  return (
    <>
      <NavBarContainer style={{ zIndex: showCategories ? 1002 : 1000 }}>
        <NavList>
          <NavItem
            active={location.pathname === '/'}
            onClick={() => handleNavigation('/')}
          >
            <FaHome />
            <span>홈</span>
          </NavItem>
          <NavItem
            active={showCategories}
            onClick={handleShowCategories}
          >
            <FaList />
            <span>카테고리</span>
          </NavItem>
          <NavItem
            active={location.pathname === '/products'}
            onClick={() => handleNavigation('/products')}
          >
            <FaCoffee />
            <span>상품</span>
          </NavItem>
          <NavItem
            active={location.pathname === '/cart'}
            onClick={() => handleNavigation('/cart')}
          >
            <FaShoppingCart />
            <span>장바구니</span>
          </NavItem>
          <NavItem
            active={location.pathname === '/mypage'}
            onClick={() => handleNavigation('/mypage')}
          >
            <FaUser />
            <span>마이</span>
          </NavItem>
        </NavList>
      </NavBarContainer>

      {categories && categories.length > 0 && (
        <CategorySlideMenu show={showCategories}>
          <CategoryHeader>
            <button onClick={() => {
              setShowCategories(false);
            }}>
              <FaChevronLeft />
            </button>
            <h2>카테고리</h2>
          </CategoryHeader>
          <CategoryContent>
            <MainCategories>
              {categories.map(category => {
                const Icon = categoryIcons[category.name];
                return (
                  <MainCategoryItem
                    key={category.name}
                    active={category.name === selectedMainCategory}
                    onClick={() => handleMainCategoryClick(category.name)}
                  >
                    {Icon && <Icon />}
                    {category.name}
                  </MainCategoryItem>
                );
              })}
            </MainCategories>
            {selectedMainCategory && categories.find(cat => cat.name === selectedMainCategory)?.subCategories?.length > 0 && (
              <SubCategories show={true}>
                {categories.find(cat => cat.name === selectedMainCategory).subCategories.map(subCategory => {
                  const SubIcon = subCategoryIcons[subCategory];
                  return (
                    <SubCategoryItem
                      key={subCategory}
                      onClick={() => {
                        onCategorySelect(selectedMainCategory, subCategory);
                        setShowCategories(false);
                      }}
                    >
                      {SubIcon && <SubIcon />}
                      {subCategory}
                    </SubCategoryItem>
                  );
                })}
              </SubCategories>
            )}
          </CategoryContent>
        </CategorySlideMenu>
      )}
    </>
  );
}

export default MobileNavBar; 