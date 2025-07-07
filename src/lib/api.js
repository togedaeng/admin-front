import { API_BASE_URL, STATUS_CODES } from './constants';

/**
 * API 요청을 위한 기본 설정
 */
const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * API 요청을 처리하는 기본 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} options - fetch 옵션
 * @returns {Promise} API 응답
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: defaultHeaders,
    ...options,
  };

  // 인증 토큰이 있다면 헤더에 추가
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * GET 요청
 * @param {string} endpoint - API 엔드포인트
 * @returns {Promise} API 응답
 */
export function apiGet(endpoint) {
  return apiRequest(endpoint, {
    method: 'GET',
  });
}

/**
 * POST 요청
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} data - 전송할 데이터
 * @returns {Promise} API 응답
 */
export function apiPost(endpoint, data) {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT 요청
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} data - 전송할 데이터
 * @returns {Promise} API 응답
 */
export function apiPut(endpoint, data) {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 요청
 * @param {string} endpoint - API 엔드포인트
 * @returns {Promise} API 응답
 */
export function apiDelete(endpoint) {
  return apiRequest(endpoint, {
    method: 'DELETE',
  });
}

// 특정 API 엔드포인트들
export const authAPI = {
  login: (credentials) => apiPost('/auth/login', credentials),
  logout: () => apiPost('/auth/logout'),
  register: (userData) => apiPost('/auth/register', userData),
  getProfile: () => apiGet('/user/me'),
};

export const dashboardAPI = {
  getStats: () => apiGet('/dashboard/stats'),
  getRecentActivity: () => apiGet('/dashboard/activity'),
};

export const usersAPI = {
  getUsers: () => apiGet('/user'),
  getUser: (id) => apiGet(`/users/${id}`),
  createUser: (userData) => apiPost('/users', userData),
  updateUser: (id, userData) => apiPut(`/users/${id}`, userData),
  deleteUser: (id) => apiDelete(`/users/${id}`),
}; 