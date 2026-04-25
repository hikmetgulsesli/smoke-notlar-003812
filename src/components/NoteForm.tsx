import { useState, useCallback, FormEvent } from 'react';
import styles from './NoteForm.module.css';

interface NoteFormProps {
  onAddNote: (title: string, content: string) => void;
}

interface FormErrors {
  title?: string;
  content?: string;
}

export function NoteForm({ onAddNote }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Başlık gereklidir';
    } else if (title.trim().length < 2) {
      newErrors.title = 'Başlık en az 2 karakter olmalıdır';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Başlık en fazla 100 karakter olabilir';
    }

    if (!content.trim()) {
      newErrors.content = 'İçerik gereklidir';
    } else if (content.trim().length < 3) {
      newErrors.content = 'İçerik en az 3 karakter olmalıdır';
    } else if (content.trim().length > 2000) {
      newErrors.content = 'İçerik en fazla 2000 karakter olabilir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, content]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      onAddNote(title.trim(), content.trim());
      setTitle('');
      setContent('');
      setErrors({});
    }

    setIsSubmitting(false);
  }, [title, content, validate, onAddNote]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  }, [errors.title]);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: undefined }));
    }
  }, [errors.content]);

  return (
    <section className={styles.formSection}>
      <h2 className={styles.formHeading}>Yeni Not Ekle</h2>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.titleInput} ${errors.title ? styles.titleInputError : ''}`}
              placeholder="Başlık"
              type="text"
              value={title}
              onChange={handleTitleChange}
              aria-label="Not başlığı"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <p id="title-error" className={styles.errorText} role="alert">
                {errors.title}
              </p>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <textarea
              className={`${styles.contentTextarea} ${errors.content ? styles.contentTextareaError : ''}`}
              placeholder="Açıklama"
              rows={4}
              value={content}
              onChange={handleContentChange}
              aria-label="Not içeriği"
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? 'content-error' : undefined}
            />
            {errors.content && (
              <p id="content-error" className={styles.errorText} role="alert">
                {errors.content}
              </p>
            )}
          </div>
          <div className={styles.submitRow}>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={isSubmitting}
              aria-label="Not ekle"
            >
              <span className={`material-symbols-outlined ${styles.buttonIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              Ekle
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
