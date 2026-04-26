import { useCallback } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  variant?: 'desktop' | 'mobile';
}

export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Notlarda ara...',
  variant = 'desktop',
}: SearchBarProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onClear();
  }, [onClear]);

  const isMobile = variant === 'mobile';

  return (
    <div className={`relative w-full ${isMobile ? 'shadow-[0_10px_30px_rgba(0,0,0,0.3)]' : ''}`}>
      <div
        className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${
          isMobile ? 'pl-4' : 'pl-3'
        }`}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontVariationSettings: "'FILL' 0",
            color: 'var(--color-outline)',
          }}
        >
          search
        </span>
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Notlarda ara"
        data-testid={`search-input-${variant}`}
        className={`block w-full border-none text-on-surface placeholder-on-surface-variant focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200 ${
          isMobile
            ? 'pl-12 pr-12 py-4 rounded-2xl bg-surface-container-high text-lg'
            : 'pl-10 pr-10 py-2 rounded-xl bg-surface-container-high'
        }`}
        style={{
          backgroundColor: 'var(--color-surface-container-high)',
          color: 'var(--color-on-surface)',
        }}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Aramayı temizle"
          className={`absolute inset-y-0 right-0 flex items-center ${
            isMobile ? 'pr-4' : 'pr-3'
          }`}
          style={{
            color: 'var(--color-outline)',
            transition: 'color 200ms ease, transform 150ms ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-on-surface)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-outline)';
          }}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
    </div>
  );
}
