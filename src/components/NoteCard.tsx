import { useCallback, useState } from 'react';
import type { Note } from '../types';
import styles from './NoteCard.module.css';

interface NoteCardProps {
  note: Note;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onToggle, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = useCallback(() => {
    onToggle(note.id);
  }, [note.id, onToggle]);

  const handleDelete = useCallback(() => {
    setIsDeleting(true);
    setTimeout(() => {
      try {
        onDelete(note.id);
      } catch {
        // eslint-disable-next-line no-console
        console.error('Not silinemedi, lütfen tekrar deneyin.');
        setIsDeleting(false);
      }
    }, 200);
  }, [note.id, onDelete]);

  const isCompleted = note.status === 'completed';

  return (
    <article
      className={`${styles.card} ${isCompleted ? styles.completed : ''} ${isDeleting ? styles.deleting : ''}`}
      data-testid="note-card"
      data-note-id={note.id}
      data-status={note.status}
    >
      <div className={styles.cardContent}>
        <div className={styles.leftSection}>
          <button
            type="button"
            className={styles.checkbox}
            onClick={handleToggle}
            aria-label={isCompleted ? 'Notu aktifleştir' : 'Notu tamamla'}
            aria-pressed={isCompleted}
            data-testid="note-toggle"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0" }}
              data-testid="toggle-icon"
            >
              {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
            </span>
          </button>

          <div className={styles.textContent}>
            <h3 className={`${styles.title} ${isCompleted ? styles.titleCompleted : ''}`} data-testid="note-title">
              {note.title}
            </h3>
            <p className={`${styles.body} ${isCompleted ? styles.bodyCompleted : ''}`} data-testid="note-content">
              {note.content}
            </p>
            <span className={styles.date} data-testid="note-date">
              {new Date(note.createdAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
          aria-label="Notu sil"
          data-testid="note-delete"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            delete
          </span>
        </button>
      </div>
    </article>
  );
}
