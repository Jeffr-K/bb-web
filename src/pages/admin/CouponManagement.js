import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Container, Header, Title } from '../../components/admin/CommonStyles';

// ... styled components ...

function CouponManagement() {
  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>쿠폰 관리</Title>
        </Header>
        {/* 쿠폰 관리 내용 */}
      </Container>
    </AdminLayout>
  );
}

export default CouponManagement; 