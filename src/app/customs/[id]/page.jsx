"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { customsAPI } from "@/lib/api";
import styles from "@/assets/css/UserDetailPage.module.css";
import StatusButton from "@/components/ui/StatusButton";

// 날짜 포맷
function formatDate(dateStr, locale = 'ko') {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return locale === 'ko'
    ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
    : date.toISOString().slice(0, 10);
}

const genderLabel = { M: '남', F: '여' };
const customStatusLabel = {
  PENDING: "대기",
  IN_PROGRESS: "진행중",
  COMPLETED: "완료",
  HOLD: "보류",
  CANCELED: "취소",
};

export default function CustomDetailPage() {
  const { id } = useParams();
  const [custom, setCustom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustom() {
      setLoading(true);
      try {
        const customData = await customsAPI.getCustom(id);
        setCustom(customData);
      } finally {
        setLoading(false);
      }
    }
    fetchCustom();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!custom) return <div>커스텀 요청 정보를 불러올 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>커스텀 요청 정보</h2>
        <div className={styles.infoRow}><span>반려견ID</span><span>{custom.id}</span></div>
        <div className={styles.infoRow}><span>반려견 이름</span><span>{custom.dogName}</span></div>
        <div className={styles.infoRow}><span>반려견 생일</span><span>{formatDate(custom.dogBirth)}</span></div>
        <div className={styles.infoRow}><span>반려견 성별</span><span>{genderLabel[custom.dogGender]}</span></div>
        <div className={styles.infoRow}><span>반려견 성격</span><span>{custom.personalities?.join(', ')}</span></div>
        <div className={styles.infoRow}>
          <span>상태</span>
          <span>
            <StatusButton label={customStatusLabel[custom.status]} type="customStatus" status={custom.status} />
          </span>
        </div>
        <div className={styles.infoRow}><span>담당자</span><span>{custom.adminNickname}</span></div>
        <div className={styles.infoRow}><span>요청일</span><span>{formatDate(custom.createdAt, 'en')}</span></div>
        <div className={styles.infoRow}><span>작업 시작일</span><span>{custom.startedAt ? formatDate(custom.startedAt, 'en') : '-'}</span></div>
        <div className={styles.infoRow}><span>보류일</span><span>{custom.holdCreatedAt ? formatDate(custom.holdCreatedAt, 'en') : '-'}</span></div>
        <div className={styles.infoRow}><span>보류 사유</span><span>{custom.holdReason}</span></div>
        <div className={styles.infoRow}><span>취소일</span><span>{custom.canceledAt ? formatDate(custom.canceledAt, 'en') : '-'}</span></div>
      </div>
      <div className={styles.card}>
        <div className={styles.imageSectionTitle}>렌더링 요청 이미지</div>
        <div className={styles.imageListRow}>
          {Array.isArray(custom.dogImages) && custom.dogImages.length > 0 ? (
            custom.dogImages.map((url, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <img
                  src={url}
                  alt={`dog-rendered-${idx + 1}`}
                  style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }}
                />
              </a>
            ))
          ) : (
            <div>-</div>
          )}
        </div>
      </div>
    </div>
  );
}
