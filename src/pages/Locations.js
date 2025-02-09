import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 40px;
  text-align: center;
`;

const LocationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const LocationCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const LocationInfo = styled.div`
  h3 {
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: 15px;
  }

  p {
    color: ${props => props.theme.colors.text.secondary};
    margin: 8px 0;
  }
`;

function Locations() {
  const locations = [
    {
      id: 1,
      name: '카페 봉봉 강남점',
      address: '서울 강남구 테헤란로 123',
      phone: '02-123-4567',
      hours: '매일 07:00 - 22:00'
    },
    {
      id: 2,
      name: '카페 봉봉 홍대점',
      address: '서울 마포구 와우산로 123',
      phone: '02-234-5678',
      hours: '매일 08:00 - 23:00'
    },
    {
      id: 3,
      name: '카페 봉봉 부산점',
      address: '부산 해운대구 해운대해변로 123',
      phone: '051-345-6789',
      hours: '매일 09:00 - 22:00'
    }
  ];

  return (
    <Container>
      <Title>매장 찾기</Title>
      <LocationList>
        {locations.map(location => (
          <LocationCard key={location.id}>
            <LocationInfo>
              <h3>{location.name}</h3>
              <p>주소: {location.address}</p>
              <p>전화: {location.phone}</p>
              <p>영업시간: {location.hours}</p>
            </LocationInfo>
          </LocationCard>
        ))}
      </LocationList>
    </Container>
  );
}

export default Locations; 