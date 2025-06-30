'use client'

import { useState } from 'react'
import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#e2e9ef]">
        <div className="min-h-screen">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          
          <div className="flex">
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)} 
            />
            
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
} 