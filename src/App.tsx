import { useNotes } from './hooks/useNotes';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';
import { EmptyState } from './components/EmptyState';

export default function App() {
  const { notes, addNote, deleteNote, toggleNote } = useNotes();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-on-surface)' }}>
      <header
        className="fixed top-0 w-full z-50 border-b"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
          backdropFilter: 'blur(12px)',
          borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <h1
            className="text-2xl font-bold tracking-tighter font-headline"
            style={{ color: 'var(--color-primary)' }}
          >
            smoke-notlar
          </h1>
          <div className="flex items-center gap-4" style={{ color: 'var(--color-primary-fixed-dim)' }}>
            <button
              className="rounded-full p-2"
              style={{ transition: 'background-color 200ms ease' }}
              aria-label="Ayarlar"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
            </button>
            <button
              className="rounded-full p-2"
              style={{ transition: 'background-color 200ms ease' }}
              aria-label="Hesap"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-28 space-y-12 pb-24">
        <NoteForm onAddNote={addNote} />

        {notes.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="pb-12">
            <h2
              className="text-[1.75rem] font-semibold mb-8 font-headline tracking-tight"
              style={{ color: 'var(--color-on-surface)' }}
            >
              Son Notlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onToggle={toggleNote}
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
