import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useCart } from '../context/CafeContext';
import { FaUsers, FaChevronLeft, FaChevronRight, FaInfoCircle, FaMapMarkerAlt, FaExclamationTriangle, FaQuestionCircle, FaShoppingCart, FaStar, FaReply, FaCamera, FaStar as FaStarEmpty, FaStarHalf } from 'react-icons/fa';
import InquiryModal from '../components/InquiryModal';

// fadeIn 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const ProductDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 0 30px;
`;

const ThumbnailSlider = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#e67e22' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 0;' : 'right: 0;'}
  background: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1;

  &:hover {
    background: #f5f5f5;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
  }

  .price {
    font-size: 2rem;
    color: #e74c3c;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .description {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #34495e;
    margin-bottom: 40px;
  }

  .category {
    color: #666;
    margin-bottom: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const CartButton = styled(Button)`
  background: transparent;
  color: #2c3e50;
  border: 1px solid black;

  &:hover {
    background: #f5f5f5;
  }
`;

const BulkOrderButton = styled(Button)`
  background: #e74c3c;
  color: white;
  border: none;

  &:hover {
    background: #c0392b;
  }
`;

const DetailSection = styled.div`
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 40px;
  padding: 0 20px;

  @media (max-width: 768px) {
    justify-content: stretch;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    margin: 0 0 30px 0;
    padding: 0;
  }
`;

const Tab = styled.button`
  padding: 15px 10px;
  background: none;
  border: none;
  font-size: 1.1rem;
  color: ${props => props.active ? props.theme.colors.primary : '#666'};
  font-weight: ${props => props.active ? '600' : 'normal'};
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 15px 10px;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: normal;
    border-bottom: ${props => props.active ? `2px solid ${props.theme.colors.primary}` : 'none'};

    svg {
      font-size: 1rem;
    }
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const DetailContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  img {
    width: 100%;
    margin-bottom: 30px;
    border-radius: 15px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #444;
    margin-bottom: 40px;
    text-align: left;
  }

  .highlight {
    font-size: 1.8rem;
    color: #e67e22;
    font-weight: 700;
    margin: 40px 0;
  }
`;

const OriginTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th, td {
    padding: 15px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background: #f8f9fa;
    width: 200px;
  }
`;

const CautionList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    color: #444;
    line-height: 1.6;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const InquiryBoard = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .write-button {
    padding: 10px 20px;
    background: #e67e22;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #d35400;
    }
  }
`;

const InquiryList = styled.div`
  .inquiry-item {
    padding: 20px;
    border-bottom: 1px solid #eee;

    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-weight: 500;
    }

    .meta {
      font-size: 0.9rem;
      color: #666;
    }
  }
`;

const WriteReviewCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
`;

const ReviewInput = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: ${props => props.isExpanded ? '20px' : '0'};

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #757575;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .input-area {
    flex: 1;
    position: relative;
  }
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  min-height: ${props => props.isExpanded ? '120px' : '48px'};
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.1);
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  color: #95a5a6;
  font-size: 0.9rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #95a5a6;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: rgba(230, 126, 34, 0.1);
  }

  svg {
    font-size: 1.1rem;
  }
`;

const ReplySection = styled.div`
  margin-left: 25px;
  padding-left: 15px;
  border-left: 2px solid #eee;
  margin-top: 15px;
`;

const ReplyForm = styled.form`
  margin-top: 15px;
  animation: ${fadeIn} 0.3s ease-out;

  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    resize: none;
    min-height: 80px;
    margin-bottom: 10px;
    font-size: 0.95rem;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.1);
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  button {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    
    &.cancel {
      background: none;
      border: 1px solid #ddd;
      color: #666;
      
      &:hover {
        background: #f8f9fa;
      }
    }
    
    &.submit {
      background: ${props => props.theme.colors.primary};
      color: white;
      border: none;
      
      &:hover {
        background: #d35400;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

const Reply = styled.div`
  padding: 15px;
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    background: #f8f9fa;
    border-radius: 8px;
  }

  .reply-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }

  .reply-author {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }

  .reply-badge {
    background: #f1c40f;
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.8rem;
  }

  .reply-date {
    font-size: 0.85rem;
    color: #95a5a6;
  }

  .reply-content {
    color: #2c3e50;
    line-height: 1.5;
    font-size: 0.95rem;
  }
`;

const ReviewCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ReviewerInfo = styled.div`
  .name {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 5px;
  }

  .date {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
`;

const Stars = styled.div`
  color: #f1c40f;
  display: flex;
  gap: 2px;
`;

const ReviewContent = styled.div`
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ReviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
`;

const ReviewStats = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 40px;
  display: flex;
  gap: 40px;
`;

const AverageRating = styled.div`
  flex: 1;
  text-align: center;
  padding-right: 40px;
  border-right: 1px solid #eee;

  .rating {
    font-size: 3.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .total-reviews {
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .stars {
    color: #f1c40f;
    font-size: 1.5rem;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    gap: 5px;
  }
`;

const RatingBars = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const RatingBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .star-label {
    width: 60px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #7f8c8d;
  }

  .bar-container {
    flex: 1;
    height: 8px;
    background: #eee;
    border-radius: 4px;
    overflow: hidden;
  }

  .bar {
    height: 100%;
    background: #f1c40f;
    border-radius: 4px;
    width: ${props => props.percentage}%;
  }

  .percentage {
    width: 45px;
    text-align: right;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const MediaButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  border: none;
  background: none;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    color: ${props => props.theme.colors.primary};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const RatingSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    font-size: 1.5rem;
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
    opacity: 0.3;
    transition: all 0.2s ease;

    &.active {
      opacity: 1;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const PostButton = styled.button`
  padding: 8px 20px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #d35400;
  }
`;

const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    .review-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .review-content {
      font-size: 0.9rem;
    }

    .review-meta {
      font-size: 0.8rem;
    }
  }
`;

const Category = styled.div`
  color: #666;
  margin-bottom: 10px;
  text-align: center;
`;

function ReviewComponent({ review }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState(review.replies || []);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        author: '봉봉카페',
        content: replyText,
        date: new Date().toLocaleDateString(),
        isAdmin: true
      };
      setReplies([...replies, newReply]);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  return (
    <ReviewCard>
      <ReviewHeader>
        <ReviewerInfo>
          <div className="name">{review.name}</div>
          <div className="date">{review.date}</div>
        </ReviewerInfo>
        <Stars>
          {[...Array(review.rating)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </Stars>
      </ReviewHeader>
      <ReviewContent>{review.content}</ReviewContent>
      {review.image && <ReviewImage src={review.image} alt="리뷰 이미지" />}
      
      <ReviewActions>
        <ActionButton onClick={() => setShowReplyForm(!showReplyForm)}>
          <FaReply /> 답글달기
        </ActionButton>
      </ReviewActions>

      {(showReplyForm || replies.length > 0) && (
        <ReplySection>
          {replies.map(reply => (
            <Reply key={reply.id}>
              <div className="reply-header">
                <span className="reply-author">{reply.author}</span>
                {reply.isAdmin && <span className="reply-badge">관리자</span>}
                <span className="reply-date">{reply.date}</span>
              </div>
              <div className="reply-content">{reply.content}</div>
            </Reply>
          ))}

          {showReplyForm && (
            <ReplyForm onSubmit={handleSubmitReply}>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="답글을 입력하세요..."
              />
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyText('');
                  }}
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  className="submit"
                  disabled={!replyText.trim()}
                >
                  답글 등록
                </button>
              </div>
            </ReplyForm>
          )}
        </ReplySection>
      )}
    </ReviewCard>
  );
}

function ReviewStatsComponent({ reviews }) {
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews).toFixed(1);
  
  // 각 별점 개수 계산
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  // 각 별점의 퍼센티지 계산
  const ratingPercentages = {};
  for (let i = 5; i >= 1; i--) {
    ratingPercentages[i] = ((ratingCounts[i] || 0) / totalReviews * 100).toFixed(0);
  }

  return (
    <ReviewStats>
      <AverageRating>
        <div className="rating">{averageRating}</div>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} style={{ opacity: i < Math.round(averageRating) ? 1 : 0.3 }} />
          ))}
        </div>
        <div className="total-reviews">전체 {totalReviews}개 리뷰</div>
      </AverageRating>
      <RatingBars>
        {[5, 4, 3, 2, 1].map(rating => (
          <RatingBar key={rating} percentage={ratingPercentages[rating]}>
            <div className="star-label">
              <FaStar /> {rating}
            </div>
            <div className="bar-container">
              <div className="bar" />
            </div>
            <div className="percentage">{ratingPercentages[rating]}%</div>
          </RatingBar>
        ))}
      </RatingBars>
    </ReviewStats>
  );
}

function WriteReview() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // 리뷰 제출 로직
    console.log({ review, rating, image });
    // 초기화
    setReview('');
    setRating(0);
    setImage(null);
    setIsExpanded(false);
  };

  return (
    <WriteReviewCard>
      <ReviewInput isExpanded={isExpanded}>
        <div className="avatar">B</div>
        <div className="input-area">
          <ReviewTextArea
            placeholder="이 상품에 대한 리뷰를 작성해주세요..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            onFocus={handleFocus}
            isExpanded={isExpanded}
          />
          {image && (
            <div style={{ marginTop: '10px' }}>
              <img 
                src={image} 
                alt="업로드 이미지" 
                style={{ 
                  maxWidth: '200px', 
                  borderRadius: '8px',
                  border: '1px solid #eee' 
                }} 
              />
            </div>
          )}
        </div>
      </ReviewInput>

      {isExpanded && (
        <ReviewActions isExpanded={isExpanded}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <MediaButton onClick={() => fileInputRef.current.click()}>
              <FaCamera /> 사진 추가
            </MediaButton>
            <RatingSelect>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStarEmpty
                  key={star}
                  className={star <= rating ? 'active' : ''}
                  onClick={() => setRating(star)}
                />
              ))}
            </RatingSelect>
          </div>
          <PostButton 
            disabled={!review.trim() || rating === 0}
            onClick={handleSubmit}
          >
            리뷰 등록
          </PostButton>
        </ReviewActions>
      )}
    </WriteReviewCard>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('detail');
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3'
  ];

  const product = {
    id: 1,
    name: "봉봉 시그니처 라떼",
    price: 6500,
    description: "특별한 바닐라 시럽과 에스프레소의 완벽한 조화로 만들어진 봉봉카페의 시그니처 메뉴입니다.",
  };

  const handleBulkOrder = () => {
    navigate('/bulk-order', { 
      state: { 
        products: [{
          id: product.id,
          name: product.name,
          price: product.price,
          image: images[0], // 첫 번째 이미지를 사용
          quantity: 1
        }]
      } 
    });
  };

  const scrollThumbnails = (direction) => {
    const slider = document.querySelector('#thumbnail-slider');
    const scrollAmount = direction === 'left' ? -100 : 100;
    slider.scrollLeft += scrollAmount;
  };

  const reviewsData = [
    {
      name: "박지민",
      date: "2024.02.15",
      rating: 5,
      content: "바닐라 시럽의 달콤함이 적절하고 에스프레소와 조화가 너무 좋아요. 라떼아트도 너무 예쁘게 해주셔서 기분 좋게 마셨습니다!",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3",
      replies: [
        {
          id: 1,
          author: '봉봉카페',
          content: '박지민 고객님, 소중한 후기 감사합니다! 앞으로도 맛있는 음료로 보답하겠습니다.',
          date: '2024.02.15'
        }
      ]
    },
    {
      name: "김태형",
      date: "2024.02.14",
      rating: 4,
      content: "매일 아침 출근길에 들러서 마시는데 항상 맛있어요. 다만 가끔 너무 뜨거울 때가 있어요.",
    },
    {
      name: "전정국",
      date: "2024.02.13",
      rating: 5,
      content: "친구 추천으로 마셔봤는데 정말 맛있네요! 특히 우유 거품이 부드럽고 좋아요.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3"
    },
    {
      name: "민윤기",
      date: "2024.02.12",
      rating: 4,
      content: "시그니처 라떼라 기대하고 마셨는데, 기대 이상이었어요. 다음에도 또 구매할 것 같아요.",
    },
    {
      name: "김남준",
      date: "2024.02.11",
      rating: 5,
      content: "바리스타님의 숙련된 실력이 느껴지는 라떼였어요. 크기도 적당하고 가격도 괜찮습니다.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3"
    }
  ];

  const handleBuyNow = () => {
    // 단일 상품 구매 처리
    navigate('/checkout', { 
      state: { 
        products: [{
          id: product.id,
          name: product.name,
          price: product.price || product.originalPrice,
          image: images[0],
          quantity: 1
        }]
      } 
    });
  };

  return (
    <PageContainer>
      <ProductDetailContainer>
        <ImageSection>
          <ProductImage src={images[selectedImage]} alt={product.name} />
          <ThumbnailContainer>
            <SliderButton direction="left" onClick={() => scrollThumbnails('left')}>
              <FaChevronLeft />
            </SliderButton>
            <ThumbnailSlider id="thumbnail-slider">
              {images.map((image, index) => (
                <Thumbnail
                  key={index}
                  src={image}
                  alt={`썸네일 ${index + 1}`}
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ThumbnailSlider>
            <SliderButton direction="right" onClick={() => scrollThumbnails('right')}>
              <FaChevronRight />
            </SliderButton>
          </ThumbnailContainer>
        </ImageSection>

        <ProductInfo>
          <h2>{product.name}</h2>
          <p className="price">{product.price.toLocaleString()}원</p>
          <p className="description">{product.description}</p>
          <Category>
            {product.category}
          </Category>
          <ButtonContainer>
            <BulkOrderButton onClick={handleBulkOrder}>
              단체 주문하기
            </BulkOrderButton>
            <CartButton onClick={() => addToCart(product)}>
              <FaShoppingCart /> 장바구니
            </CartButton>
          </ButtonContainer>
        </ProductInfo>
      </ProductDetailContainer>

      <DetailSection>
        <TabMenu>
          <Tab 
            active={activeTab === 'detail'} 
            onClick={() => setActiveTab('detail')}
          >
            <FaInfoCircle /> 상품 상세 정보
          </Tab>
          <Tab 
            active={activeTab === 'origin'} 
            onClick={() => setActiveTab('origin')}
          >
            <FaMapMarkerAlt /> 원산지 정보
          </Tab>
          <Tab 
            active={activeTab === 'caution'} 
            onClick={() => setActiveTab('caution')}
          >
            <FaExclamationTriangle /> 취급 주의사항
          </Tab>
          <Tab 
            active={activeTab === 'inquiry'} 
            onClick={() => setActiveTab('inquiry')}
          >
            <FaQuestionCircle /> 상품 문의
          </Tab>
          <Tab 
            active={activeTab === 'review'} 
            onClick={() => setActiveTab('review')}
          >
            <FaStar /> 상품 리뷰
          </Tab>
        </TabMenu>

        <TabContent active={activeTab === 'detail'}>
          <DetailContent>
            <p className="highlight">최고급 원두로 추출한 에스프레소</p>
            <img 
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3" 
              alt="원두 이미지" 
            />
            <p>
              브라질, 콜롬비아, 에티오피아의 최상급 원두를 블렌딩하여 
              깊은 풍미와 균형 잡힌 맛을 선사합니다. 
              전문 바리스타의 섬세한 로스팅 과정을 거쳐 
              봉봉카페만의 특별한 맛을 만들어냅니다.
            </p>

            <p className="highlight">부드러운 우유 거품과 완벽한 조화</p>
            <img 
              src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3" 
              alt="라떼아트 이미지" 
            />
            <p>
              신선한 1등급 원유로 만드는 부드러운 우유 거품은 
              에스프레소와 만나 완벽한 발란스를 이룹니다. 
              봉봉카페의 시그니처 라떼아트와 함께 
              특별한 카페 경험을 선사합니다.
            </p>

            <p className="highlight">프리미엄 바닐라 시럽의 달콤함</p>
            <img 
              src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3" 
              alt="시럽 이미지" 
            />
            <p>
              프랑스산 프리미엄 바닐라 시럽을 사용하여 
              자연스러운 달콤함을 더했습니다. 
              인공적이지 않은 깊은 바닐라의 향과 맛이 
              라떼의 풍미를 한층 더 높여줍니다.
            </p>
          </DetailContent>
        </TabContent>

        <TabContent active={activeTab === 'origin'}>
          <OriginTable>
            <tbody>
              <tr>
                <th>원두 원산지</th>
                <td>브라질, 콜롬비아, 에티오피아 블렌드</td>
              </tr>
              <tr>
                <th>우유</th>
                <td>국내산 1등급 원유</td>
              </tr>
              <tr>
                <th>바닐라 시럽</th>
                <td>프랑스산</td>
              </tr>
              <tr>
                <th>휘핑크림</th>
                <td>국내산</td>
              </tr>
              <tr>
                <th>제조장소</th>
                <td>봉봉카페 각 매장</td>
              </tr>
            </tbody>
          </OriginTable>
        </TabContent>

        <TabContent active={activeTab === 'caution'}>
          <CautionList>
            <li>• 제품은 주문 즉시 제조되며, 테이크아웃 시 1시간 이내 섭취를 권장합니다.</li>
            <li>• 알레르기 유발 성분: 우유</li>
            <li>• 매장 상황에 따라 판매가 조기 종료될 수 있습니다.</li>
            <li>• 매장별 판매 가격이 상이할 수 있습니다.</li>
            <li>• 이미지는 연출된 것으로 실제 제품과 다를 수 있습니다.</li>
            <li>• 제품 영양 정보는 매장 내 게시된 정보를 참고해 주시기 바랍니다.</li>
          </CautionList>
        </TabContent>

        <TabContent active={activeTab === 'inquiry'}>
          <InquiryBoard>
            <div className="header">
              <h3>상품 문의</h3>
              <button 
                className="write-button"
                onClick={() => setShowInquiryModal(true)}
              >
                문의하기
              </button>
            </div>
            <InquiryList>
              <div className="inquiry-item">
                <div className="title">
                  <span>디카페인으로 변경 가능한가요?</span>
                  <span>답변완료</span>
                </div>
                <div className="meta">
                  <span>김** | 2024.02.09</span>
                </div>
              </div>
              <div className="inquiry-item">
                <div className="title">
                  <span>시럽 양 조절이 가능한가요?</span>
                  <span>답변완료</span>
                </div>
                <div className="meta">
                  <span>이** | 2024.02.08</span>
                </div>
              </div>
            </InquiryList>
          </InquiryBoard>
        </TabContent>

        <TabContent active={activeTab === 'review'}>
          <ReviewContainer>
            <ReviewStatsComponent reviews={reviewsData} />
            <WriteReview />
            {reviewsData.map((review, index) => (
              <ReviewComponent key={index} review={review} />
            ))}
          </ReviewContainer>
        </TabContent>
      </DetailSection>

      {showInquiryModal && (
        <InquiryModal 
          onClose={() => setShowInquiryModal(false)}
          productName={product.name}
        />
      )}
    </PageContainer>
  );
}

export default ProductDetail; 