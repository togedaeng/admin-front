'use client'

import { Menu, Bell, Search, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/Button'
import { useAuth } from '../hooks/useAuth'

/**
 * 애플리케이션 헤더 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Function} props.onMenuClick - 메뉴 클릭 핸들러
 * @returns {JSX.Element} Header 컴포넌트
 */
function Header({ onMenuClick }) {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // 로그아웃 후 리다이렉트 로직을 여기에 추가할 수 있습니다
  };

  return (
    <header className="bg-white shadow-md w-full text-sm py-4 px-6 sticky top-14 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg xl:hidden"
            aria-label="메뉴 열기"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">관리자 대시보드</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* 검색 */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="검색..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 인증 상태에 따른 버튼 표시 */}
          {isAuthenticated ? (
            <>
              {/* 알림 */}
              <button 
                className="relative p-2 hover:bg-gray-100 rounded-lg"
                aria-label="알림"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* 사용자 프로필 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">
                    {user?.name || '관리자'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.role || 'Administrator'}
                  </p>
                </div>
              </div>

              {/* 로그아웃 버튼 */}
              <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
                className="hidden md:inline-flex"
              >
                로그아웃
              </Button>
            </>
          ) : (
            /* 인증되지 않은 사용자를 위한 로그인/회원가입 버튼 */
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="primary" size="sm">
                  로그인
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="sm">
                  회원가입
                </Button>
              </Link>
            </div>
          )}

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="모바일 메뉴"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header; 