"use client";

import { useState, useEffect, useMemo } from "react";
import { DataTable } from "@/components/ui";
import StatusButton from "@/components/ui/StatusButton";
import { dogsAPI } from "@/lib/api";
import PageContainer from "@/components/ui/PageContainer";
import { Pagination } from "@/components/features/Pagination";

const dogStatusLabel = {
  REGISTERED: "요청",
  APPROVED: "승인",
  SUSPENDED: "중지",
  REMOVED: "삭제"
};

export default function DogsPage() {
  const [dogData, setDogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const dogs = await dogsAPI.getDogs();
        setDogData(dogs || []);
      } catch (err) {
        setError("반려견 데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDogs();
  }, []);

  const paginatedData = useMemo(() => {
    return dogData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [dogData, currentPage]);

  const totalPages = Math.ceil(dogData.length / itemsPerPage);

  const handleRowAction = (row) => {
    // 상세 페이지 이동 등 구현
    // router.push(`/dogs/${row.id}`)
    console.log("반려견 상세 정보:", row);
  };

  const columns = [
    { header: "ID", key: "id" },
    { header: "이름", key: "name" },
    { header: "주인 닉네임", key: "ownerNickname" },
    {
      header: "상태",
      key: "status",
      render: (v) => (
        <StatusButton label={dogStatusLabel[v] || v} type="dogStatus" status={v} />
      ),
    },
    {
      header: "등록일",
      key: "createdAt",
      render: (v) => v ? new Date(v).toISOString().slice(0, 10) : "-",
    },
    {
      header: "삭제일",
      key: "deletedAt",
      render: (v) => v ? new Date(v).toISOString().slice(0, 10) : "-",
    },
  ];

  if (isLoading) {
    return (
      <PageContainer title="반려견 정보">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0' }}>
          <div style={{ border: '4px solid rgba(0,0,0,0.1)', borderTop: '4px solid #2563eb', borderRadius: '50%', width: 32, height: 32, animation: 'spin 1s linear infinite' }} />
          <span style={{ marginTop: 8, color: '#4b5563' }}>데이터를 불러오는 중...</span>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="반려견 정보">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0' }}>
          <div style={{ color: '#dc2626', marginBottom: 8 }}>{error}</div>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer' }}>다시 시도</button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="반려견 정보">
      <DataTable columns={columns} data={paginatedData} onRowAction={handleRowAction} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
} 