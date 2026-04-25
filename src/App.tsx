import { useNotes } from './hooks/useNotes';
import { NoteForm } from './components/NoteForm';

export default function App() {
  const { notes, addNote } = useNotes();

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

        {notes.length > 0 && (
          <section className="pb-12">
            <h2 className="text-[1.75rem] font-semibold text-[var(--on-surface)] mb-8 font-headline tracking-tight">Son Notlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <article key={note.id} className="bg-[var(--surface-container)] rounded-2xl p-6 hover:bg-[var(--surface-container-high)] transition-colors duration-300 group cursor-pointer relative overflow-hidden flex flex-col h-full border border-transparent hover:border-[var(--outline-variant)]/15">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary)]/20 group-hover:bg-[var(--primary)]/50 transition-colors"></div>
                  <div className="flex justify-between items-start mb-4 pl-2">
                    <h3 className="text-[1rem] font-semibold text-[var(--on-surface)] font-headline">{note.title}</h3>
                  </div>
                  <p className="text-lg text-[var(--on-surface-variant)] mb-6 flex-grow pl-2 line-clamp-3">
                    {note.content}
                  </p>
                  <div className="flex items-center gap-2 mt-auto pl-2">
                    <span className="material-symbols-outlined text-[14px] text-[var(--on-surface-variant)]" style={{fontVariationSettings: "'FILL' 0"}}>schedule</span>
                    <span className="text-[0.75rem] font-semibold text-[var(--on-surface-variant)] font-label tracking-wide">
                      {new Date(note.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
