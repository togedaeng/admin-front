'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Mail,
  Calendar,
  ShoppingCart,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Package
} from 'lucide-react'
import { NAVIGATION_ITEMS } from '../lib/constants'
import { classNames } from '../lib/utils'

/**
 * 사이드바 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.isOpen - 사이드바 열림 상태 (모바일)
 * @param {Function} props.onClose - 사이드바 닫기 핸들러
 * @returns {JSX.Element} Sidebar 컴포넌트
 */
function Sidebar({ isOpen = false, onClose = () => {} }) {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)

  // 아이콘 매핑
  const iconMap = {
    'ti-layout-dashboard': Home,
    'ti-users': Users,
    'ti-package': Package,
    'ti-shopping-cart': ShoppingCart,
    'ti-settings': Settings,
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
          onClick={onClose}
        />
      )}

      <aside className={classNames(
        'fixed xl:static top-0 left-0 z-20 h-screen bg-white shadow-md',
        'transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0',
        collapsed ? 'w-[70px]' : 'w-[270px]',
        'relative'
      )}>
        {/* 토글 버튼 */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-[#1b0a5c] text-white w-6 h-6 rounded-full flex items-center justify-center z-50 shadow-md hover:bg-[#0f0533] transition-colors"
          aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        
        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              {!collapsed && (
                <span className="ml-3 text-xl font-semibold text-gray-800">
                  Admin
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="xl:hidden p-2 hover:bg-gray-100 rounded-lg"
              aria-label="사이드바 닫기"
            >
              <X size={20} />
            </button>
          </div>

          {/* 네비게이션 */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="mb-6">
              {!collapsed && (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  메인 메뉴
                </h3>
              )}
              <ul className="space-y-2">
                {NAVIGATION_ITEMS.map((item) => {
                  const IconComponent = iconMap[item.icon] || Home
                  const isActive = activeMenu === item.id
                  
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={classNames(
                          'flex items-center px-4 py-3 rounded-lg transition-colors',
                          isActive
                            ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800',
                          collapsed && 'justify-center'
                        )}
                        onClick={() => setActiveMenu(item.id)}
                        title={collapsed ? item.label : ''}
                      >
                        <IconComponent 
                          size={20} 
                          className={collapsed ? 'mx-auto' : 'mr-3'} 
                        />
                        {!collapsed && item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* 푸터 */}
          {!collapsed && (
            <div className="p-4 border-t">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">관리자</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar; 