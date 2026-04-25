import { useState, useCallback } from 'react';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return 'Az önce';
  if (diffMin < 60) return `${diffMin} Dakika Önce`;
  if (diffHour < 24) return `${diffHour} Saat Önce`;
  if (diffDay < 30) return `${diffDay} Gün Önce`;
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
}

export function NoteCard({ note, onToggle, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = useCallback(() => {
    setIsDeleting(true);
    // Wait for animation to complete before actually deleting
    setTimeout(() => {
      onDelete(note.id);
    }, 300);
  }, [note.id, onDelete]);

  const handleToggle = useCallback(() => {
    onToggle(note.id);
  }, [note.id, onToggle]);

  const isCompleted = note.status === 'completed';

  return (
    <article
      className={`bg-surface-container rounded-2xl p-6 hover:bg-surface-container-high transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col h-full border border-transparent hover:border-outline-variant/15 ${
        isDeleting ? 'animate-card-delete' : 'animate-card-enter'
      } ${isCompleted ? 'opacity-60' : ''}`}
    >
      {/* Left accent bar */}
      <div
        className={`absolute top-0 left-0 w-1 h-full transition-colors duration-300 ${
          isCompleted ? 'bg-tertiary-container/30' : 'bg-primary/20 group-hover:bg-primary/50'
        }`}
      ></div>

      <div className="flex justify-between items-start mb-4 pl-2">
        <h3
          className={`text-[1rem] font-semibold font-headline transition-all duration-300 ${
            isCompleted ? 'text-on-surface-variant line-through' : 'text-on-surface'
          }`}
        >
          {note.title}
        </h3>

        {/* Actions menu */}
        <div className="relative">
          <button
            className="text-on-surface-variant hover:text-on-surface opacity-0 group-hover:opacity-100 transition-opacity p-1 -mr-2 -mt-2 rounded-full hover:bg-surface-container-high"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            aria-label="Not seçenekleri"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              more_vert
            </span>
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 top-8 z-20 bg-surface-container-high rounded-xl shadow-lg border border-outline-variant/20 py-1 min-w-[140px] animate-fade-in">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container flex items-center gap-2 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle();
                    setShowMenu(false);
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                    {isCompleted ? 'radio_button_unchecked' : 'check_circle'}
                  </span>
                  {isCompleted ? 'Aktif Yap' : 'Tamamla'}
                </button>
                <div className="mx-2 h-px bg-outline-variant/20"></div>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-container/10 flex items-center gap-2 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                    setShowMenu(false);
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                    delete
                  </span>
                  Sil
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <p
        className={`text-lg mb-6 flex-grow pl-2 line-clamp-3 transition-all duration-300 ${
          isCompleted ? 'text-on-surface-variant/70 line-through' : 'text-on-surface-variant'
        }`}
      >
        {note.content}
      </p>

      <div className="flex items-center justify-between mt-auto pl-2">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[14px] text-on-surface-variant"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            schedule
          </span>
          <span className="text-[0.75rem] font-semibold text-on-surface-variant font-label tracking-wide">
            {formatRelativeTime(note.createdAt)}
          </span>
        </div>

        {/* Toggle button */}
        <button
          className="flex items-center gap-1 text-sm font-medium transition-all duration-200 rounded-lg px-2 py-1 hover:bg-surface-container-high"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          aria-label={isCompleted ? 'Notu aktif yap' : 'Notu tamamla'}
        >
          <span
            className={`material-symbols-outlined text-xl transition-all duration-300 ${
              isCompleted ? 'text-tertiary-container' : 'text-outline hover:text-primary'
            }`}
            style={{ fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0" }}
          >
            {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
          </span>
        </button>
      </div>
    </article>
  );
}
