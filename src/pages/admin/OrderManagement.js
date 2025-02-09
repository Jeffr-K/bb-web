import React, { useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
`;

function OrderManagement() {
  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>일반 주문 관리</Title>
        </Header>
        {/* 주문 관리 내용 */}
      </Container>
    </AdminLayout>
  );
}

export default OrderManagement; 