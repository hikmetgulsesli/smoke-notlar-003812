interface EmptyStateProps {
  onAddClick?: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <section className="flex flex-col items-center justify-center flex-grow py-12 text-center opacity-90 animate-fade-in">
      {/* Floating Tonal Circle */}
      <div className="w-40 h-40 mb-10 rounded-full bg-surface-container flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.05)] relative">
        <div className="absolute inset-0 rounded-full border border-primary/10 scale-[1.15]"></div>
        <div className="absolute inset-0 rounded-full border border-primary/5 scale-[1.3]"></div>
        <span
          className="material-symbols-outlined text-[80px] text-primary-container/50"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
        >
          description
        </span>
      </div>
      <h2 className="text-3xl font-display font-bold text-on-surface mb-4 tracking-tight">
        Henüz not eklemediniz.
      </h2>
      <p className="text-on-surface-variant/80 text-lg font-body max-w-md leading-relaxed">
        Yukarıdaki formu kullanarak ilk notunuzu hemen ekleyin.
      </p>
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="mt-6 bg-primary-container text-on-primary-container px-6 py-3 rounded-xl font-semibold hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            add
          </span>
          İlk Notu Ekle
        </button>
      )}
    </section>
  );
}
