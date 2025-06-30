"use client"

import { useState } from "react"
import { Bell, Settings, Home, Users, UserCheck, MessageSquare, HelpCircle, Megaphone, Search, ChevronLeft, ChevronRight } from "lucide-react"

export default function UserDashboard() {
  const [selectedNav, setSelectedNav] = useState("회원정보")

  const memberData = [
    {
      email: "dansunmusik7@gmail.com",
      nickname: "서진",
      gender: "여",
      joinDate: "2025-01-01",
      permission: "회원",
      status: "활성화",
    },
    {
      email: "gaeunyjragogo@gmail.com",
      nickname: "가은",
      gender: "여",
      joinDate: "2025-01-01",
      permission: "관리자",
      status: "활성화",
    },
    {
      email: "nanunyunjiya@gmail.com",
      nickname: "윤지",
      gender: "여",
      joinDate: "2025-01-01",
      permission: "회원",
      status: "비활성화",
    },
    {
      email: "dansunmusik7@gmail.com",
      nickname: "당우",
      gender: "남",
      joinDate: "2025-01-01",
      permission: "회원",
      status: "활성화",
    },
    {
      email: "dansunmusik7@gmail.com",
      nickname: "당당",
      gender: "남",
      joinDate: "2025-01-01",
      permission: "회원",
      status: "비활성화",
    },
  ]

  const navItems = [
    { icon: Home, label: "대시보드", key: "dashboard" },
    { icon: Users, label: "회원정보", key: "회원정보" },
    { icon: UserCheck, label: "간이치정보", key: "guest" },
    { icon: MessageSquare, label: "커스텀 요청", key: "custom" },
    { icon: HelpCircle, label: "문의사항", key: "inquiry" },
    { icon: Megaphone, label: "공지사항", key: "notice" },
  ]

  return (
    <div className="min-h-screen bg-[#e2e9ef]">
      {/* Header */}
      <header className="bg-[#190a49] text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">TogeDaeng Admin Page</h1>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5" />
          <Settings className="w-5 h-5" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#190a49] text-sm font-medium">A</span>
            </div>
            <span className="text-sm">Admin</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-[calc(100vh-72px)] p-4">
          <div className="mb-6">
            <div className="flex items-center gap-3 p-3 bg-[#f5f5f5] rounded-lg">
              <div className="w-10 h-10 bg-[#0078d2] rounded-full flex items-center justify-center">
                <span className="text-white font-medium">A</span>
              </div>
              <span className="text-[#bfc5c8] font-medium">Admin</span>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = selectedNav === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedNav(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive ? "bg-[#0078d2] text-white" : "text-[#bfc5c8] hover:bg-[#f5f5f5]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#000000] mb-6">회원정보</h2>

              {/* Search Filters */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="relative">
                  <input 
                    placeholder="이메일" 
                    className="w-full pr-10 px-3 py-2 border border-[#dfe1e3] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#bfc5c8]" />
                </div>
                <div className="relative">
                  <input 
                    placeholder="닉네임" 
                    className="w-full pr-10 px-3 py-2 border border-[#dfe1e3] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#bfc5c8]" />
                </div>
                <select className="px-3 py-2 border border-[#dfe1e3] rounded-md focus:border-[#0078d2] focus:ring-[#0078d2] focus:outline-none">
                  <option>최신순</option>
                  <option>오래된순</option>
                </select>
                <select className="px-3 py-2 border border-[#dfe1e3] rounded-md focus:border-[#0078d2] focus:ring-[#0078d2] focus:outline-none">
                  <option>권한</option>
                  <option>회원</option>
                  <option>관리자</option>
                </select>
                <select className="px-3 py-2 border border-[#dfe1e3] rounded-md focus:border-[#0078d2] focus:ring-[#0078d2] focus:outline-none">
                  <option>상태</option>
                  <option>활성화</option>
                  <option>비활성화</option>
                </select>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-[#dfe1e3]">
                      <th className="text-left py-3 px-4 text-[#404040] font-medium">이메일</th>
                      <th className="text-left py-3 px-4 text-[#404040] font-medium">닉네임</th>
                      <th className="text-left py-3 px-4 text-[#404040] font-medium">성별</th>
                      <th className="text-left py-3 px-4 text-[#404040] font-medium">가입일</th>
                      <th className="text-left py-3 px-4 text-[#404040] font-medium">권한</th>
                      <th className="text-left py-3 px-4 text-[#404040] font-medium">상태</th>
                      <th className="text-left py-3 px-4 text-[#404040] font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberData.map((member, index) => (
                      <tr key={index} className="border-b border-[#dfe1e3] hover:bg-gray-50">
                        <td className="py-3 px-4 text-[#000000]">{member.email}</td>
                        <td className="py-3 px-4 text-[#000000]">{member.nickname}</td>
                        <td className="py-3 px-4 text-[#000000]">{member.gender}</td>
                        <td className="py-3 px-4 text-[#000000]">{member.joinDate}</td>
                        <td className="py-3 px-4 text-[#000000]">{member.permission}</td>
                        <td className="py-3 px-4 text-[#000000]">{member.status}</td>
                        <td className="py-3 px-4">
                          <button className="bg-[#404040] hover:bg-[#404040]/90 text-white rounded-full px-4 py-1 text-sm">
                            자세히
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <button className="p-2 text-[#979797] hover:text-[#404040] transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[#404040] text-sm">1 / 2</span>
                <button className="p-2 text-[#979797] hover:text-[#404040] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 