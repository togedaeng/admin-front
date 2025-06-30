"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * 재사용 가능한 데이터 테이블 컴포넌트
 * @param {Object} props
 * @param {Array} props.columns - 테이블 컬럼 정의
 * @param {Array} props.data - 테이블 데이터
 * @param {Function} props.onRowAction - 행 액션 핸들러
 * @param {Object} props.pagination - 페이지네이션 정보
 * @param {Function} props.onPageChange - 페이지 변경 핸들러
 */
export default function DataTable({ 
  columns, 
  data, 
  onRowAction, 
  pagination,
  onPageChange 
}) {
  return (
    <div>
      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-[#dfe1e3]">
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="text-left py-3 px-4 text-[#404040] font-medium"
                >
                  {column.header}
                </th>
              ))}
              <th className="text-left py-3 px-4 text-[#404040] font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-[#dfe1e3] hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-3 px-4 text-[#000000]">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                <td className="py-3 px-4">
                  <button 
                    onClick={() => onRowAction && onRowAction(row)}
                    className="bg-[#404040] hover:bg-[#404040]/90 text-white rounded-full px-4 py-1 text-sm"
                  >
                    자세히
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button 
            onClick={() => onPageChange && onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1}
            className="p-2 text-[#979797] hover:text-[#404040] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[#404040] text-sm">
            {pagination.currentPage} / {pagination.totalPages}
          </span>
          <button 
            onClick={() => onPageChange && onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="p-2 text-[#979797] hover:text-[#404040] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
} 