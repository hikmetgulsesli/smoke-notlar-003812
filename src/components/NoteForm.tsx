import { useState, useCallback, FormEvent } from 'react';

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
    <section className="max-w-3xl mx-auto">
      <h2 className="text-[1.75rem] font-semibold text-[var(--on-surface)] mb-6 font-headline tracking-tight">Yeni Not Ekle</h2>
      <div className="bg-[var(--surface-container)] rounded-2xl p-4 md:p-6 shadow-sm border border-[var(--outline-variant)]/15 backdrop-blur-sm">
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              className={`w-full bg-transparent text-[var(--on-surface)] text-[1rem] font-semibold placeholder-[var(--on-surface-variant)] border-none focus:ring-0 px-4 py-3 outline-none transition-colors ${
                errors.title ? 'placeholder-[var(--error)]' : ''
              }`}
              placeholder="Başlık"
              type="text"
              value={title}
              onChange={handleTitleChange}
              aria-label="Not başlığı"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <p id="title-error" className="text-[var(--error)] text-sm px-4 pt-1" role="alert">
                {errors.title}
              </p>
            )}
          </div>
          <div className="relative">
            <textarea
              className={`w-full bg-[var(--surface-container-lowest)] text-[var(--on-surface)] placeholder-[var(--on-surface-variant)] border-none rounded-xl focus:ring-1 focus:ring-[var(--primary)]/50 px-4 py-4 resize-none outline-none text-lg transition-all ${
                errors.content ? 'ring-1 ring-[var(--error)]/50' : ''
              }`}
              placeholder="Açıklama"
              rows={4}
              value={content}
              onChange={handleContentChange}
              aria-label="Not içeriği"
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? 'content-error' : undefined}
            />
            {errors.content && (
              <p id="content-error" className="text-[var(--error)] text-sm px-4 pt-1" role="alert">
                {errors.content}
              </p>
            )}
          </div>
          <div className="flex justify-end pt-2">
            <button
              className="bg-[var(--primary-container)] text-[var(--on-primary-container)] hover:bg-[var(--primary-container)]/90 active:scale-[0.98] transition-all duration-200 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm shadow-[var(--primary)]/10 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
              aria-label="Not ekle"
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              Ekle
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
