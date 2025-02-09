import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Container, Header, Title } from '../../components/admin/CommonStyles';

// ... styled components ...

function SettingsManagement() {
  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>환경 설정</Title>
        </Header>
        {/* 환경 설정 내용 */}
      </Container>
    </AdminLayout>
  );
}

export default SettingsManagement; 