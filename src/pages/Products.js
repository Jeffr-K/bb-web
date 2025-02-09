import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHeart, 
  FaComments, 
  FaCoffee,
  FaMugHot,
  FaGlassWhiskey,
  FaWineGlass,
  FaCocktail,
  FaIceCream,
  FaBirthdayCake,
  FaHamburger,
  FaShoppingBag,
  FaLeaf,
  FaCookie,
  FaBreadSlice,
  FaGift,
  FaChevronDown,
  FaChevronRight,
  FaTshirt,
  FaCoffee as FaDrip,
  FaMugHot as FaLatte
} from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import MobileNavBar from '../components/MobileNavBar';

// 카테고리 정의
const categories = {
  전체: [],
  커피: [
    '아메리카노',
    '에스프레소',
    '콜드브루',
    '드립커피'
  ],
  라떼: [
    '카페라떼',
    '바닐라라떼',
    '카라멜라떼',
    '헤이즐넛라떼',
    '티라떼'
  ],
  스무디: [
    '과일스무디',
    '요거트스무디',
    '커피스무디',
    '프라페'
  ],
  에이드: [
    '레몬에이드',
    '자몽에이드',
    '청포도에이드',
    '패션후르츠에이드'
  ],
  디저트: [
    '케이크',
    '마카롱',
    '쿠키',
    '브라우니',
    '크로플',
    '스콘'
  ],
  브런치: [
    '에그베네딕트',
    '토스트',
    '베이글',
    '오믈렛',
    '에그모닝 샌드위치',
    '베이컨햄치즈 샌드위치',
    '치킨데리야끼 샌드위치',
    '그릴드치즈 샌드위치',
    '클럽 샌드위치',
    'BLT 샌드위치',
    '아보카도 샌드위치',
    '연어 샌드위치'
  ]
};

// 카테고리 아이콘 매핑
const categoryIcons = {
  전체: FaShoppingBag,
  커피: FaCoffee,
  라떼: FaMugHot,
  스무디: FaIceCream,
  에이드: FaCocktail,
  디저트: FaBirthdayCake,
  브런치: FaHamburger
};

// 서브카테고리 아이콘 매핑
const subCategoryIcons = {
  '아메리카노': FaCoffee,
  '에스프레소': FaMugHot,
  '콜드브루': FaGlassWhiskey,
  '드립커피': FaDrip,
  '카페라떼': FaLatte,
  '바닐라라떼': FaLatte,
  '카라멜라떼': FaLatte,
  '헤이즐넛라떼': FaLatte,
  '티라떼': FaLeaf,
  '과일스무디': FaWineGlass,
  '요거트스무디': FaWineGlass,
  '커피스무디': FaGlassWhiskey,
  '프라페': FaGlassWhiskey,
  '레몬에이드': FaCocktail,
  '자몽에이드': FaCocktail,
  '청포도에이드': FaCocktail,
  '패션후르츠에이드': FaCocktail,
  '케이크': FaBirthdayCake,
  '마카롱': FaCookie,
  '쿠키': FaCookie,
  '브라우니': FaCookie,
  '크로플': FaBreadSlice,
  '스콘': FaBreadSlice,
  '에그베네딕트': FaBreadSlice,
  '토스트': FaBreadSlice,
  '베이글': FaBreadSlice,
  '오믈렛': FaBreadSlice,
  '텀블러': FaMugHot,
  '머그컵': FaMugHot,
  '에코백': FaTshirt,
  '파우치': FaShoppingBag,
  '스티커': FaGift,
  '에그모닝 샌드위치': FaHamburger,
  '베이컨햄치즈 샌드위치': FaHamburger,
  '치킨데리야끼 샌드위치': FaHamburger,
  '그릴드치즈 샌드위치': FaHamburger,
  '클럽 샌드위치': FaHamburger,
  'BLT 샌드위치': FaHamburger,
  '아보카도 샌드위치': FaHamburger,
  '연어 샌드위치': FaHamburger
};

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
  gap: 30px;
  padding: 0 40px 40px 40px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 8px 40px 8px;
    gap: 0;  // 모바일에서 gap 제거
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 80px;

  @media (max-width: 768px) {
    position: sticky;
    top: 60px;
    z-index: 10;
    padding: 15px 15px 0 15px;
    margin: 0 -8px;
    border-radius: 0;
    box-shadow: none;  // 모바일에서 그림자 제거
    border-bottom: none;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;  // 여러 줄로 표시되도록 변경
    gap: 8px;
    padding-bottom: 15px;
  }
`;

const CategoryItem = styled.li`
  padding: 12px 15px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: ${props => props.active ? '#e67e22' : '#2c3e50'};
  background: ${props => props.active ? '#fff3e0' : 'transparent'};
  font-weight: ${props => props.active ? '600' : 'normal'};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.9rem;  // 폰트 크기 조정
  }

  .category-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .icon {
    font-size: 1.2rem;
  }

  &:hover {
    background: #fff3e0;
    color: #e67e22;
  }
`;

const SubCategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-wrap: wrap;
  gap: 8px;
  background: #f8f8f8;
  padding: 12px;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 8px;
    gap: 6px;
  }
`;

const SubCategoryItem = styled.button`
  padding: 6px 12px;
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text.primary};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : '#ddd'};
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => !props.active && props.theme.colors.primary};
  }

  svg {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 4px 10px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 24px;
    column-gap: 6px;
    margin-bottom: 180px;  // 하단 여백 증가
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 24px;
    column-gap: 6px;
    margin-bottom: 180px;  // 하단 여백 증가
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    border-radius: 10px;  // 모바일에서는 라운딩을 좀 더 작게
  }
`;

const SelectCheckbox = styled.input`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 1;
`;

const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const LikeButton = styled.button`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 1;

  svg {
    font-size: 1.3rem;
    color: ${props => props.isLiked ? '#e74c3c' : 'rgba(255, 255, 255, 0.8)'};
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
    transition: all 0.2s ease;
  }

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    bottom: 12px;
    left: 12px;

    svg {
      font-size: 1rem;
    }
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 150px;  // 모바일에서는 이미지 높이를 좀 더 작게
  }
`;

const ProductInfo = styled.div`
  padding: 15px;

  @media (max-width: 768px) {
    padding: 8px 8px 4px 8px;  // 하단 패딩을 더 줄임
  }
`;

const ProductName = styled(Link)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  font-weight: 600;
  display: block;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  &:hover {
    color: #e67e22;
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;

const Price = styled.span`
  color: ${props => props.theme.colors.text.primary};
  font-weight: 600;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;  // 1rem에서 0.9rem으로 축소
  }
`;

const ProductStats = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  padding-top: 6px;  // 상단 패딩 축소
  border-top: 1px solid #eee;
  margin-bottom: 0;  // 하단 마진 제거

  @media (max-width: 768px) {
    padding-top: 4px;  // 모바일에서 더 작게
    margin-bottom: 0;
  }
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;  // 아이콘과 텍스트 사이 간격
  margin-right: 8px;  // margin-left에서 margin-right로 변경

  &:last-child {
    margin-right: 0;
  }

  svg {
    font-size: 0.9rem;
  }
`;

const MainBanner = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const BannerContent = styled.div`
  text-align: center;
  color: white;
  padding: 0 20px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);

    @media (max-width: 768px) {
      font-size: 1.5rem;  // 2.5rem에서 1.5rem으로 축소
      margin-bottom: 8px;  // 여백도 축소
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;  // 더 작은 화면에서는 더 작게
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);

    @media (max-width: 768px) {
      font-size: 0.9rem;  // 1.2rem에서 0.9rem으로 축소
      margin-bottom: 12px;
      
      br {
        display: none;  // 모바일에서는 줄바꿈 제거
      }
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;  // 더 작은 화면에서는 더 작게
    }
  }

  .highlight {
    color: #e67e22;
    font-weight: 700;
  }
`;

const BannerButton = styled.button`
  padding: 12px 30px;
  background: #e67e22;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);

  &:hover {
    background: #d35400;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;

  @media (max-width: 768px) {
    display: none;  // 모바일에서는 페이지네이션 숨김
  }
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: ${props => props.active ? 'none' : '1px solid #ddd'};
  background: ${props => props.active ? '#e67e22' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 0.9rem;
  }

  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: #666;
  margin: 0 15px;
`;

const BulkOrderBar = styled.div`
  position: fixed;
  bottom: ${props => props.show ? '56px' : '-200px'};  // 60px → 56px로 수정
  left: 0;
  right: 0;
  background: white;
  padding: 15px 20px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  transition: bottom 0.3s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1001;

  @media (max-width: 768px) {
    padding: 12px 16px;
    bottom: ${props => props.show ? '56px' : '-200px'};  // 60px → 56px로 수정
    min-height: 100px;
  }
`;

const SelectedInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .count {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text.primary};
    font-weight: 500;

    span {
      color: ${props => props.theme.colors.primary};
      font-weight: 700;
      font-size: 1.2rem;
      margin: 0 2px;
    }
  }

  .selected-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  @media (max-width: 768px) {
    .count {
      font-size: 1rem;

      span {
        font-size: 1.1rem;
      }
    }
  }
`;

const SelectedItemChip = styled.div`
  background: #f5f5f5;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 4px 8px;
  }

  .remove {
    cursor: pointer;
    color: #666;
    padding: 0 2px;
    &:hover {
      color: #e74c3c;
    }
  }
`;

const BulkOrderButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  margin-left: 20px;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
    margin-left: 12px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin: 40px 0 30px 0;  // 상단 마진 추가
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 30px 0 20px 0;  // 모바일에서는 약간 줄임
  }
`;

// 모바일용 하위 카테고리 컨테이너
const MobileSubCategoryContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin: 0 -8px;
    padding: 15px;
    background: ${props => props.theme.colors.background};
    border-bottom: 1px solid #eee;
  }
`;

const MobileSubCategoryTitle = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 10px;
`;

const MobileSubCategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MobileSubCategoryItem = styled.button`
  padding: 6px 12px;
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text.primary};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : '#ddd'};
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => !props.active && props.theme.colors.primary};
  }

  svg {
    font-size: 0.9rem;
  }
`;

// 로딩 인디케이터 추가
const LoadingIndicator = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 0.9rem;
  
  @media (min-width: 769px) {
    display: none;  // 데스크톱에서는 숨김
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
`;

// 상품 데이터를 컴포넌트 외부로 이동
const products = [
  {
    id: 1,
    name: '봉봉 시그니처 라떼',
    originalPrice: 7000,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3',
    reviews: 128,
    likes: 342,
    category: '라떼'
  },
  {
    id: 2,
    name: '아메리카노',
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3',
    reviews: 256,
    likes: 421,
    category: '커피'
  },
  {
    id: 3,
    name: '카페모카',
    originalPrice: 6000,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3',
    reviews: 89,
    likes: 156,
    category: '커피'
  },
  {
    id: 4,
    name: '딸기 스무디',
    originalPrice: 6500,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3',
    reviews: 67,
    likes: 98,
    category: '스무디'
  },
  {
    id: 5,
    name: '망고 스무디',
    originalPrice: 6500,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixlib=rb-4.0.3',
    reviews: 45,
    likes: 87,
    category: '스무디'
  },
  {
    id: 6,
    name: '레몬 에이드',
    originalPrice: 5500,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3',
    reviews: 78,
    likes: 134,
    category: '에이드'
  },
  {
    id: 7,
    name: '청포도 에이드',
    originalPrice: 5500,
    image: 'https://images.unsplash.com/photo-1567861911437-538298e4232c?ixlib=rb-4.0.3',
    reviews: 92,
    likes: 167,
    category: '에이드'
  },
  {
    id: 8,
    name: '티라미수',
    originalPrice: 7000,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3',
    reviews: 156,
    likes: 289,
    category: '디저트'
  },
  {
    id: 9,
    name: '초코 브라우니',
    originalPrice: 5500,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3',
    reviews: 112,
    likes: 245,
    category: '디저트'
  },
  {
    id: 10,
    name: '아보카도 토스트',
    originalPrice: 8500,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3',
    reviews: 67,
    likes: 143,
    category: '브런치'
  },
  {
    id: 11,
    name: '에그 베네딕트',
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3',
    reviews: 89,
    likes: 178,
    category: '브런치'
  },
  {
    id: 12,
    name: '봉봉 텀블러',
    originalPrice: 28000,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3',
    reviews: 45,
    likes: 98,
    category: '굿즈'
  },
  {
    id: 13,
    name: '바닐라 라떼',
    originalPrice: 6000,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3',
    reviews: 156,
    likes: 267,
    category: '라떼'
  },
  {
    id: 14,
    name: '카라멜 마끼아또',
    originalPrice: 6000,
    image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?ixlib=rb-4.0.3',
    reviews: 134,
    likes: 245,
    category: '라떼'
  },
  {
    id: 15,
    name: '콜드브루',
    originalPrice: 5500,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3',
    reviews: 198,
    likes: 312,
    category: '커피'
  },
  {
    id: 16,
    name: '봉봉 에코백',
    originalPrice: 18000,
    image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?ixlib=rb-4.0.3',
    reviews: 34,
    likes: 76,
    category: '굿즈'
  },
  {
    id: 17,
    name: '블루베리 치즈케이크',
    originalPrice: 6500,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3',
    reviews: 178,
    likes: 289,
    category: '디저트'
  },
  {
    id: 18,
    name: '크로플',
    originalPrice: 5000,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-4.0.3',
    reviews: 145,
    likes: 234,
    category: '디저트'
  },
  {
    id: 19,
    name: '봉봉 머그컵',
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3',
    reviews: 67,
    likes: 123,
    category: '굿즈'
  },
  {
    id: 20,
    name: '허니 브레드',
    originalPrice: 9000,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3',
    reviews: 89,
    likes: 156,
    category: '디저트'
  }
];

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [openCategories, setOpenCategories] = useState(['전체']);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const productsPerPage = 12;
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const navigate = useNavigate();
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(products.length / productsPerPage);

  // 필터링된 상품 목록을 반환하는 함수
  const getFilteredProducts = useCallback(() => {
    let filtered = [...products];
    
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (selectedSubCategory) {
      filtered = filtered.filter(product => product.subCategory === selectedSubCategory);
    }
    
    return filtered;
  }, [selectedCategory, selectedSubCategory]);

  // 초기 데이터 로드 및 페이지네이션/무한스크롤 처리
  useEffect(() => {
    const filteredProducts = getFilteredProducts();
    
    if (isMobile) {
      setCurrentProducts(filteredProducts.slice(0, productsPerPage));
      setHasMore(filteredProducts.length > productsPerPage);
    } else {
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      setCurrentProducts(filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct));
    }
  }, [currentPage, isMobile, getFilteredProducts]);

  // 카테고리 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubCategory]);

  // 마지막 아이템 참조 콜백
  const lastProductRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && isMobile) {
        loadMoreProducts();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, isMobile]);

  const handleCategoryClick = (category) => {
    if (openCategories.includes(category)) {
      setOpenCategories(openCategories.filter(cat => cat !== category));
    } else {
      setOpenCategories([...openCategories, category]);
    }
    setSelectedCategory(category);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleCardClick = (e, productId) => {
    if (e.target.type === 'checkbox') {
      return;
    }
    navigate(`/product/${productId}`);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const selectedProductsData = products.filter(product => 
    selectedProducts.includes(product.id)
  );

  const handleBulkOrder = () => {
    // 선택된 상품들의 데이터를 가져와서 필요한 정보만 전달
    const orderProducts = selectedProductsData.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price || product.originalPrice, // price가 없으면 originalPrice 사용
      image: product.image,
      quantity: 1
    }));

    // 상품 데이터 확인을 위한 로그
    console.log('주문할 상품들:', orderProducts);

    navigate('/bulk-order', { 
      state: { 
        products: orderProducts
      } 
    });
  };

  const removeSelectedProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  const toggleLike = (e, productId) => {
    e.stopPropagation();
    setLikedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // 추가 상품 로드 함수
  const loadMoreProducts = () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const newProducts = products.slice(currentProducts.length, currentProducts.length + 6);
      if (newProducts.length > 0) {
        setCurrentProducts(prev => [...prev, ...newProducts]);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCategorySelect = (mainCategory, subCategory) => {
    if (mainCategory) {
      setSelectedCategory(mainCategory);
      if (subCategory) {
        setSelectedSubCategory(subCategory);
      }
    }
  };

  return (
    <>
      <MainBanner>
        <BannerContent>
          <h1>카페 봉봉에 오신 것을 환영합니다</h1>
          <p>
            달콤한 <span className="highlight">바닐라 시나몬 라떼</span>와 함께
            특별한 가을의 순간을 만나보세요
          </p>
          <BannerButton>자세히 보기</BannerButton>
        </BannerContent>
      </MainBanner>
      <ProductsContainer>
        <Sidebar>
          <CategoryList>
            {Object.entries(categories).map(([category]) => (
              <CategoryItem
                key={category}
                active={category === selectedCategory}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="category-content">
                  {React.createElement(categoryIcons[category], { className: 'icon' })}
                  {category}
                </div>
              </CategoryItem>
            ))}
          </CategoryList>
        </Sidebar>

        {/* 모바일용 하위 카테고리 컨테이너 추가 */}
        {selectedCategory !== '전체' && categories[selectedCategory]?.length > 0 && (
          <MobileSubCategoryContainer>
            <MobileSubCategoryTitle>
              {selectedCategory} 카테고리
            </MobileSubCategoryTitle>
            <MobileSubCategoryList>
              {categories[selectedCategory].map(subCategory => (
                <MobileSubCategoryItem
                  key={subCategory}
                  active={subCategory === selectedSubCategory}
                  onClick={() => handleSubCategoryClick(subCategory)}
                >
                  {React.createElement(subCategoryIcons[subCategory], { className: 'icon' })}
                  {subCategory}
                </MobileSubCategoryItem>
              ))}
            </MobileSubCategoryList>
          </MobileSubCategoryContainer>
        )}

        <div>
          <Title>카페 봉봉 상품</Title>
          {currentProducts.length > 0 ? (
            <ProductGrid>
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  ref={isMobile && index === currentProducts.length - 1 ? lastProductRef : null}
                  onClick={(e) => handleCardClick(e, product.id)}
                >
                  <SelectCheckbox
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleProductSelect(product.id);
                    }}
                  />
                  <ProductImageWrapper>
                    <LikeButton 
                      isLiked={likedProducts.includes(product.id)}
                      onClick={(e) => toggleLike(e, product.id)}
                    >
                      <FaHeart />
                    </LikeButton>
                    <ProductImage src={product.image} alt={product.name} />
                  </ProductImageWrapper>
                  <ProductInfo>
                    <ProductName as="span">
                      {product.name}
                    </ProductName>
                    <PriceSection>
                      <Price>{product.originalPrice.toLocaleString()}원</Price>
                    </PriceSection>
                    <ProductStats>
                      <Stat>
                        <FaHeart style={{ color: '#e74c3c' }} /> {product.likes}
                      </Stat>
                      <Stat>
                        <FaComments /> {product.reviews}
                      </Stat>
                    </ProductStats>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductGrid>
          ) : (
            <NoResults>
              <p>해당 카테고리에 상품이 없습니다.</p>
            </NoResults>
          )}

          {isMobile && isLoading && (
            <LoadingIndicator>
              상품을 불러오는 중입니다...
            </LoadingIndicator>
          )}

          {!isMobile && (
            <Pagination>
              <PageButton 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </PageButton>

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                // 현재 페이지 주변의 5개 페이지만 표시
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                ) {
                  return (
                    <PageButton
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      active={currentPage === pageNum}
                    >
                      {pageNum}
                    </PageButton>
                  );
                } else if (
                  pageNum === currentPage - 3 ||
                  pageNum === currentPage + 3
                ) {
                  return <PageInfo key={pageNum}>...</PageInfo>;
                }
                return null;
              })}

              <PageButton 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </PageButton>
            </Pagination>
          )}
        </div>
      </ProductsContainer>

      <BulkOrderBar show={selectedProducts.length > 0}>
        <SelectedInfo>
          <div className="count">
            선택된 상품 <span>{selectedProducts.length}</span>개
          </div>
          <div className="selected-items">
            {selectedProductsData.map(product => (
              <SelectedItemChip key={product.id}>
                {product.name}
                <span 
                  className="remove" 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelectedProduct(product.id);
                  }}
                >
                  ×
                </span>
              </SelectedItemChip>
            ))}
          </div>
        </SelectedInfo>
        <BulkOrderButton onClick={handleBulkOrder}>
          단체 주문하기
        </BulkOrderButton>
      </BulkOrderBar>
      <MobileNavBar 
        categories={categories}
        categoryIcons={categoryIcons}
        subCategoryIcons={subCategoryIcons}
        onCategorySelect={handleCategorySelect}
      />
    </>
  );
}

export default Products; 