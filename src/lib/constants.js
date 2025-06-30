// API 관련 상수
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// 애플리케이션 설정
export const APP_CONFIG = {
  name: 'Admin Dashboard',
  version: '1.0.0',
  description: '관리자 대시보드',
};

// 네비게이션 메뉴 구성
export const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: 'ti-layout-dashboard',
  },
  {
    id: 'users',
    label: '사용자 관리',
    href: '/users',
    icon: 'ti-users',
  },
  {
    id: 'products',
    label: '상품 관리',
    href: '/products',
    icon: 'ti-package',
  },
  {
    id: 'orders',
    label: '주문 관리',
    href: '/orders',
    icon: 'ti-shopping-cart',
  },
  {
    id: 'settings',
    label: '설정',
    href: '/settings',
    icon: 'ti-settings',
  },
];

// 사용자 역할
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

// 상태 코드
export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
}; 