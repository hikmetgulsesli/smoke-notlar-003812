import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
}

export function EmptyState({ icon = 'description', title, description }: EmptyStateProps = {}) {
  return (
    <section className={styles.container} data-testid="empty-state">
      <div className={styles.iconCircle}>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '80px', fontVariationSettings: "'FILL' 0, 'wght' 200" }}
        >
          {icon}
        </span>
      </div>
      <h2 className={styles.title}>{title ?? 'Henüz not eklemediniz.'}</h2>
      {/* Always render description, falling back to default message if not provided */}
      <p className={styles.description}>
        {description ?? 'Yukarıdaki formu kullanarak ilk notunuzu hemen ekleyin.'}
      </p>
    </section>
  );
}
