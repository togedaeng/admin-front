"use client";

import { useState, useEffect, useMemo } from "react";
import { DataTable } from "@/components/ui";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui/Dropdown";
import ChevronDown from "@/components/ui/ChevronDown";
import { useRouter } from "next/navigation";
import { applyFilters } from "@/hooks/applyFilters";
import StatusButton from "@/components/ui/StatusButton";
import styles from "@/assets/css/UserPage.module.css";
import { usersAPI } from "@/lib/api";
import SearchBar from "@/components/ui/SearchBar";
import { Pagination } from "@/components/features/Pagination";
import PageContainer from "@/components/ui/PageContainer";

export default function UsersPage() {
  const router = useRouter();

  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [joinDateSort, setJoinDateSort] = useState("latest");
  const [deleteDateSort, setDeleteDateSort] = useState("latest");

  const [searchField, setSearchField] = useState("email");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [memberData, setMemberData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const users = await usersAPI.getUsers();
        console.log(users);
        setMemberData(users || []);
      } catch (err) {
        console.error("사용자 데이터 로드 실패:", err);
        setError("사용자 데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredData = useMemo(() => {
    const filterState = {
      role: roleFilter === "ALL" ? "" : roleFilter,
      status: statusFilter === "ALL" ? "" : statusFilter,
      gender: genderFilter === "ALL" ? "" : genderFilter,
    };
    console.log(roleFilter, statusFilter, genderFilter)

    let filtered = applyFilters(memberData, filterState);

    if (searchKeyword) {
      filtered = filtered.filter(item => {
        const value = item[searchField]?.toLowerCase() || "";
        return value.includes(searchKeyword.toLowerCase());
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      const joinCompare = joinDateSort === "latest"
        ? (b.createdAt || "").localeCompare(a.createdAt || "")
        : (a.createdAt || "").localeCompare(b.createdAt || "");

      const deleteCompare = deleteDateSort === "latest"
        ? (b.deletedAt || "").localeCompare(a.deletedAt || "")
        : (a.deletedAt || "").localeCompare(b.deletedAt || "");

      return joinCompare || deleteCompare;
    });

    return sorted;
  }, [memberData, roleFilter, statusFilter, genderFilter, joinDateSort, deleteDateSort, searchField, searchKeyword]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowAction = (row) => {
    router.push(`/users/${row.id}`);
  };

  // 상태 변경 시 콘솔 로그 추가
  const handleRoleFilterChange = (value) => {
    console.log("[UsersPage] roleFilter 변경:", value);
    setRoleFilter(value);
  };
  const handleStatusFilterChange = (value) => {
    console.log("[UsersPage] statusFilter 변경:", value);
    setStatusFilter(value);
  };
  const handleGenderFilterChange = (value) => {
    console.log("[UsersPage] genderFilter 변경:", value);
    setGenderFilter(value);
  };
  const handleJoinDateSortChange = (value) => {
    console.log("[UsersPage] joinDateSort 변경:", value);
    setJoinDateSort(value);
  };
  const handleDeleteDateSortChange = (value) => {
    console.log("[UsersPage] deleteDateSort 변경:", value);
    setDeleteDateSort(value);
  };

  const columns = [
    { header: "ID", key: "id" },
    { header: "닉네임", key: "nickname" },
    { header: "이메일", key: "email" },
    {
      header: (
        <div className={styles.usersHeader}>
          <span>권한</span>
          <Dropdown value={roleFilter} onValueChange={handleRoleFilterChange}>
            <DropdownTrigger className={styles.usersDropdownTrigger}>
              <ChevronDown className={styles.usersChevron} />
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
      render: (v) => <StatusButton label={v === 'ADMIN' ? '관리자' : '회원'} type="role" status={v} />,
    },
    {
      header: (
        <div className={styles.usersHeader}>
          <span>상태</span>
          <Dropdown value={statusFilter} onValueChange={handleStatusFilterChange}>
            <DropdownTrigger className={styles.usersDropdownTrigger}>
              <ChevronDown className={styles.usersChevron} />
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
      render: (v) => <StatusButton label={v === 'ACTIVE' ? '정상' : v === 'SUSPENDED' ? '차단' : '탈퇴'} type="userStatus" status={v} />,
    },
    {
      header: (
        <div className={styles.usersHeader}>
          <span>성별</span>
          <Dropdown value={genderFilter} onValueChange={handleGenderFilterChange}>
            <DropdownTrigger className={styles.usersDropdownTrigger}>
              <ChevronDown className={styles.usersChevron} />
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
        <div className={styles.usersHeader}>
          <span>가입일</span>
          <Dropdown value={joinDateSort} onValueChange={handleJoinDateSortChange}>
            <DropdownTrigger className={styles.usersDropdownTrigger}>
              <ChevronDown className={styles.usersChevron} />
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
        <div className={styles.usersHeader}>
          <span>삭제일</span>
          <Dropdown value={deleteDateSort} onValueChange={handleDeleteDateSortChange}>
            <DropdownTrigger className={styles.usersDropdownTrigger}>
              <ChevronDown className={styles.usersChevron} />
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
  ];

  if (isLoading) {
    return (
      <PageContainer title="회원정보">
        <div className={styles.usersLoading}>
          <div className={styles.usersSpinner}></div>
          <span className={styles.usersLoadingText}>데이터를 불러오는 중...</span>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="회원정보">
        <div className={styles.usersError}>
          <div className={styles.usersErrorMessage}>{error}</div>
          <button onClick={() => window.location.reload()} className={styles.usersRetryButton}>다시 시도</button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="회원정보">
      <SearchBar
        searchField={searchField}
        searchKeyword={searchKeyword}
        onSearchFieldChange={setSearchField}
        onSearchKeywordChange={setSearchKeyword}
      />

      <DataTable columns={columns} data={paginatedData} onRowAction={handleRowAction} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
}
