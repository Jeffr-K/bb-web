import React, { useState } from 'react';
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

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
  gap: 30px;
  padding: 0 40px 40px 40px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px 40px 20px;
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
    padding: 15px;
    margin: 0 -20px;
    border-radius: 0;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: flex;
    gap: 10px;
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
  padding-left: 20px;
  margin: 5px 0;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const SubCategoryItem = styled(CategoryItem)`
  padding: 8px 15px;
  font-size: 0.9rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
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

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled(Link)`
  font-size: 1.1rem;
  color: #2c3e50;
  text-decoration: none;
  font-weight: 600;
  display: block;
  margin-bottom: 10px;

  &:hover {
    color: #e67e22;
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const OriginalPrice = styled.span`
  color: #999;
  text-decoration: line-through;
  font-size: 0.9rem;
`;

const DiscountPrice = styled.span`
  color: #e74c3c;
  font-weight: 600;
  font-size: 1.2rem;
`;

const ProductStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
      font-size: 1.8rem;
      margin-bottom: 10px;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 15px;
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
  align-items: center;
  margin-top: 40px;
  gap: 10px;

  @media (max-width: 768px) {
    margin-top: 30px;
    gap: 5px;
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
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 15px 20px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(${props => props.show ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
    gap: 10px;
  }
`;

const SelectedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 10px;

    .selected-items {
      width: 100%;
      max-width: none;
    }
  }
`;

const SelectedItemChip = styled.div`
  background: #f5f5f5;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;

  .remove {
    cursor: pointer;
    color: #666;
    &:hover {
      color: #e74c3c;
    }
  }
`;

const BulkOrderButton = styled.button`
  background: #e67e22;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #d35400;
    transform: translateY(-2px);
  }
`;

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [openCategories, setOpenCategories] = useState(['전체']);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 한 페이지당 상품 수

  const categories = {
    전체: ['모든 상품'],
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
      '샌드위치',
      '토스트',
      '베이글',
      '에그베네딕트',
      '오믈렛'
    ],
    굿즈: [
      '텀블러',
      '머그컵',
      '에코백',
      '파우치',
      '스티커'
    ],
    샌드위치: [
      '에그모닝 샌드위치',
      '크래미모닝 샌드위치',
      '베이컨햄치즈 샌드위치',
      '핫붉닭 샌드위치',
      '치킨데리야끼 샌드위치',
      '그랜베리치킨 샌드위치',
      '치킨텐더 샌드위치',
      '왕새우튀김 샌드위치',
      '소불고기 샌드위치',
      '떡갈비 샌드위치',
      '해쉬베이컨 샌드위치',
      '몬테크리스토 샌드위치'
    ]
  };

  const products = [
    {
      id: 1,
      name: '봉봉 시그니처 라떼',
      originalPrice: 7000,
      discountPrice: 6500,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3',
      reviews: 128,
      likes: 342,
      category: '라떼'
    },
    {
      id: 2,
      name: '아메리카노',
      originalPrice: 4500,
      discountPrice: 4000,
      image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3',
      reviews: 256,
      likes: 421,
      category: '커피'
    },
    {
      id: 3,
      name: '카페모카',
      originalPrice: 6000,
      discountPrice: 5500,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3',
      reviews: 89,
      likes: 156,
      category: '커피'
    },
    {
      id: 4,
      name: '딸기 스무디',
      originalPrice: 6500,
      discountPrice: 6000,
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3',
      reviews: 67,
      likes: 98,
      category: '스무디'
    },
    {
      id: 5,
      name: '망고 스무디',
      originalPrice: 6500,
      discountPrice: 6000,
      image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixlib=rb-4.0.3',
      reviews: 45,
      likes: 87,
      category: '스무디'
    },
    {
      id: 6,
      name: '레몬 에이드',
      originalPrice: 5500,
      discountPrice: 5000,
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3',
      reviews: 78,
      likes: 134,
      category: '에이드'
    },
    {
      id: 7,
      name: '청포도 에이드',
      originalPrice: 5500,
      discountPrice: 5000,
      image: 'https://images.unsplash.com/photo-1567861911437-538298e4232c?ixlib=rb-4.0.3',
      reviews: 92,
      likes: 167,
      category: '에이드'
    },
    {
      id: 8,
      name: '티라미수',
      originalPrice: 7000,
      discountPrice: 6500,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3',
      reviews: 156,
      likes: 289,
      category: '디저트'
    },
    {
      id: 9,
      name: '초코 브라우니',
      originalPrice: 5500,
      discountPrice: 5000,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3',
      reviews: 112,
      likes: 245,
      category: '디저트'
    },
    {
      id: 10,
      name: '아보카도 토스트',
      originalPrice: 8500,
      discountPrice: 8000,
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3',
      reviews: 67,
      likes: 143,
      category: '브런치'
    },
    {
      id: 11,
      name: '에그 베네딕트',
      originalPrice: 12000,
      discountPrice: 11000,
      image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3',
      reviews: 89,
      likes: 178,
      category: '브런치'
    },
    {
      id: 12,
      name: '봉봉 텀블러',
      originalPrice: 28000,
      discountPrice: 25000,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3',
      reviews: 45,
      likes: 98,
      category: '굿즈'
    },
    {
      id: 13,
      name: '바닐라 라떼',
      originalPrice: 6000,
      discountPrice: 5500,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3',
      reviews: 156,
      likes: 267,
      category: '라떼'
    },
    {
      id: 14,
      name: '카라멜 마끼아또',
      originalPrice: 6000,
      discountPrice: 5500,
      image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?ixlib=rb-4.0.3',
      reviews: 134,
      likes: 245,
      category: '라떼'
    },
    {
      id: 15,
      name: '콜드브루',
      originalPrice: 5500,
      discountPrice: 5000,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3',
      reviews: 198,
      likes: 312,
      category: '커피'
    },
    {
      id: 16,
      name: '봉봉 에코백',
      originalPrice: 18000,
      discountPrice: 15000,
      image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?ixlib=rb-4.0.3',
      reviews: 34,
      likes: 76,
      category: '굿즈'
    },
    {
      id: 17,
      name: '블루베리 치즈케이크',
      originalPrice: 6500,
      discountPrice: 6000,
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3',
      reviews: 178,
      likes: 289,
      category: '디저트'
    },
    {
      id: 18,
      name: '크로플',
      originalPrice: 5000,
      discountPrice: 4500,
      image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-4.0.3',
      reviews: 145,
      likes: 234,
      category: '디저트'
    }
  ];

  const categoryIcons = {
    전체: FaShoppingBag,
    커피: FaCoffee,
    라떼: FaMugHot,
    스무디: FaIceCream,
    에이드: FaCocktail,
    디저트: FaBirthdayCake,
    브런치: FaHamburger,
    굿즈: FaGift,
    샌드위치: FaHamburger
  };

  const subCategoryIcons = {
    // 커피 하위 카테고리
    '아메리카노': FaCoffee,
    '에스프레소': FaMugHot,
    '콜드브루': FaGlassWhiskey,
    '드립커피': FaDrip,
    
    // 라떼 하위 카테고리
    '카페라떼': FaLatte,
    '바닐라라떼': FaLatte,
    '카라멜라떼': FaLatte,
    '헤이즐넛라떼': FaLatte,
    '티라떼': FaLeaf,
    
    // 스무디 하위 카테고리
    '과일스무디': FaWineGlass,
    '요거트스무디': FaWineGlass,
    '커피스무디': FaGlassWhiskey,
    '프라페': FaIceCream,
    
    // 에이드 하위 카테고리
    '레몬에이드': FaCocktail,
    '자몽에이드': FaCocktail,
    '청포도에이드': FaCocktail,
    '패션후르츠에이드': FaCocktail,
    
    // 디저트 하위 카테고리
    '케이크': FaBirthdayCake,
    '마카롱': FaCookie,
    '쿠키': FaCookie,
    '브라우니': FaCookie,
    '크로플': FaBreadSlice,
    '스콘': FaBreadSlice,
    
    // 브런치 하위 카테고리
    '샌드위치': FaHamburger,
    '토스트': FaBreadSlice,
    '베이글': FaBreadSlice,
    '에그베네딕트': FaHamburger,
    '오믈렛': FaHamburger,
    
    // 굿즈 하위 카테고리
    '텀블러': FaMugHot,
    '머그컵': FaMugHot,
    '에코백': FaTshirt,
    '파우치': FaShoppingBag,
    '스티커': FaGift,
    '모든 상품': FaShoppingBag,
    
    // 샌드위치 하위 카테고리
    '에그모닝 샌드위치': FaHamburger,
    '크래미모닝 샌드위치': FaHamburger,
    '베이컨햄치즈 샌드위치': FaHamburger,
    '핫붉닭 샌드위치': FaHamburger,
    '치킨데리야끼 샌드위치': FaHamburger,
    '그랜베리치킨 샌드위치': FaHamburger,
    '치킨텐더 샌드위치': FaHamburger,
    '왕새우튀김 샌드위치': FaHamburger,
    '소불고기 샌드위치': FaHamburger,
    '떡갈비 샌드위치': FaHamburger,
    '해쉬베이컨 샌드위치': FaHamburger,
    '몬테크리스토 샌드위치': FaHamburger
  };

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

  // 현재 페이지의 상품들 계산
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(products.length / productsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // 페이지 상단으로 스크롤
  };

  const selectedProductsData = products.filter(product => 
    selectedProducts.includes(product.id)
  );

  const handleBulkOrder = () => {
    navigate('/bulk-order', { 
      state: { 
        products: selectedProductsData.map(product => ({
          id: product.id,
          name: product.name,
          price: product.discountPrice,
          image: product.image,
          quantity: 1  // 기본 수량 1로 설정
        }))
      } 
    });
  };

  const removeSelectedProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  return (
    <>
      <MainBanner>
        <BannerContent>
          <h1>봉봉카페 신메뉴 출시</h1>
          <p>
            달콤한 <span className="highlight">바닐라 시나몬 라떼</span>와 함께<br />
            특별한 가을의 순간을 만나보세요
          </p>
          <BannerButton>자세히 보기</BannerButton>
        </BannerContent>
      </MainBanner>
      <ProductsContainer>
        <Sidebar>
          <CategoryList>
            {Object.entries(categories).map(([category, subCategories]) => (
              <React.Fragment key={category}>
                <CategoryItem
                  active={category === selectedCategory}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="category-content">
                    {React.createElement(categoryIcons[category], { className: 'icon' })}
                    {category}
                  </div>
                  {category !== '전체' && (
                    openCategories.includes(category) ? 
                      <FaChevronDown /> : 
                      <FaChevronRight />
                  )}
                </CategoryItem>
                <SubCategoryList isOpen={openCategories.includes(category)}>
                  {subCategories.map(subCategory => (
                    <SubCategoryItem
                      key={subCategory}
                      active={subCategory === selectedSubCategory}
                      onClick={() => handleSubCategoryClick(subCategory)}
                    >
                      <div className="category-content">
                        {React.createElement(subCategoryIcons[subCategory], { className: 'icon' })}
                        {subCategory}
                      </div>
                    </SubCategoryItem>
                  ))}
                </SubCategoryList>
              </React.Fragment>
            ))}
          </CategoryList>
        </Sidebar>

        <div>
          <ProductGrid>
            {currentProducts.map(product => (
              <ProductCard 
                key={product.id}
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
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <ProductName as="span">
                    {product.name}
                  </ProductName>
                  <PriceSection>
                    <OriginalPrice>{product.originalPrice.toLocaleString()}원</OriginalPrice>
                    <DiscountPrice>{product.discountPrice.toLocaleString()}원</DiscountPrice>
                  </PriceSection>
                  <ProductStats>
                    <Stat>
                      <FaComments /> {product.reviews}
                    </Stat>
                    <Stat>
                      <FaHeart style={{ color: '#e74c3c' }} /> {product.likes}
                    </Stat>
                  </ProductStats>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>

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
    </>
  );
}

export default Products; 