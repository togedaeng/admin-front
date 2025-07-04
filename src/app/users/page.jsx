"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui"
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui/Dropdown";
import ChevronDown from "@/components/ui/ChevronDown";

/**
 * 사용자 관리 페이지
 * @returns {JSX.Element} 사용자 관리 페이지 컴포넌트
 */
export default function UsersPage() {
  // 드롭다운 상태 관리
  const [authorityFilter, setAuthorityFilter] = useState("ALL")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [genderFilter, setGenderFilter] = useState("ALL")
  const [joinDateSort, setJoinDateSort] = useState("latest")
  const [deleteDateSort, setDeleteDateSort] = useState("latest")

  const memberData = [
    {
      id: 1,
      nickname: "서진",
      email: "dansunmusik7@gmail.com",
      authority: "USER",
      status: "ACTIVE",
      gender: "F",
      joinDate: "2025-01-01",
      deleteDate: "2025-01-01",
    },
    {
      id: 2,
      nickname: "가은",
      email: "gaeunyjragogo@gmail.com",
      authority: "ADMIN",
      status: "ACTIVE",
      gender: "F",
      joinDate: "2025-01-01",
      deleteDate: "2025-01-01",
    },
    {
      id: 3,
      nickname: "윤지",
      email: "nanunyunjiya@gmail.com",
      authority: "USER",
      status: "ACTIVE",
      gender: "F",
      joinDate: "2025-01-01",
      deleteDate: "2025-01-01",
    },
    {
      id: 4,
      nickname: "당우",
      email: "dansunmusik7@gmail.com",
      authority: "USER",
      status: "SUSPENDED",
      gender: "F",
      joinDate: "2025-01-01",
      deleteDate: "2025-01-01",
    },
    {
      id: 5,
      nickname: "동우",
      email: "dansunmusik7@gmail.com",
      authority: "USER",
      status: "WITHDRAWN",
      gender: "F",
      joinDate: "2025-01-01",
      deleteDate: "2025-01-01",
    },
  ]

  // 컬럼 정의 (드롭다운 헤더 적용)
  const columns = [
    { header: "ID", key: "id" },
    { header: "닉네임", key: "nickname" },
    { header: "이메일", key: "email" },
    {
      header: (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">권한</span>
          <Dropdown value={authorityFilter} onValueChange={setAuthorityFilter}>
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
      key: "authority",
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
      key: "joinDate",
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
      key: "deleteDate",
    },
  ]

  // 필터링/정렬 (예시: authority, status, gender, joinDateSort, deleteDateSort)
  let filteredData = memberData
  if (authorityFilter !== "ALL") filteredData = filteredData.filter(m => m.authority === authorityFilter)
  if (statusFilter !== "ALL") filteredData = filteredData.filter(m => m.status === statusFilter)
  if (genderFilter !== "ALL") filteredData = filteredData.filter(m => m.gender === genderFilter)
  if (joinDateSort === "latest") filteredData = filteredData.sort((a, b) => b.joinDate.localeCompare(a.joinDate))
  else filteredData = filteredData.sort((a, b) => a.joinDate.localeCompare(b.joinDate))
  if (deleteDateSort === "latest") filteredData = filteredData.sort((a, b) => b.deleteDate.localeCompare(a.deleteDate))
  else filteredData = filteredData.sort((a, b) => a.deleteDate.localeCompare(b.deleteDate))

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