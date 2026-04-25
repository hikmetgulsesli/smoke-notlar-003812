import { useNotes } from './hooks/useNotes';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { EmptyState } from './components/EmptyState';

export default function App() {
  const { notes, addNote, toggleNoteStatus, deleteNote } = useNotes();

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* TopAppBar */}
      <header className="bg-[#0b1326]/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#2d3449]/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tighter text-[#2563EB] font-headline">
            smoke-notlar
          </h1>
          <div className="flex items-center gap-4 text-[#b4c5ff]">
            <button
              className="hover:bg-[#171f33] transition-all duration-300 rounded-full p-2 active:scale-[0.97]"
              aria-label="Ayarlar"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                settings
              </span>
            </button>
            <button
              className="hover:bg-[#171f33] transition-all duration-300 rounded-full p-2 active:scale-[0.97]"
              aria-label="Hesap"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                account_circle
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-28 space-y-12 pb-24">
        <NoteForm onAddNote={addNote} />

        {notes.length > 0 ? (
          <NoteList
            notes={notes}
            onToggle={toggleNoteStatus}
            onDelete={deleteNote}
          />
        ) : (
          <EmptyState />
        )}
      </main>

      {/* BottomNavBar */}
      <nav className="md:hidden bg-[#0b1326]/90 backdrop-blur-lg fixed bottom-0 w-full z-50 rounded-t-2xl border-t border-[#2d3449]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3">
          <a
            className="flex flex-col items-center justify-center bg-[#2563eb]/10 text-[#b4c5ff] rounded-xl px-4 py-1 active:scale-90 transition-transform duration-200"
            href="#"
          >
            <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
              description
            </span>
            <span className="text-[11px] font-semibold tracking-wide uppercase font-label">Notlar</span>
          </a>
          <a
            className="flex flex-col items-center justify-center text-[#dae2fd]/40 hover:text-[#b4c5ff] transition-colors active:scale-90 duration-200 px-4 py-1"
            href="#"
          >
            <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>
              archive
            </span>
            <span className="text-[11px] font-semibold tracking-wide uppercase font-label">Arşiv</span>
          </a>
          <a
            className="flex flex-col items-center justify-center text-[#dae2fd]/40 hover:text-[#b4c5ff] transition-colors active:scale-90 duration-200 px-4 py-1"
            href="#"
          >
            <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>
              person
            </span>
            <span className="text-[11px] font-semibold tracking-wide uppercase font-label">Profil</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
