import { 
  FaShoppingBag, 
  FaCoffee,
  FaMugHot,
  FaGlassWhiskey,
  FaBirthdayCake,
  FaBreadSlice,
  FaCookie,
  FaBlender
} from 'react-icons/fa';

export const categories = [
  {
    name: '전체',
    subCategories: []
  },
  {
    name: '커피',
    subCategories: ['아메리카노', '에스프레소', '콜드브루']
  },
  {
    name: '라떼',
    subCategories: ['카페라떼', '바닐라라떼', '카라멜라떼']
  },
  {
    name: '에이드/주스',
    subCategories: ['레몬에이드', '자몽에이드', '오렌지주스']
  },
  {
    name: '스무디',
    subCategories: ['딸기스무디', '망고스무디', '요거트스무디']
  },
  {
    name: '디저트',
    subCategories: ['케이크', '쿠키', '크로플']
  },
  {
    name: '브런치',
    subCategories: ['샌드위치', '토스트', '베이글']
  },
  {
    name: '굿즈',
    subCategories: ['텀블러', '머그컵', '에코백']
  }
];

export const categoryIcons = {
  '전체': FaCoffee,
  '커피': FaCoffee,
  '라떼': FaMugHot,
  '에이드/주스': FaGlassWhiskey,
  '스무디': FaBlender,
  '디저트': FaBirthdayCake,
  '브런치': FaBreadSlice,
  '굿즈': FaShoppingBag
};

export const subCategoryIcons = {
  '아메리카노': FaCoffee,
  '에스프레소': FaCoffee,
  '콜드브루': FaCoffee,
  '카페라떼': FaMugHot,
  '바닐라라떼': FaMugHot,
  '카라멜라떼': FaMugHot,
  '레몬에이드': FaGlassWhiskey,
  '자몽에이드': FaGlassWhiskey,
  '오렌지주스': FaGlassWhiskey,
  '딸기스무디': FaBlender,
  '망고스무디': FaBlender,
  '요거트스무디': FaBlender,
  '케이크': FaBirthdayCake,
  '쿠키': FaCookie,
  '크로플': FaBreadSlice,
  '샌드위치': FaBreadSlice,
  '토스트': FaBreadSlice,
  '베이글': FaBreadSlice,
  '텀블러': FaMugHot,
  '머그컵': FaMugHot,
  '에코백': FaShoppingBag
}; 