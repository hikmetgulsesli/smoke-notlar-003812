import { useNotes } from './hooks/useNotes';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';
import { EmptyState } from './components/EmptyState';

export default function App() {
  const { notes, addNote, deleteNote, toggleNote } = useNotes();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--on-surface)]">
      <header className="bg-[#0b1326]/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#2d3449]/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tighter text-[#2563EB] font-headline">smoke-notlar</h1>
          <div className="flex items-center gap-4 text-[#b4c5ff]">
            <button className="hover:bg-[#171f33] transition-all duration-300 rounded-full p-2 active:scale-[0.97]" aria-label="Ayarlar">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>settings</span>
            </button>
            <button className="hover:bg-[#171f33] transition-all duration-300 rounded-full p-2 active:scale-[0.97]" aria-label="Hesap">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>account_circle</span>
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
            <h2 className="text-[1.75rem] font-semibold text-[var(--on-surface)] mb-8 font-headline tracking-tight">Son Notlar</h2>
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
