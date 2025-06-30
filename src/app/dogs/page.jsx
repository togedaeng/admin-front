"use client"

import { useState } from "react"
import { DataTable, FilterPanel } from "@/components/ui"

export default function DogsPage() {
  const [filters, setFilters] = useState({
    dogName: '',
    ownerName: '',
    sortOrder: '',
    status: '',
    modelingWait: false,
    deletedDogs: false
  })

  const [currentPage, setCurrentPage] = useState(1)

  const dogData = [
    { name: "모카", status: "Active", owner: "서현", registrationDate: "2025-01-01", deletionDate: "-" },
    { name: "율무", status: "Hold", owner: "다은", registrationDate: "2025-01-01", deletionDate: "-" },
    { name: "호두", status: "Active", owner: "임정", registrationDate: "2025-01-01", deletionDate: "-" },
    { name: "꾸꾸", status: "Requested", owner: "갱갱", registrationDate: "2025-01-01", deletionDate: "-" },
    { name: "호랑", status: "Hold", owner: "큰나", registrationDate: "2025-01-01", deletionDate: "-" },
    { name: "별이", status: "Inactive", owner: "누나", registrationDate: "2025-01-01", deletionDate: "2025-03-01" },
    { name: "별이", status: "Inactive", owner: "누나", registrationDate: "2025-01-01", deletionDate: "2025-03-01" },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200";
      case 'Hold':
        return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200";
      case 'Requested':
        return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 border border-sky-200";
      case 'Inactive':
        return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200";
      default:
        return "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200";
    }
  }

  // 필터 정의
  const filterConfig = [
    { type: 'search', key: 'dogName', placeholder: '강아지 이름' },
    { type: 'search', key: 'ownerName', placeholder: '주인 닉네임' },
    { 
      type: 'select', 
      key: 'sortOrder', 
      placeholder: '최신순',
      options: [
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' }
      ]
    },
    { 
      type: 'select', 
      key: 'status', 
      placeholder: '상태',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Hold', label: 'Hold' },
        { value: 'Requested', label: 'Requested' },
        { value: 'Inactive', label: 'Inactive' }
      ]
    },
    { type: 'empty' } // 5번째 컬럼을 위한 빈 공간
  ]

  const checkboxConfig = [
    { key: 'modelingWait', label: '모델링 대기' },
    { key: 'deletedDogs', label: '삭제한 강아지' }
  ]

  // 테이블 컬럼 정의
  const columns = [
    { key: 'name', header: '강아지 이름' },
    { 
      key: 'status', 
      header: '상태',
      render: (value) => (
        <span className={getStatusBadge(value)}>
          {value}
        </span>
      )
    },
    { key: 'owner', header: '주인 닉네임' },
    { key: 'registrationDate', header: '등록일' },
    { key: 'deletionDate', header: '삭제일' }
  ]

  // 페이지네이션 계산
  const itemsPerPage = 10
  const totalPages = Math.ceil(dogData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = dogData.slice(startIndex, endIndex)

  const pagination = {
    currentPage,
    totalPages
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // 필터 변경 시 첫 페이지로 이동
  }

  const handleRowAction = (dog) => {
    console.log('강아지 상세 정보:', dog)
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
          <h2 className="text-xl font-semibold text-[#000000] mb-6">반려견 정보</h2>

          <FilterPanel 
            filters={filterConfig}
            values={filters}
            onChange={handleFilterChange}
            checkboxes={checkboxConfig}
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