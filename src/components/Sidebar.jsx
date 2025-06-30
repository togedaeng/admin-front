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
  LogIn,
  UserPlus,
  Type,
  AlertTriangle,
  CreditCard,
  MousePointer,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import PropTypes from 'prop-types'

function Sidebar({ isOpen = false, onClose = () => { } }) {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [componentsOpen, setComponentsOpen] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
    { id: 'users', label: 'Users', icon: Users, href: '/users' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/orders' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/calendar' },
    { id: 'messages', label: 'Messages', icon: Mail, href: '/messages' },
    { id: 'reports', label: 'Reports', icon: FileText, href: '/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ]

  const componentItems = [
    { id: 'login', label: 'Login', icon: LogIn, href: '/login' },
    { id: 'register', label: 'Register', icon: UserPlus, href: '/register' },
    { id: 'buttons', label: 'Buttons', icon: MousePointer, href: '/buttons' },
    { id: 'cards', label: 'Cards', icon: CreditCard, href: '/cards' },
    { id: 'forms', label: 'Forms', icon: FileText, href: '/forms' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, href: '/alerts' },
    { id: 'typography', label: 'Typography', icon: Type, href: '/typography' },
    { id: 'icons', label: 'Icons', icon: ImageIcon, href: '/icons' },
    { id: 'sample', label: 'Sample Page', icon: FileText, href: '/sample' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed xl:static top-0 left-0 z-20 h-screen w-[270px] bg-white shadow-md
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-800">Admin</span>
            </div>
            <button
              onClick={onClose}
              className="xl:hidden p-2 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main</h3>
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={`
                          flex items-center px-4 py-3 transition-colors
                          ${activeMenu === item.id
                            ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                          }
                        `}
                        onClick={() => setActiveMenu(item.id)}
                      >
                        <Icon size={20} className="mr-3" />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mb-6">
              <button
                className="flex items-center w-full px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 hover:bg-gray-100 transition-colors"
                onClick={() => setComponentsOpen((open) => !open)}
                aria-expanded={componentsOpen}
                aria-controls="sidebar-components-list"
                type="button"
              >
                Components
                {componentsOpen ? <ChevronUp className="ml-auto" size={18} /> : <ChevronDown className="ml-auto" size={18} />}
              </button>
              <ul
                id="sidebar-components-list"
                className={`space-y-2 transition-all duration-200 ${componentsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                {componentItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={`
                          flex items-center px-4 py-3 transition-colors
                          ${activeMenu === item.id
                            ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                          }
                        `}
                        onClick={() => setActiveMenu(item.id)}
                      >
                        <Icon size={20} className="mr-3" />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center p-3 bg-gray-50">
              <div className="w-8 h-8 bg-gray-300"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Sidebar; 