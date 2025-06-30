"use client"

import { useState } from "react"
import { DataTable, FilterPanel } from "@/components/ui"

export default function InquiryPage() {
  const [filters, setFilters] = useState({
    category: '',
    author: '',
    status: '',
    sortOrder: ''
  })

  const [currentPage, setCurrentPage] = useState(1)

  const inquiryData = [
    { id: 8, category: "기술문의", title: "앱이 자꾸 꺼져요", author: "서현", status: "답변완료", date: "2025.01.15" },
    { id: 7, category: "계정문의", title: "비밀번호 변경 문의", author: "다은", status: "처리중", date: "2025.01.14" },
    { id: 6, category: "서비스문의", title: "강아지 등록이 안돼요", author: "임정", status: "답변완료", date: "2025.01.13" },
    { id: 5, category: "기술문의", title: "사진 업로드 오류", author: "갱갱", status: "접수", date: "2025.01.12" },
    { id: 4, category: "결제문의", title: "결제 취소 요청", author: "큰나", status: "처리중", date: "2025.01.11" },
    { id: 3, category: "서비스문의", title: "모델링 진행 상황 문의", author: "누나", status: "답변완료", date: "2025.01.10" },
    { id: 2, category: "계정문의", title: "회원탈퇴 문의", author: "윤지", status: "처리중", date: "2025.01.09" },
    { id: 1, category: "기타", title: "앱 사용법 문의", author: "서진", status: "답변완료", date: "2025.01.08" },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case '접수':
        return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200";
      case '처리중':
        return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200";
      case '답변완료':
        return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200";
      default:
        return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200";
    }
  }

  // 필터 정의
  const filterConfig = [
    { 
      type: 'select', 
      key: 'category', 
      placeholder: '카테고리',
      options: [
        { value: '기술문의', label: '기술문의' },
        { value: '계정문의', label: '계정문의' },
        { value: '서비스문의', label: '서비스문의' },
        { value: '결제문의', label: '결제문의' },
        { value: '기타', label: '기타' }
      ]
    },
    { type: 'search', key: 'author', placeholder: '작성자' },
    { 
      type: 'select', 
      key: 'status', 
      placeholder: '처리상태',
      options: [
        { value: '접수', label: '접수' },
        { value: '처리중', label: '처리중' },
        { value: '답변완료', label: '답변완료' }
      ]
    },
    { 
      type: 'select', 
      key: 'sortOrder', 
      placeholder: '최신순',
      options: [
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' }
      ]
    },
    { type: 'empty' }  // 5번째 컬럼을 위한 빈 공간
  ]

  // 테이블 컬럼 정의
  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'category', header: '카테고리' },
    { key: 'title', header: '제목' },
    { key: 'author', header: '작성자' },
    { 
      key: 'status', 
      header: '처리상태',
      render: (value) => (
        <span className={getStatusBadge(value)}>
          {value}
        </span>
      )
    },
    { key: 'date', header: '등록일' }
  ]

  // 페이지네이션 계산
  const itemsPerPage = 10
  const totalPages = Math.ceil(inquiryData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = inquiryData.slice(startIndex, endIndex)

  const pagination = {
    currentPage,
    totalPages
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // 필터 변경 시 첫 페이지로 이동
  }

  const handleRowAction = (inquiry) => {
    console.log('문의사항 상세 정보:', inquiry)
    // 실제로는 상세 페이지로 이동하거나 모달을 열 것
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#000000] mb-6">문의사항</h2>

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