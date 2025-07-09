import styles from "@/assets/css/StatusButton.module.css";

export default function StatusButton({ label, type, status }) {
  const classMap = {
    role: {
      USER: styles.roleUser,
      ADMIN: styles.roleAdmin,
    },
    userStatus: {
      ACTIVE: styles.userStatusActive,
      SUSPENDED: styles.userStatusSuspended,
      WITHDRAWN: styles.userStatusWithdrawn,
    },
    dogStatus: {
      REGISTERED: styles.dogStatusRegistered,
      APPROVED: styles.dogStatusApproved,
      SUSPENDED: styles.dogStatusSuspended,
      REMOVED: styles.dogStatusRemoved,
    }
  };

  const buttonClass = classMap[type]?.[status] || styles.defaultButton;

  return (
    <button className={`${styles.defaultButton} ${styles.roleUser}`}>{label}</button>
  );
}
