"use client";

import { useState, useEffect, useMemo } from "react";
import { DataTable } from "@/components/ui";
import StatusButton from "@/components/ui/StatusButton";
import { customsAPI } from "@/lib/api";
import PageContainer from "@/components/ui/PageContainer";
import { Pagination } from "@/components/features/Pagination";
import { useRouter } from "next/navigation";

const customStatusLabel = {
  PENDING: "대기",
  IN_PROGRESS: "진행중",
  COMPLETED: "완료",
  HOLD: "보류",
  CANCELED: "취소",
};

export default function CustomsPage() {
  const router = useRouter();
  const [customData, setCustomData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCustoms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const customs = await customsAPI.getCustoms();
        setCustomData(customs || []);
      } catch (err) {
        setError("커스텀 요청 데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustoms();
  }, []);

  const paginatedData = useMemo(() => {
    return customData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [customData, currentPage]);

  const totalPages = Math.ceil(customData.length / itemsPerPage);

  const handleRowAction = (row) => {
    router.push(`/customs/${row.id}`);
  };

  const columns = [
    { header: "ID", key: "id" },
    { header: "이름", key: "name" },
    { header: "주인 닉네임", key: "ownerNickname" },
    {
      header: "상태",
      key: "status",
      render: (v) => (
        <StatusButton label={customStatusLabel[v] || v} type="customStatus" status={v} />
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
      <PageContainer title="커스텀 요청 정보">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0' }}>
          <div style={{ border: '4px solid rgba(0,0,0,0.1)', borderTop: '4px solid #2563eb', borderRadius: '50%', width: 32, height: 32, animation: 'spin 1s linear infinite' }} />
          <span style={{ marginTop: 8, color: '#4b5563' }}>데이터를 불러오는 중...</span>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="커스텀 요청 정보">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0' }}>
          <div style={{ color: '#dc2626', marginBottom: 8 }}>{error}</div>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer' }}>다시 시도</button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="커스텀 요청 정보">
      <DataTable columns={columns} data={paginatedData} onRowAction={handleRowAction} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
} 