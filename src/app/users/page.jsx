"use client";

import { useState, useEffect, useMemo } from "react";
import { DataTable } from "@/components/ui";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui/Dropdown";
import ChevronDown from "@/components/ui/ChevronDown";
import { useRouter } from "next/navigation";
import { applyFilters } from "@/hooks/applyFilters";
import StatusButton from "@/components/ui/StatusButton";
import styles from "@/assets/css/UsersPage.module.css";

export default function UsersPage() {
  const router = useRouter();

  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [joinDateSort, setJoinDateSort] = useState("latest");
  const [deleteDateSort, setDeleteDateSort] = useState("latest");

  const [memberData, setMemberData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("데이터 요청 실패");
        const users = await response.json();
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

    const filtered = applyFilters(memberData, filterState);

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
  }, [memberData, roleFilter, statusFilter, genderFilter, joinDateSort, deleteDateSort]);

  if (isLoading) {
    return (
      <div className={styles.usersPage}>
        <div className={styles.usersCard}>
          <div className={styles.usersCardContent}>
            <h2 className={styles.usersTitle}>회원정보</h2>
            <div className={styles.usersLoading}>
              <div className={styles.usersSpinner}></div>
              <span className={styles.usersLoadingText}>데이터를 불러오는 중...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.usersPage}>
        <div className={styles.usersCard}>
          <div className={styles.usersCardContent}>
            <h2 className={styles.usersTitle}>회원정보</h2>
            <div className={styles.usersError}>
              <div className={styles.usersErrorMessage}>{error}</div>
              <button onClick={() => window.location.reload()} className={styles.usersRetryButton}>다시 시도</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const columns = [
    { header: "ID", key: "id" },
    { header: "닉네임", key: "nickname" },
    { header: "이메일", key: "email" },
    {
      header: (
        <div className={styles.usersHeader}>
          <span>권한</span>
          <Dropdown value={roleFilter} onValueChange={setRoleFilter}>
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
          <Dropdown value={statusFilter} onValueChange={setStatusFilter}>
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
          <Dropdown value={genderFilter} onValueChange={setGenderFilter}>
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
          <Dropdown value={joinDateSort} onValueChange={setJoinDateSort}>
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
          <Dropdown value={deleteDateSort} onValueChange={setDeleteDateSort}>
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

  const handleRowAction = (row) => {
    router.push(`/users/${row.id}`);
  };

  return (
    <div className={styles.usersPage}>
      <div className={styles.usersCard}>
        <div className={styles.usersCardContent}>
          <h2 className={styles.usersTitle}>회원정보</h2>
          <DataTable columns={columns} data={filteredData} onRowAction={handleRowAction} />
        </div>
      </div>
    </div>
  );
}
