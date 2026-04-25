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

    if (validate()) {
      onAddNote(title.trim(), content.trim());
      setTitle('');
      setContent('');
      setErrors({});
    }
  }, [title, content, validate, onAddNote]);

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-[1.75rem] font-semibold text-on-surface mb-6 font-headline tracking-tight">
        Yeni Not Ekle
      </h2>
      <div className="bg-surface-container rounded-2xl p-4 md:p-6 shadow-sm border border-outline-variant/15 backdrop-blur-sm">
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              className={`w-full bg-transparent text-on-surface text-[1rem] font-semibold placeholder-on-surface-variant border-none focus:ring-0 px-4 py-3 outline-none transition-colors ${
                errors.title ? 'placeholder-error' : ''
              }`}
              placeholder="Başlık"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              aria-label="Not başlığı"
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-error text-sm mt-1 px-4">{errors.title}</p>
            )}
          </div>
          <div className="relative">
            <textarea
              className={`w-full bg-surface-container-lowest text-on-surface placeholder-on-surface-variant border-none rounded-xl focus:ring-1 focus:ring-primary/50 px-4 py-4 resize-none outline-none text-body-lg transition-all ${
                errors.content ? 'placeholder-error' : ''
              }`}
              placeholder="Açıklama"
              rows={4}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
              }}
              aria-label="Not içeriği"
              aria-invalid={!!errors.content}
            />
            {errors.content && (
              <p className="text-error text-sm mt-1 px-4">{errors.content}</p>
            )}
          </div>
          <div className="flex justify-end pt-2">
            <button
              className="bg-primary-container text-on-primary-container hover:bg-primary-container/90 active:scale-[0.98] transition-all duration-200 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm shadow-primary/10"
              type="submit"
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                add
              </span>
              Ekle
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
