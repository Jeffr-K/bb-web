import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaCoffee, FaHome, FaUser, FaBars, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import LoginModal from './LoginModal';

const Nav = styled.nav`
  background: ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    .desktop-menu {
      display: none;
    }
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 15px;

    .menu-icon {
      font-size: 1.5rem;
      color: white;
      cursor: pointer;
    }
  }
`;

const MobileNav = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: ${props => props.isOpen ? '0' : '-100%'};
    width: 80%;
    height: 100vh;
    background: ${props => props.theme.colors.background};
    transition: left 0.3s ease;
    z-index: 1001;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }
`;

const MobileOverlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
  }
`;

const MobileMenuList = styled.ul`
  padding: 20px 0;

  li {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    
    a {
      color: ${props => props.theme.colors.text.primary};
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;

const Logo = styled(Link)`
  color: ${props => props.theme.colors.accent};
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 30px;
    height: 30px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const CartCount = styled.span`
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.2rem;
`;

const CartIcon = styled.div`
  color: ${props => props.theme.colors.accent};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary}30;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LoginButton = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.accent};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
  }
`;

const UserProfile = styled.div`
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .nickname {
    font-weight: 500;
  }
`;

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Nav>
      <NavContainer>
        {/* 모바일 메뉴 */}
        <MobileMenu>
          <FaBars className="menu-icon" onClick={() => setIsMobileMenuOpen(true)} />
        </MobileMenu>

        {/* 로고 */}
        <Logo to="/">
          <img src="/assets/logo.jpeg" alt="봉봉카페 로고" />
          카페 봉봉
        </Logo>

        {/* 데스크톱 메뉴 */}
        <NavLinks className="desktop-menu">
          <NavLink to="/"><FaHome /> 홈</NavLink>
          <NavLink to="/products"><FaCoffee /> 상품</NavLink>
          <NavLink to="/about">소개</NavLink>
          <NavLink to="/locations">매장</NavLink>
        </NavLinks>

        {/* 데스크톱 유저 섹션 */}
        <UserSection className="desktop-menu">
          <Link to="/cart">
            <CartIcon>
              <FaShoppingCart />
            </CartIcon>
          </Link>
          {user ? (
            <UserProfile>
              <FaUser />
              <span className="nickname">{user.nickname}님</span>
            </UserProfile>
          ) : (
            <LoginButton onClick={() => setShowLoginModal(true)}>
              <FaUser />
              로그인
            </LoginButton>
          )}
        </UserSection>

        {/* 모바일 아이콘 */}
        <MobileMenu>
          <FaSearch className="menu-icon" />
          <Link to="/cart">
            <FaShoppingCart className="menu-icon" />
          </Link>
        </MobileMenu>

        {/* 모바일 사이드 메뉴 */}
        <MobileNav isOpen={isMobileMenuOpen}>
          <MobileMenuList>
            <li>
              {user ? (
                <div className="user-info">
                  <FaUser />
                  <span>{user.nickname}님</span>
                </div>
              ) : (
                <a onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowLoginModal(true);
                }}>
                  <FaUser />
                  로그인
                </a>
              )}
            </li>
            <li><Link to="/"><FaHome /> 홈</Link></li>
            <li><Link to="/products"><FaCoffee /> 상품</Link></li>
            <li><Link to="/about">소개</Link></li>
            <li><Link to="/locations">매장</Link></li>
          </MobileMenuList>
        </MobileNav>

        {/* 모바일 메뉴 오버레이 */}
        <MobileOverlay 
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </NavContainer>

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
    </Nav>
  );
}

export default Navbar;