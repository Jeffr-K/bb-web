import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCoffee, FaLeaf, FaIceCream, FaShoppingBag } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Container = styled.div`
  min-height: calc(100vh - 60px);
`;

const HeroSection = styled.div`
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 20px;
`;

const HeroContent = styled.div`
  animation: ${fadeIn} 1s ease-out;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    max-width: 600px;
    line-height: 1.6;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 40px;
  background: #e67e22;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(230, 126, 34, 0.4);
  }
`;

const FeaturesSection = styled.div`
  padding: 100px 20px;
  background: #fff;
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 0 20px;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;

  &:hover {
    transform: translateY(-10px);
  }

  .icon {
    font-size: 2.5rem;
    color: #e67e22;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 15px;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const PromotionSection = styled.div`
  padding: 80px 20px;
  background: #f8f9fa;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 40px;
    animation: ${fadeIn} 1s ease-out;
  }
`;

const PromotionGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const PromotionCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  animation: ${fadeIn} 1s ease-out;
  animation-delay: ${props => props.delay}s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .content {
    padding: 20px;

    h3 {
      font-size: 1.3rem;
      color: #2c3e50;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      margin-bottom: 15px;
    }

    .price {
      font-size: 1.2rem;
      color: #e67e22;
      font-weight: 600;
    }
  }
`;

function Home() {
  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <h1>봉봉카페에 오신 것을 환영합니다</h1>
          <p>
            최고급 원두로 만든 커피와 함께 특별한 순간을 만들어보세요.
            봉봉카페만의 시그니처 메뉴를 지금 만나보세요.
          </p>
          <CTAButton to="/products">메뉴 보기</CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesGrid>
          <FeatureCard delay={0}>
            <FaCoffee className="icon" />
            <h3>프리미엄 원두</h3>
            <p>엄선된 최고급 원두만을 사용하여 깊은 풍미를 선사합니다.</p>
          </FeatureCard>
          <FeatureCard delay={0.2}>
            <FaLeaf className="icon" />
            <h3>친환경 포장</h3>
            <p>환경을 생각하는 마음으로 친환경 포장재만 사용합니다.</p>
          </FeatureCard>
          <FeatureCard delay={0.4}>
            <FaIceCream className="icon" />
            <h3>시그니처 메뉴</h3>
            <p>봉봉카페만의 특별한 레시피로 만든 시그니처 메뉴를 만나보세요.</p>
          </FeatureCard>
          <FeatureCard delay={0.6}>
            <FaShoppingBag className="icon" />
            <h3>단체 주문</h3>
            <p>10인 이상 단체 주문 시 특별한 혜택을 제공해드립니다.</p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <PromotionSection>
        <h2>이달의 추천 메뉴</h2>
        <PromotionGrid>
          <PromotionCard delay={0.2}>
            <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3" alt="시그니처 라떼" />
            <div className="content">
              <h3>봉봉 시그니처 라떼</h3>
              <p>특별한 바닐라 시럽과 에스프레소의 완벽한 조화</p>
              <span className="price">6,500원</span>
            </div>
          </PromotionCard>
          <PromotionCard delay={0.4}>
            <img src="https://images.unsplash.com/photo-1579888944880-d98341245702?ixlib=rb-4.0.3" alt="아이스 아메리카노" />
            <div className="content">
              <h3>콜드브루 아메리카노</h3>
              <p>24시간 저온 추출한 깊은 풍미의 콜드브루</p>
              <span className="price">4,500원</span>
            </div>
          </PromotionCard>
          <PromotionCard delay={0.6}>
            <img src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3" alt="카페모카" />
            <div className="content">
              <h3>더블 초코 모카</h3>
              <p>진한 초콜릿과 에스프레소의 달콤한 만남</p>
              <span className="price">5,500원</span>
            </div>
          </PromotionCard>
        </PromotionGrid>
      </PromotionSection>
    </Container>
  );
}

export default Home; 