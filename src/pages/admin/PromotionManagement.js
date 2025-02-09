import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Container, Header, Title } from '../../components/admin/CommonStyles';

// ... styled components ...

function PromotionManagement() {
  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>프로모션 관리</Title>
        </Header>
        {/* 프로모션 관리 내용 */}
      </Container>
    </AdminLayout>
  );
}

export default PromotionManagement; 