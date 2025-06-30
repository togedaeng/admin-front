"use client"

import { useState } from "react"
import { DataTable, FilterPanel } from "@/components/ui"

export default function NoticePage() {
  const [filters, setFilters] = useState({
    category: '',
    title: '',
    sortOrder: ''
  })

  const [currentPage, setCurrentPage] = useState(1)

  const noticeData = [
    { id: 6, category: "상점", title: "신규 3층 추가", author: "Admin", date: "2025.06.26" },
    { id: 5, category: "상점", title: "신규 3층 추가", author: "Admin", date: "2025.06.26" },
    { id: 4, category: "이벤트", title: "여름 특별 이벤트", author: "Admin", date: "2025.06.25" },
    { id: 3, category: "상점", title: "신규 3층 추가", author: "Admin", date: "2025.06.26" },
    { id: 2, category: "시스템", title: "시스템 점검 안내", author: "Admin", date: "2025.06.24" },
    { id: 1, category: "상점", title: "신규 3층 추가", author: "Admin", date: "2025.06.26" },
  ]

  // 필터 정의
  const filterConfig = [
    { 
      type: 'select', 
      key: 'category', 
      placeholder: '전체',
      options: [
        { value: '상점', label: '상점' },
        { value: '이벤트', label: '이벤트' },
        { value: '시스템', label: '시스템' }
      ]
    },
    { type: 'search', key: 'title', placeholder: '게시물 제목' },
    { 
      type: 'select', 
      key: 'sortOrder', 
      placeholder: '최신순',
      options: [
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' }
      ]
    },
    { type: 'empty' }, // 4번째 컬럼을 위한 빈 공간
    { type: 'empty' }  // 5번째 컬럼을 위한 빈 공간
  ]

  // 테이블 컬럼 정의
  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'category', header: '카테고리' },
    { key: 'title', header: '제목' },
    { key: 'author', header: '작성자' },
    { key: 'date', header: '등록일' }
  ]

  // 페이지네이션 계산
  const itemsPerPage = 10
  const totalPages = Math.ceil(noticeData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = noticeData.slice(startIndex, endIndex)

  const pagination = {
    currentPage,
    totalPages
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // 필터 변경 시 첫 페이지로 이동
  }

  const handleRowAction = (notice) => {
    console.log('공지사항 상세 정보:', notice)
    // 실제로는 상세 페이지로 이동하거나 모달을 열 것
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleRegister = () => {
    console.log('공지사항 등록')
    // 실제로는 등록 페이지로 이동하거나 모달을 열 것
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#000000]">공지사항</h2>
            <button 
              onClick={handleRegister}
              className="bg-[#47caeb] hover:bg-[#47caeb]/90 text-white rounded-lg px-6 py-2 text-sm font-medium transition-colors"
            >
              등록
            </button>
          </div>

          <FilterPanel 
            filters={filterConfig}
            values={filters}
            onChange={handleFilterChange}
          />

          <DataTable 
            columns={columns}
            data={currentData}
            onRowAction={handleRowAction}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
} 