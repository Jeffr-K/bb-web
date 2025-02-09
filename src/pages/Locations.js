import React from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { FaMapMarkerAlt, FaPhone, FaClock, FaParking, FaEnvelope } from 'react-icons/fa';

const LocationsContainer = styled.div`
  // margin-top: -60px; 제거
`;

const Container = styled.div`
  // padding-top: 80px; 제거 (필요없음)
`;

const MapSection = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 60px;
`;

const BusinessInfo = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;

const InfoTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 40px;
  text-align: center;
`;

const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  margin-bottom: 60px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 20px;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    font-size: 1.1rem;
    color: #666;

    .icon {
      color: #e67e22;
      font-size: 1.2rem;
    }
  }

  .position {
    color: #e67e22;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const InfoCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);

  h3 {
    font-size: 1.3rem;
    color: #2c3e50;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  .icon {
    color: #e67e22;
  }
`;

const MainBanner = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3') center/cover;
  background-position: center 25%;
  padding: 120px 20px 80px;
  text-align: center;
  color: white;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    position: relative;
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: 700;
  }

  p {
    position: relative;
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const locations = [
  {
    name: "봉봉카페 송학점",
    lat: 37.4734074,
    lng: 126.6221438,
    address: "인천광역시 중구 송학동3가 7-30번지 1층",
    subway: "1호선 인천역 3번 출구에서 도보 7분"
  },
  {
    name: "봉봉카페 홍대점",
    lat: 37.557527,
    lng: 126.924191,
    address: "서울특별시 마포구 홍대로 456",
    subway: "2호선 홍대입구역 8번 출구에서 도보 3분"
  }
];

function Locations() {
  return (
    <LocationsContainer>
      <Container>
        <MainBanner>
          <h2>봉봉카페와 함께하세요</h2>
          <p>
            최고의 원두와 함께 특별한 순간을 만들어가는 봉봉카페입니다.
            언제나 편안하고 즐거운 시간을 보내실 수 있도록 최선을 다하겠습니다.
          </p>
        </MainBanner>

        <BusinessInfo>
          <InfoTitle>사업자 소개</InfoTitle>
          <ProfileSection>
            <ProfileImage>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3" 
                alt="김봉봉 대표" 
              />
            </ProfileImage>
            <ProfileInfo>
              <h3>김봉봉</h3>
              <p className="position">봉봉카페 대표</p>
              <div className="info-item">
                <FaPhone className="icon" />
                010-1234-5678
              </div>
              <div className="info-item">
                <FaMapMarkerAlt className="icon" />
                서울특별시 강남구 테헤란로 123
              </div>
              <div className="info-item">
                <FaPhone className="icon" />
                02-123-4567
              </div>
              <div className="info-item">
                <FaEnvelope className="icon" />
                bongbong@bongbong.cafe
              </div>
            </ProfileInfo>
          </ProfileSection>

          <InfoTitle>매장 정보</InfoTitle>
          <InfoGrid>
            <InfoCard>
              <h3><FaClock className="icon" /> 영업시간</h3>
              <p>평일: 07:00 - 22:00</p>
              <p>주말: 09:00 - 22:00</p>
              <p>공휴일: 09:00 - 21:00</p>
            </InfoCard>
            <InfoCard>
              <h3><FaPhone className="icon" /> 연락처</h3>
              <p>전화: 02-123-4567</p>
              <p>이메일: info@bongbong.cafe</p>
            </InfoCard>
            <InfoCard>
              <h3><FaParking className="icon" /> 편의시설</h3>
              <p>주차: 건물 내 2시간 무료</p>
              <p>와이파이: 무료 제공</p>
              <p>콘센트: 자리마다 구비</p>
            </InfoCard>
          </InfoGrid>
        </BusinessInfo>

        <BusinessInfo>
          <InfoTitle>오시는 길</InfoTitle>
          <MapSection>
            <Map
              center={{ lat: 37.4734074, lng: 126.6221438 }}
              style={{ width: "100%", height: "100%" }}
              level={8}
            >
              {locations.map((loc, index) => (
                <MapMarker
                  key={index}
                  position={{ lat: loc.lat, lng: loc.lng }}
                  title={loc.name}
                />
              ))}
            </Map>
          </MapSection>
          <InfoGrid style={{ marginTop: '30px' }}>
            <InfoCard>
              <h3><FaMapMarkerAlt className="icon" /> 송학점</h3>
              <p>{locations[0].address}</p>
              <p>{locations[0].subway}</p>
            </InfoCard>
            <InfoCard>
              <h3><FaMapMarkerAlt className="icon" /> 홍대점</h3>
              <p>{locations[1].address}</p>
              <p>{locations[1].subway}</p>
            </InfoCard>
          </InfoGrid>
        </BusinessInfo>
      </Container>
    </LocationsContainer>
  );
}

export default Locations; 