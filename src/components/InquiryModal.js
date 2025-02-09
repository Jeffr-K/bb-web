import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  position: absolute;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  cursor: move;
  transform: ${props => `translate(${props.position.x}px, ${props.position.y}px)`};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 30px 50px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    padding: 25px;
    max-height: 85vh;
  }
`;

const DragHandle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 20px 20px 0 0;
  font-size: 0.8rem;
  color: #666;
  user-select: none;

  &:hover {
    background: #f1f2f6;
  }

  &::before {
    content: '⋮⋮';
    letter-spacing: 2px;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 20px -30px 0 0;
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
    color: #e74c3c;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 10px 0 30px;
  text-align: center;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 85%;
  max-width: 400px;
  padding-right: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  color: #34495e;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid ${props => props.disabled ? '#e9ecef' : '#ddd'};
  border-radius: 10px;
  font-size: 1rem;
  background: ${props => props.disabled ? '#f8f9fa' : 'white'};
  color: ${props => props.disabled ? '#6c757d' : '#2c3e50'};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e67e22;
    box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e67e22;
    box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SubmitButton = styled(Button)`
  background: #e67e22;
  color: white;

  &:hover {
    background: #d35400;
    box-shadow: 0 5px 15px rgba(230, 126, 34, 0.3);
  }
`;

const CancelButton = styled(Button)`
  background: #f1f2f6;
  color: #2c3e50;

  &:hover {
    background: #dfe4ea;
  }
`;

function InquiryModal({ onClose, productName }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    email: '',
    phone: ''
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  useEffect(() => {
    // 모달을 화면 중앙에 위치시키기
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: Math.min((window.innerHeight - rect.height) / 2, window.innerHeight - rect.height) // 초기 위치도 제한
      });
    }
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // 상단과 하단 경계 체크
      const modalRect = modalRef.current.getBoundingClientRect();
      const maxY = window.innerHeight - modalRect.height;
      
      setPosition({
        x: newX,
        y: Math.min(Math.max(0, newY), maxY) // y축 이동 제한
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 문의 제출 로직 추가
    console.log('문의 내용:', formData);
    alert('문의가 등록되었습니다.');
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        ref={modalRef}
        position={position}
        onClick={e => e.stopPropagation()}
        onMouseDown={handleMouseDown}
      >
        <DragHandle className="drag-handle" />
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <Title>상품 문의하기</Title>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>상품명</Label>
              <Input type="text" value={productName} disabled />
            </FormGroup>
            <FormGroup>
              <Label>문의 제목</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="문의 제목을 입력해주세요"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>문의 내용</Label>
              <TextArea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="문의하실 내용을 자세히 적어주세요"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>이메일</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="답변 받으실 이메일을 입력해주세요"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>연락처</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="연락처를 입력해주세요"
                required
              />
            </FormGroup>
            <ButtonGroup>
              <CancelButton type="button" onClick={onClose}>
                닫기
              </CancelButton>
              <SubmitButton type="submit">
                문의하기
              </SubmitButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}

export default InquiryModal; 