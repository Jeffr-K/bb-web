import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BulkOrderRequest from './pages/BulkOrderRequest';
import BulkOrderManagement from './pages/admin/BulkOrderManagement';
import AdminLogin from './pages/admin/AdminLogin';
import PrivateRoute from './components/PrivateRoute';
import styled from 'styled-components';
import Locations from './pages/Locations';
import Footer from './components/Footer';
import GlobalStyle from './styles/GlobalStyle';
import MobileNavBar from './components/MobileNavBar';
import { useMediaQuery } from 'react-responsive';
import { categories, categoryIcons, subCategoryIcons } from './data/categories';

const PageContainer = styled.div`
  padding-top: ${props => props.noTopPadding ? '0' : '60px'};
  position: relative;
  z-index: 1;
`;

const Nav = styled.nav`
  background: #2c3e50;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background-color 0.3s ease;

  &:hover {
    background: #2c3e50;
  }
`;

function AppContent() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();

  const handleCategorySelect = (mainCategory, subCategory) => {
    navigate('/products', { 
      state: { 
        selectedCategory: mainCategory,
        selectedSubCategory: subCategory 
      }
    });
  };

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <PageContainer noTopPadding={window.location.pathname === '/locations'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bulk-order/:id" element={<BulkOrderRequest />} />
          <Route path="/bulk-order" element={<BulkOrderRequest />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/bulk-orders" 
            element={
              <PrivateRoute>
                <BulkOrderManagement />
              </PrivateRoute>
            } 
          />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </PageContainer>
      {!isMobile && <Footer />}
      <MobileNavBar 
        categories={categories}
        categoryIcons={categoryIcons}
        subCategoryIcons={subCategoryIcons}
        onCategorySelect={handleCategorySelect}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
