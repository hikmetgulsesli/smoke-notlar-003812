import { useNotes } from './hooks/useNotes';
import { NoteCard } from './components/NoteCard';
import './styles/global.css';

export default function App() {
  const { notes, toggleStatus, deleteNote } = useNotes();

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface)]">
      <header className="bg-[var(--color-surface)]/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[var(--color-outline-variant)]/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tighter text-[var(--color-primary-container)] font-headline">smoke-notlar</h1>
          <div className="flex items-center gap-4 text-[var(--color-primary)]">
            <button className="hover:bg-[var(--color-surface-container)] transition-all duration-300 rounded-full p-2 active:scale-[0.97]" aria-label="Ayarlar">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>settings</span>
            </button>
            <button className="hover:bg-[var(--color-surface-container)] transition-all duration-300 rounded-full p-2 active:scale-[0.97]" aria-label="Hesap">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-28 space-y-12 pb-24">
        {notes.length > 0 && (
          <section className="pb-12">
            <h2 className="text-[1.75rem] font-semibold text-[var(--color-on-surface)] mb-8 font-headline tracking-tight">Notlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onToggle={toggleStatus}
                  onDelete={deleteNote}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
