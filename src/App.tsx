import { useState, useMemo } from 'react';
import { useNotes } from './hooks/useNotes';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';
import { EmptyState } from './components/EmptyState';
import { SearchBar } from './components/SearchBar';

type ViewTab = 'notes' | 'archive' | 'profile';

const bottomNavTabs: Array<{ id: ViewTab; label: string; icon: string }> = [
  { id: 'notes', label: 'Notlar', icon: 'description' },
  { id: 'archive', label: 'Arşiv', icon: 'archive' },
  { id: 'profile', label: 'Profil', icon: 'person' },
];

function BottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
}) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 w-full z-50 rounded-t-2xl border-t"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'color-mix(in srgb, var(--color-outline-variant) 20%, transparent)',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.5)',
      }}
      aria-label="Alt navigasyon"
    >
      <div className="flex justify-around items-center px-4 pb-5 pt-3">
        {bottomNavTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-all duration-200 cursor-pointer active:scale-90 ${
                isActive ? 'bg-primary-container/10' : 'hover:text-primary'
              }`}
              style={{
                color: isActive
                  ? 'var(--color-primary)'
                  : 'color-mix(in srgb, var(--color-on-surface) 40%, transparent)',
              }}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              data-testid={`bottom-nav-${tab.id}`}
            >
              <span
                className="material-symbols-outlined mb-1"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] font-semibold tracking-wide uppercase font-label">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function archiveEmptyState(message: string) {
  return (
    <section className="flex flex-col items-center text-center space-y-6 p-8 rounded-3xl" style={{
      backgroundColor: 'color-mix(in srgb, var(--color-surface-container-lowest) 50%, transparent)',
      backdropFilter: 'blur(4px)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      border: '1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)',
    }}>
      <div className="relative flex items-center justify-center w-28 h-28">
        <div className="absolute inset-0 rounded-full flex items-center justify-center border" style={{
          backgroundColor: 'var(--color-surface-container)',
          borderColor: 'color-mix(in srgb, var(--color-outline-variant) 20%, transparent)',
        }}>
          <span className="material-symbols-outlined text-[56px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200", color: 'color-mix(in srgb, var(--color-outline) 50%, transparent)' }}>archive</span>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight" style={{ color: 'var(--color-on-surface)' }}>{message}</h2>
      </div>
    </section>
  );
}

function searchEmptyState(query: string, onClear: () => void) {
  return (
    <section className="flex flex-col items-center text-center space-y-8 p-8 rounded-[24px]" style={{
      backgroundColor: 'color-mix(in srgb, var(--color-surface-container-lowest) 50%, transparent)',
      backdropFilter: 'blur(4px)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      border: '1px solid color-mix(in srgb, var(--color-outline-variant) 10%, transparent)',
    }}>
      <div className="relative flex items-center justify-center w-32 h-32 mb-4">
        <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)' }}></div>
        <div className="absolute inset-0 rounded-full flex items-center justify-center border shadow-inner" style={{
          backgroundColor: 'var(--color-surface-container)',
          borderColor: 'color-mix(in srgb, var(--color-outline-variant) 20%, transparent)',
        }}>
          <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200", color: 'color-mix(in srgb, var(--color-outline) 50%, transparent)' }}>search_off</span>
        </div>
        <div className="absolute -top-2 -right-2 p-2 rounded-full border shadow-lg" style={{
          backgroundColor: 'var(--color-surface-container-high)',
          borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)',
        }}>
          <span className="material-symbols-outlined text-sm" style={{ color: 'var(--color-secondary)' }}>description</span>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight" style={{ color: 'var(--color-on-surface)' }}>Sonuç bulunamadı.</h2>
        <p className="text-lg max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
          "<span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{query}</span>" için eşleşen bir sonuç bulamadık.
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 mt-8 pt-8" style={{ borderTop: '1px solid var(--color-surface-container-high)' }}>
        <button
          onClick={onClear}
          data-testid="clear-search-button"
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold active:scale-[0.98] transition-transform duration-200 cursor-pointer"
          style={{
            backgroundColor: 'var(--color-primary-container)',
            color: 'var(--color-on-primary-container)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
          }}
        >
          <span className="material-symbols-outlined text-sm">clear_all</span>
          Aramayı Temizle
        </button>
        <p className="text-sm mt-2" style={{ color: 'var(--color-outline)' }}>veya farklı kelimelerle tekrar deneyin</p>
      </div>
    </section>
  );
}

export default function App() {
  const { notes, completedCount, addNote, deleteNote, toggleNote, error, clearError } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<ViewTab>('notes');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Fix #1: activeCount derived from notes.length - completedCount (no extra filter)
  const activeCount = notes.length - completedCount;

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const query = searchQuery.toLocaleLowerCase('tr-TR').trim();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  const archiveNotes = useMemo(
    () => notes.filter((note) => note.status === 'completed'),
    [notes]
  );

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  const hasNotes = notes.length > 0;
  const hasSearchResults = filteredNotes.length > 0;
  const isSearching = searchQuery.trim().length > 0;

  // Fix #4: Extract view content to separate components
  const renderNotesView = () => (
    <>
      {showMobileSearch && (
        <div className="md:hidden w-full">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={handleClearSearch}
            placeholder="Notlarda ara..."
            variant="mobile"
          />
        </div>
      )}
      <NoteForm onAddNote={addNote} />
      {!hasNotes ? (
        <EmptyState />
      ) : !hasSearchResults && isSearching ? (
        searchEmptyState(searchQuery, handleClearSearch)
      ) : (
        renderNotesList(filteredNotes)
      )}
    </>
  );

  const renderArchiveView = () => (
    <>
      {showMobileSearch && (
        <div className="md:hidden w-full">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={handleClearSearch}
            placeholder="Arşivde ara..."
            variant="mobile"
          />
        </div>
      )}
      {/* Fix #3: Reuse EmptyState for archive empty state */}
      {archiveNotes.length === 0 ? (
        <EmptyState icon="archive" title="Henüz arşivlenmiş not yok."  />
      ) : (
        renderNotesList(archiveNotes)
      )}
    </>
  );

  // Fix #5: Extract completionRate to avoid recalculation
  const completionRate = notes.length > 0 ? (completedCount / notes.length) * 100 : 0;

  const renderProfileView = () => (
    <section className="max-w-2xl mx-auto space-y-8 pb-12">
      <h2 className="text-[1.75rem] font-semibold font-headline tracking-tight" style={{ color: 'var(--color-on-surface)' }}>
        Profil
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl p-6 text-center border" style={{
          backgroundColor: 'var(--color-surface-container)',
          borderColor: 'color-mix(in srgb, var(--color-outline-variant) 15%, transparent)',
        }}>
          <span className="material-symbols-outlined text-[40px] mb-2" style={{ color: 'var(--color-primary)' }}>description</span>
          <div className="text-3xl font-bold font-headline" style={{ color: 'var(--color-on-surface)' }}>{notes.length}</div>
          <div className="text-sm font-medium mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>Toplam Not</div>
        </div>
        <div className="rounded-2xl p-6 text-center border" style={{
          backgroundColor: 'var(--color-surface-container)',
          borderColor: 'color-mix(in srgb, var(--color-outline-variant) 15%, transparent)',
        }}>
          <span className="material-symbols-outlined text-[40px] mb-2" style={{ color: 'var(--color-secondary)' }}>radio_button_unchecked</span>
          <div className="text-3xl font-bold font-headline" style={{ color: 'var(--color-on-surface)' }}>{activeCount}</div>
          <div className="text-sm font-medium mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>Aktif</div>
        </div>
        <div className="rounded-2xl p-6 text-center border" style={{
          backgroundColor: 'var(--color-surface-container)',
          borderColor: 'color-mix(in srgb, var(--color-outline-variant) 15%, transparent)',
        }}>
          <span className="material-symbols-outlined text-[40px] mb-2" style={{ color: 'var(--color-tertiary)' }}>check_circle</span>
          <div className="text-3xl font-bold font-headline" style={{ color: 'var(--color-on-surface)' }}>{completedCount}</div>
          <div className="text-sm font-medium mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>Tamamlanan</div>
        </div>
      </div>
      {notes.length > 0 && (
        <div className="rounded-2xl p-6 border" style={{
          backgroundColor: 'var(--color-surface-container)',
          borderColor: 'color-mix(in srgb, var(--color-outline-variant) 15%, transparent)',
        }}>
          <h3 className="text-lg font-semibold mb-4 font-headline" style={{ color: 'var(--color-on-surface)' }}>Tamamlanma Oranı</h3>
          <div className="w-full h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-surface-container-high)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                // Fix #5: Use pre-computed completionRate constant
                width: `${completionRate}%`,
                backgroundColor: 'var(--color-primary-container)',
              }}
            />
          </div>
          <p className="text-sm mt-3" style={{ color: 'var(--color-on-surface-variant)' }}>
            {notes.length > 0 ? `${Math.round(completionRate)}% tamamlandı` : 'Henüz not yok.'}
          </p>
        </div>
      )}
    </section>
  );

  // Fix #4: Simplified renderContent - delegates to view components
  const renderContent = () => {
    switch (currentView) {
      case 'notes': return renderNotesView();
      case 'archive': return renderArchiveView();
      case 'profile': return renderProfileView();
    }
  };

  const renderNotesList = (noteList: typeof notes) => {
    if (noteList.length === 0) {
      return <EmptyState />;
    }
    return (
      <section className="pb-12">
        <h2
          className="text-[1.75rem] font-semibold mb-8 font-headline tracking-tight"
          style={{ color: 'var(--color-on-surface)' }}
        >
          {currentView === 'archive' ? 'Arşivlenen Notlar' : 'Son Notlar'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noteList.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onToggle={toggleNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-on-surface)' }}>
      <header
        className="fixed top-0 w-full z-50 border-b"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
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
              className="md:hidden rounded-full p-2 cursor-pointer active:scale-[0.97] transition-all duration-200"
              style={{ transition: 'background-color 200ms ease' }}
              onClick={toggleMobileSearch}
              aria-label="Ara"
              data-testid="mobile-search-toggle"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
            </button>
            <button
              className="rounded-full p-2 cursor-pointer active:scale-[0.97] transition-all duration-200"
              style={{ transition: 'background-color 200ms ease' }}
              aria-label="Ayarlar"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
            </button>
            <button
              className="rounded-full p-2 cursor-pointer active:scale-[0.97] transition-all duration-200"
              style={{ transition: 'background-color 200ms ease' }}
              aria-label="Hesap"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-28 space-y-12 pb-24 md:pb-12">
        {error && (
          <section
            className="w-full rounded-2xl p-6 text-center border"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-error-container) 30%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-error) 20%, transparent)',
            }}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="material-symbols-outlined" style={{ color: 'var(--color-error)' }}>error</span>
              <h2 className="text-lg font-semibold font-headline" style={{ color: 'var(--color-on-error-container)' }}>
                {error.code === 'storage_full' ? 'Depolama Alanı Doldu' : 'Bir Sorun Oluştu'}
              </h2>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--color-on-surface-variant)' }}>
              {error.message}
            </p>
            <button
              onClick={clearError}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer active:scale-[0.98] transition-transform duration-200"
              style={{
                backgroundColor: 'var(--color-primary-container)',
                color: 'var(--color-on-primary-container)',
              }}
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Kapat
            </button>
          </section>
        )}
        {renderContent()}
      </main>

      <BottomNav activeTab={currentView} onTabChange={setCurrentView} />
    </div>
  );
}
