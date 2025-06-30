import { useState, useEffect, useCallback } from 'react';
import { authAPI } from '../lib/api';
import { STORAGE_KEYS } from '../lib/constants';

/**
 * 인증 관련 상태와 함수를 제공하는 커스텀 훅
 * @returns {Object} 인증 상태와 관련 함수들
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 토큰 확인 및 사용자 정보 로드
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        setIsLoading(false);
        return;
      }

      const userData = await authAPI.getProfile();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('인증 확인 실패:', error);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 로그인 함수
  const login = useCallback(async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 로그아웃 함수
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
    } finally {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // 회원가입 함수
  const register = useCallback(async (userData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(userData);
      
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    checkAuth,
  };
} 