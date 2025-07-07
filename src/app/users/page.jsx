"use client"

import { useState, useEffect, useMemo } from "react"
import { DataTable } from "@/components/ui"
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui/Dropdown";
import ChevronDown from "@/components/ui/ChevronDown";
import { usersAPI } from "@/lib/api";

/**
 * 사용자 관리 페이지
 * @returns {JSX.Element} 사용자 관리 페이지 컴포넌트
 */
export default function UsersPage() {
  // 드롭다운 상태 관리
  const [roleFilter, setRoleFilter] = useState("ALL")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [genderFilter, setGenderFilter] = useState("ALL")
  const [joinDateSort, setJoinDateSort] = useState("latest")
  const [deleteDateSort, setDeleteDateSort] = useState("latest")

  // 데이터 상태 관리
  const [memberData, setMemberData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // 백엔드에서 사용자 데이터 로드
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const users = await usersAPI.getUsers()
        setMemberData(users || [])
      } catch (err) {
        console.error('사용자 데이터 로드 실패:', err)
        setError('사용자 데이터를 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // 필터링/정렬된 데이터를 useMemo로 계산
  const filteredData = useMemo(() => {
    let filtered = [...memberData]
    
    // 필터링
    if (roleFilter !== "ALL") {
      filtered = filtered.filter(m => m.role === roleFilter)
    }
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(m => m.status === statusFilter)
    }
    if (genderFilter !== "ALL") {
      filtered = filtered.filter(m => m.gender === genderFilter)
    }
    
    // 정렬
    if (joinDateSort === "latest") {
      filtered = filtered.sort((a, b) => {
        const dateA = a.createdAt || ''
        const dateB = b.createdAt || ''
        return dateB.localeCompare(dateA)
      })
    } else {
      filtered = filtered.sort((a, b) => {
        const dateA = a.createdAt || ''
        const dateB = b.createdAt || ''
        return dateA.localeCompare(dateB)
      })
    }
    
    if (deleteDateSort === "latest") {
      filtered = filtered.sort((a, b) => {
        const dateA = a.deletedAt || ''
        const dateB = b.deletedAt || ''
        return dateB.localeCompare(dateA)
      })
    } else {
      filtered = filtered.sort((a, b) => {
        const dateA = a.deletedAt || ''
        const dateB = b.deletedAt || ''
        return dateA.localeCompare(dateB)
      })
    }
    
    return filtered
  }, [memberData, roleFilter, statusFilter, genderFilter, joinDateSort, deleteDateSort])

  // 로딩 중일 때 표시
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#000000] mb-6">회원정보</h2>
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">데이터를 불러오는 중...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 에러 발생 시 표시
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-[#000000] mb-6">회원정보</h2>
            <div className="text-center py-8">
              <div className="text-red-600 mb-2">오류 발생</div>
              <div className="text-gray-600">{error}</div>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 컬럼 정의 (드롭다운 헤더 적용)
  const columns = [
    { header: "ID", key: "id" },
    { header: "닉네임", key: "nickname" },
    { header: "이메일", key: "email" },
    {
      header: (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">권한</span>
          <Dropdown value={roleFilter} onValueChange={setRoleFilter}>
            <DropdownTrigger className="w-6 h-6 border-0 bg-transparent p-0 hover:bg-gray-100">
              <span className="sr-only">필터</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem value="ALL">모두</DropdownItem>
              <DropdownItem value="USER">회원</DropdownItem>
              <DropdownItem value="ADMIN">관리자</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      ),
      key: "role",
      render: (v) =>
        v === "ADMIN" ? (
          <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">관리자</span>
        ) : (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">회원</span>
        ),
    },
    {
      header: (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">상태</span>
          <Dropdown value={statusFilter} onValueChange={setStatusFilter}>
            <DropdownTrigger className="w-6 h-6 border-0 bg-transparent p-0 hover:bg-gray-100">
              <span className="sr-only">필터</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem value="ALL">모두</DropdownItem>
              <DropdownItem value="ACTIVE">정상</DropdownItem>
              <DropdownItem value="SUSPENDED">차단</DropdownItem>
              <DropdownItem value="WITHDRAWN">탈퇴</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      ),
      key: "status",
      render: (v) => v === "ACTIVE"
        ? <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">정상</span>
        : v === "SUSPENDED"
        ? <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">차단</span>
        : <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">탈퇴</span>,
    },
    {
      header: (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">성별</span>
          <Dropdown value={genderFilter} onValueChange={setGenderFilter}>
            <DropdownTrigger className="w-6 h-6 border-0 bg-transparent p-0 hover:bg-gray-100">
              <span className="sr-only">필터</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem value="ALL">모두</DropdownItem>
              <DropdownItem value="F">여</DropdownItem>
              <DropdownItem value="M">남</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      ),
      key: "gender",
      render: (v) => v === "F" ? "여" : "남",
    },
    {
      header: (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">가입일</span>
          <Dropdown value={joinDateSort} onValueChange={setJoinDateSort}>
            <DropdownTrigger className="w-6 h-6 border-0 bg-transparent p-0 hover:bg-gray-100">
              <span className="sr-only">필터</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem value="latest">최신순</DropdownItem>
              <DropdownItem value="oldest">오래된순</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      ),
      key: "createdAt",
      render: (v) => v ? new Date(v).toISOString().slice(0, 10) : "-",
    },
    {
      header: (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">삭제일</span>
          <Dropdown value={deleteDateSort} onValueChange={setDeleteDateSort}>
            <DropdownTrigger className="w-6 h-6 border-0 bg-transparent p-0 hover:bg-gray-100">
              <span className="sr-only">필터</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem value="latest">최신순</DropdownItem>
              <DropdownItem value="oldest">오래된순</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      ),
      key: "deletedAt",
      render: (v) => v ? new Date(v).toISOString().slice(0, 10) : "-",
    },
  ]

  const handleRowAction = (row) => {
    // 상세 페이지 이동 등
    alert(`회원 ID: ${row.id}`)
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#000000] mb-6">회원정보</h2>
          <DataTable
            columns={columns}
            data={filteredData}
            onRowAction={handleRowAction}
          />
        </div>
      </div>
    </div>
  )
} 