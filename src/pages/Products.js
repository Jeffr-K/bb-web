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
import { categories, categoryIcons, subCategoryIcons } from '../data/categories';
import { products } from '../data/products';

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

const CategoryList = styled.div`
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

const CategoryItem = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.active ? props.theme.colors.primary : '#2c3e50'};
  background: ${props => props.active ? '#fff3e0' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background: #fff3e0;
    color: ${props => props.theme.colors.primary};
  }

  .category-name {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const SubCategoryList = styled.div`
  display: ${props => props.isVisible ? 'block' : 'none'};  // 조건부 표시
  padding-left: 20px;
  background: #f8f9fa;
`;

const SubCategoryItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  color: ${props => props.active ? props.theme.colors.primary : '#666'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: #fff3e0;
  }

  svg {
    font-size: 1.1rem;
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

function Products() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
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
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
    setSelectedCategory(category);
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
            {categories.map(category => (
              <div key={category.name}>
                <CategoryItem
                  active={selectedCategory === category.name}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="category-name">
                    {categoryIcons[category.name]}
                    {category.name}
                  </div>
                  {category.subCategories && category.subCategories.length > 0 && (
                    <FaChevronDown
                      style={{
                        transform: expandedCategory === category.name ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  )}
                </CategoryItem>
                {category.subCategories && category.subCategories.length > 0 && (
                  <SubCategoryList isVisible={expandedCategory === category.name}>
                    {category.subCategories.map(subCategory => (
                      <SubCategoryItem
                        key={subCategory}
                        active={selectedCategory === subCategory}
                        onClick={() => setSelectedCategory(subCategory)}
                      >
                        {subCategoryIcons[subCategory]}
                        {subCategory}
                      </SubCategoryItem>
                    ))}
                  </SubCategoryList>
                )}
              </div>
            ))}
          </CategoryList>
        </Sidebar>

        {/* 모바일용 하위 카테고리는 isMobile일 때만 표시 */}
        {isMobile && selectedCategory !== '전체' && selectedCategory && categories.find(cat => cat.name === selectedCategory)?.subCategories?.length > 0 && (
          <MobileSubCategoryContainer>
            <MobileSubCategoryTitle>
              {selectedCategory} 카테고리
            </MobileSubCategoryTitle>
            <MobileSubCategoryList>
              {categories.find(cat => cat.name === selectedCategory)?.subCategories.map(subCategory => (
                <MobileSubCategoryItem
                  key={subCategory}
                  active={subCategory === selectedSubCategory}
                  onClick={() => handleSubCategoryClick(subCategory)}
                >
                  {subCategoryIcons[subCategory]}
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