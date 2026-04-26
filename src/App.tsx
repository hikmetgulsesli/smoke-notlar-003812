import { useState, useMemo } from 'react';
import { useNotes } from './hooks/useNotes';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';
import { EmptyState } from './components/EmptyState';
import { SearchBar } from './components/SearchBar';
import { AramaSonucYok } from './screens/AramaSonucYok';

export default function App() {
  const { notes, addNote, deleteNote, toggleNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const query = searchQuery.toLowerCase().trim();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const hasNotes = notes.length > 0;
  const hasSearchResults = filteredNotes.length > 0;
  const isSearching = searchQuery.trim().length > 0;

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
          <div className="flex items-center gap-4">
            <h1
              className="text-2xl font-bold tracking-tighter font-headline"
              style={{ color: 'var(--color-primary)' }}
            >
              smoke-notlar
            </h1>
          </div>
          <div className="flex-1 max-w-xl mx-4 relative hidden md:block">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={handleClearSearch}
              placeholder="Notlarda ara..."
              variant="desktop"
            />
          </div>
          <div className="flex items-center gap-2" style={{ color: 'var(--color-primary-fixed-dim)' }}>
            <button
              className="rounded-full p-2 md:hidden"
              style={{ transition: 'background-color 200ms ease' }}
              aria-label="Ara"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
            </button>
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
        {/* Mobile Search Bar */}
        <div className="md:hidden w-full">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={handleClearSearch}
            placeholder="Notlarda ara..."
            variant="mobile"
          />
        </div>

        <NoteForm onAddNote={addNote} />

        {!hasNotes ? (
          <EmptyState />
        ) : !hasSearchResults && isSearching ? (
          <AramaSonucYok query={searchQuery} onClear={handleClearSearch} />
        ) : (
          <section className="pb-12">
            <h2
              className="text-[1.75rem] font-semibold mb-8 font-headline tracking-tight"
              style={{ color: 'var(--color-on-surface)' }}
            >
              Son Notlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
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
