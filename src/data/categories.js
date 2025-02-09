import { 
  FaShoppingBag, 
  FaCoffee,
  FaMugHot,
  FaGlassWhiskey,
  FaWineGlass,
  FaCocktail,
  FaIceCream,
  FaBirthdayCake,
  FaHamburger,
  FaLeaf,
  FaCookie,
  FaBreadSlice,
  FaGift,
  FaTshirt,
  FaCoffee as FaDrip,
  FaMugHot as FaLatte
} from 'react-icons/fa';

export const categories = {
  전체: [],
  커피: [
    '아메리카노',
    '에스프레소',
    '콜드브루',
    '드립커피'
  ],
  라떼: [
    '카페라떼',
    '바닐라라떼',
    '카라멜라떼',
    '헤이즐넛라떼',
    '티라떼'
  ],
  스무디: [
    '과일스무디',
    '요거트스무디',
    '커피스무디',
    '프라페'
  ],
  에이드: [
    '레몬에이드',
    '자몽에이드',
    '청포도에이드',
    '패션후르츠에이드'
  ],
  디저트: [
    '케이크',
    '마카롱',
    '쿠키',
    '브라우니',
    '크로플',
    '스콘'
  ],
  브런치: [
    '샌드위치',
    '토스트',
    '베이글',
    '에그베네딕트',
    '오믈렛'
  ],
  굿즈: [
    '텀블러',
    '머그컵',
    '에코백',
    '파우치',
    '스티커'
  ],
  샌드위치: [
    '에그모닝 샌드위치',
    '크래미모닝 샌드위치',
    '베이컨햄치즈 샌드위치',
    '핫붉닭 샌드위치',
    '치킨데리야끼 샌드위치',
    '그랜베리치킨 샌드위치',
    '치킨텐더 샌드위치',
    '왕새우튀김 샌드위치',
    '소불고기 샌드위치',
    '떡갈비 샌드위치',
    '해쉬베이컨 샌드위치',
    '몬테크리스토 샌드위치'
  ]
};

export const categoryIcons = {
  전체: FaShoppingBag,
  커피: FaCoffee,
  라떼: FaMugHot,
  스무디: FaIceCream,
  에이드: FaCocktail,
  디저트: FaBirthdayCake,
  브런치: FaHamburger,
  굿즈: FaGift,
  샌드위치: FaHamburger
};

export const subCategoryIcons = {
  // 커피 하위 카테고리
  '아메리카노': FaCoffee,
  '에스프레소': FaMugHot,
  '콜드브루': FaGlassWhiskey,
  '드립커피': FaDrip,
  
  // 라떼 하위 카테고리
  '카페라떼': FaLatte,
  '바닐라라떼': FaLatte,
  '카라멜라떼': FaLatte,
  '헤이즐넛라떼': FaLatte,
  '티라떼': FaLeaf,
  
  // 스무디 하위 카테고리
  '과일스무디': FaWineGlass,
  '요거트스무디': FaWineGlass,
  '커피스무디': FaGlassWhiskey,
  '프라페': FaIceCream,
  
  // 에이드 하위 카테고리
  '레몬에이드': FaCocktail,
  '자몽에이드': FaCocktail,
  '청포도에이드': FaCocktail,
  '패션후르츠에이드': FaCocktail,
  
  // 디저트 하위 카테고리
  '케이크': FaBirthdayCake,
  '마카롱': FaCookie,
  '쿠키': FaCookie,
  '브라우니': FaCookie,
  '크로플': FaBreadSlice,
  '스콘': FaBreadSlice,
  
  // 브런치 하위 카테고리
  '샌드위치': FaHamburger,
  '토스트': FaBreadSlice,
  '베이글': FaBreadSlice,
  '에그베네딕트': FaHamburger,
  '오믈렛': FaHamburger,
  
  // 굿즈 하위 카테고리
  '텀블러': FaMugHot,
  '머그컵': FaMugHot,
  '에코백': FaTshirt,
  '파우치': FaShoppingBag,
  '스티커': FaGift,
  
  // 샌드위치 하위 카테고리
  '에그모닝 샌드위치': FaHamburger,
  '크래미모닝 샌드위치': FaHamburger,
  '베이컨햄치즈 샌드위치': FaHamburger,
  '핫붉닭 샌드위치': FaHamburger,
  '치킨데리야끼 샌드위치': FaHamburger,
  '그랜베리치킨 샌드위치': FaHamburger,
  '치킨텐더 샌드위치': FaHamburger,
  '왕새우튀김 샌드위치': FaHamburger,
  '소불고기 샌드위치': FaHamburger,
  '떡갈비 샌드위치': FaHamburger,
  '해쉬베이컨 샌드위치': FaHamburger,
  '몬테크리스토 샌드위치': FaHamburger
}; 