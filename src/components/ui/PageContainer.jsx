import styles from "@/assets/css/PageContainer.module.css";

/**
 * 페이지 컨테이너 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 페이지 타이틀
 * @param {React.ReactNode} props.children - 컨텐츠
 * @returns {JSX.Element}
 */
export default function PageContainer({ title, children }) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageCard}>
        <h2 className={styles.pageTitle}>{title}</h2>
        <div className={styles.pageContent}>{children}</div>
      </div>
    </div>
  );
}