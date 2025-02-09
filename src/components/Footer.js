import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 40px 20px;

  @media (max-width: 768px) {
    display: none;  // 모바일에서 푸터 숨김
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #e67e22;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }

  p {
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: #bdc3c7;
    line-height: 1.6;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }
`;

const FooterLink = styled(Link)`
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: #e67e22;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: #bdc3c7;
  font-size: 1.5rem;
  
  &:hover {
    color: #e67e22;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #34495e;
  color: #bdc3c7;
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>봉봉카페</h3>
          <p>상호명: (주)봉봉에프앤비</p>
          <p>대표자: 김봉봉</p>
          <p>사업자등록번호: 123-45-67890</p>
          <p>본사: 인천광역시 중구 송학동3가 7-30번지 1층</p>
          <p>대표전화: 1588-0000</p>
          <SocialLinks>
            <SocialIcon href="https://instagram.com" target="_blank">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://facebook.com" target="_blank">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" target="_blank">
              <FaYoutube />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank">
              <FaTwitter />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>메뉴</h3>
          <ul>
            <li><FooterLink to="/products">전체 메뉴</FooterLink></li>
            <li><FooterLink to="/products">시즌 메뉴</FooterLink></li>
            <li><FooterLink to="/products">MD 상품</FooterLink></li>
            <li><FooterLink to="/products">단체 주문</FooterLink></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>고객지원</h3>
          <ul>
            <li><FooterLink to="/faq">자주 묻는 질문</FooterLink></li>
            <li><FooterLink to="/contact">1:1 문의</FooterLink></li>
            <li><FooterLink to="/locations">매장 찾기</FooterLink></li>
            <li><FooterLink to="/franchise">창업 문의</FooterLink></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>회사정보</h3>
          <ul>
            <li><FooterLink to="/about">회사 소개</FooterLink></li>
            <li><FooterLink to="/terms">이용약관</FooterLink></li>
            <li><FooterLink to="/privacy">개인정보처리방침</FooterLink></li>
            <li><FooterLink to="/careers">채용정보</FooterLink></li>
          </ul>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © 2024 봉봉카페 All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer; 