import styles from './EmptyState.module.css';

export function EmptyState() {
  return (
    <section className={styles.container} data-testid="empty-state">
      <div className={styles.iconCircle}>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '80px', fontVariationSettings: "'FILL' 0, 'wght' 200" }}
        >
          description
        </span>
      </div>
      <h2 className={styles.title}>Henüz not eklemediniz.</h2>
      <p className={styles.description}>
        Yukarıdaki formu kullanarak ilk notunuzu hemen ekleyin.
      </p>
    </section>
  );
}
