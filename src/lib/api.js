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

  // FormData인 경우 Content-Type을 자동으로 설정하도록 헤더 제거
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  // 인증 토큰이 있다면 헤더에 추가
  const token = localStorage.getItem('auth_token');
  console.log('인증 토큰 확인:', token);
  console.log('현재 요청 URL:', url);
  console.log('요청 헤더:', config.headers);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('인증 토큰이 없습니다. 백엔드에서 인증을 요구할 수 있습니다.');
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 응답이 JSON이 아닐 수 있으므로 확인
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      return response;
    }
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

export const dogsAPI = {
  getAllDogs: () => apiGet('/api/dog'),
  getDog: (id) => apiGet(`/api/dog/${id}`),
  createDog: (dogData) => apiPost('/api/dog', dogData),
  updateDog: (id, dogData) => apiPut(`/api/dog/${id}`, dogData),
  deleteDog: (id) => apiDelete(`/api/dog/${id}`),
};

export const customRequestAPI = {
  getAllCustomRequests: () => apiGet('/api/custom'),
  getCustomRequest: (id) => apiGet(`/api/custom/${id}`),
  createCustomRequest: (requestData) => apiPost('/api/custom', requestData),
  updateCustomRequest: (id, requestData) => apiPut(`/api/custom/${id}`, requestData),
  deleteCustomRequest: (id) => apiDelete(`/api/custom/${id}`),

  // 상태 변경 API들
  updateStatusToInProgress: (id, adminId) => apiPut(`/api/custom/${id}/in-progress`, { adminId }),
  updateStatusToHold: (id, adminId, reason) => apiPut(`/api/customs/${id}/hold`, { adminId, reason }),
  updateStatusToCompleted: (id, adminId, imageFile) => {
    const formData = new FormData();
    formData.append('adminId', adminId.toString());
    if (imageFile) {
      formData.append('renderedImage', imageFile);
    }

    console.log('FormData 내용 확인:');
    for (let [key, value] of formData.entries()) {
      console.log(key, ':', value);
    }

    return apiRequest(`/api/custom/${id}/completed`, {
      method: 'PUT',
      body: formData,
    });
  },
  updateStatusToCanceled: (id, adminId) => apiPut(`/api/custom/${id}/canceled`, { adminId }),

  // 인증 없이 테스트용 API들
  testUpdateStatusToInProgress: (id, adminId) => {
    const url = `${API_BASE_URL}/api/custom/${id}/in-progress`;
    console.log('테스트 API 호출 - URL:', url, 'adminId:', adminId);
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Development-Mode': 'true', // 개발 모드 헤더 추가
        'Authorization': 'Bearer test-token', // 임시 테스트 토큰
      },
      body: JSON.stringify({ adminId }),
    });
  },
  testUpdateStatusToHold: (id, adminId, reason) => {
    const url = `${API_BASE_URL}/api/customs/${id}/hold`;
    console.log('테스트 API 호출 - URL:', url, 'adminId:', adminId, 'reason:', reason);
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Development-Mode': 'true', // 개발 모드 헤더 추가
        'Authorization': 'Bearer test-token', // 임시 테스트 토큰
      },
      body: JSON.stringify({ adminId, reason }),
    });
  },
}; 