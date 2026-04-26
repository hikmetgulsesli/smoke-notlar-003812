import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useNotes } from './useNotes';

const STORAGE_KEY = 'setfarm-notlar';

function createNote(overrides?: Partial<{
  id: string;
  title: string;
  content: string;
  status: 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
}>) {
  return {
    id: overrides?.id ?? crypto.randomUUID(),
    title: overrides?.title ?? 'Varsayılan Başlık',
    content: overrides?.content ?? 'Varsayılan içerik',
    status: overrides?.status ?? 'active',
    createdAt: overrides?.createdAt ?? new Date().toISOString(),
    updatedAt: overrides?.updatedAt ?? new Date().toISOString(),
  };
}

describe('useNotes', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // ─── localStorage Senkronizasyonu ───

  it('loads notes from localStorage on init', () => {
    const note = createNote({ title: 'Yüklenecek Not', content: 'İçerik' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([note]));

    const { result } = renderHook(() => useNotes());

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].title).toBe('Yüklenecek Not');
  });

  it('saves notes to localStorage after add', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('Yeni Not', 'Yeni içerik');
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('Yeni Not');
    expect(stored[0].content).toBe('Yeni içerik');
  });

  it('saves notes to localStorage after delete', () => {
    const note = createNote({ id: 'note-1', title: 'Silinecek' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([note]));

    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.deleteNote('note-1');
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    expect(stored).toHaveLength(0);
  });

  it('saves notes to localStorage after toggle', () => {
    const note = createNote({ id: 'note-1', status: 'active' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([note]));

    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.toggleNote('note-1');
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    expect(stored[0].status).toBe('completed');
  });

  // ─── CRUD ───

  it('adds a note with correct fields', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('Başlık', 'İçerik');
    });

    expect(result.current.notes).toHaveLength(1);
    const note = result.current.notes[0];
    expect(note.title).toBe('Başlık');
    expect(note.content).toBe('İçerik');
    expect(note.status).toBe('active');
    expect(typeof note.id).toBe('string');
    expect(typeof note.createdAt).toBe('string');
    expect(typeof note.updatedAt).toBe('string');
  });

  it('trims title and content when adding', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('  Boşluklu Başlık  ', '  Boşluklu İçerik  ');
    });

    expect(result.current.notes[0].title).toBe('Boşluklu Başlık');
    expect(result.current.notes[0].content).toBe('Boşluklu İçerik');
  });

  it('does not add empty notes', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('   ', '   ');
    });

    expect(result.current.notes).toHaveLength(0);
  });

  it('deletes a note by id', () => {
    const note1 = createNote({ id: 'note-1' });
    const note2 = createNote({ id: 'note-2' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([note1, note2]));

    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.deleteNote('note-1');
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].id).toBe('note-2');
  });

  it('toggles note status between active and completed', () => {
    const note = createNote({ id: 'note-1', status: 'active' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([note]));

    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.toggleNote('note-1');
    });

    expect(result.current.notes[0].status).toBe('completed');

    act(() => {
      result.current.toggleNote('note-1');
    });

    expect(result.current.notes[0].status).toBe('active');
  });

  it('updates updatedAt when toggling', () => {
    const note = createNote({ id: 'note-1', updatedAt: '2024-01-01T00:00:00.000Z' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([note]));

    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.toggleNote('note-1');
    });

    expect(result.current.notes[0].updatedAt).not.toBe('2024-01-01T00:00:00.000Z');
  });

  it('completedCount reflects number of completed notes', () => {
    const note1 = createNote({ id: 'note-1', status: 'active' });
    const note2 = createNote({ id: 'note-2', status: 'completed' });
    const note3 = createNote({ id: 'note-3', status: 'completed' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([note1, note2, note3]));

    const { result } = renderHook(() => useNotes());

    expect(result.current.completedCount).toBe(2);
  });

  it('sorts notes by createdAt descending (newest first)', () => {
    const note1 = createNote({ id: 'note-1', title: 'Eski', createdAt: '2024-01-01T10:00:00.000Z' });
    const note2 = createNote({ id: 'note-2', title: 'Yeni', createdAt: '2024-04-26T10:00:00.000Z' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify([note1, note2]));

    const { result } = renderHook(() => useNotes());

    expect(result.current.notes[0].title).toBe('Yeni');
    expect(result.current.notes[1].title).toBe('Eski');
  });

  // ─── Hata Yönetimi ───

  it('returns empty array when localStorage has invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json');

    const { result } = renderHook(() => useNotes());

    expect(result.current.notes).toHaveLength(0);
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.code).toBe('parse_error');
  });

  it('returns empty array and sets error for corrupted note data', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ title: 'Eksik Alanlar' }]));

    const { result } = renderHook(() => useNotes());

    expect(result.current.notes).toHaveLength(0);
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.code).toBe('validation_error');
  });

  it('filters out invalid notes and keeps valid ones', () => {
    const validNote = createNote({ id: 'valid-1', title: 'Geçerli Not' });
    const invalidNote = { title: 'Geçersiz', status: 'active' }; // missing id, content, dates
    localStorage.setItem(STORAGE_KEY, JSON.stringify([validNote, invalidNote]));

    const { result } = renderHook(() => useNotes());

    expect(result.current.notes).toHaveLength(1); // valid note is recovered
    expect(result.current.error).not.toBeNull();
  });

  it('sets storage_full error when localStorage quota exceeded', () => {
    const { result } = renderHook(() => useNotes());

    // Simulate quota exceeded
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = vi.fn(() => {
      const err = new Error('The quota has been exceeded');
      err.name = 'QuotaExceededError';
      throw err;
    });

    act(() => {
      result.current.addNote('Çok Büyük Not', 'x'.repeat(10_000_000));
    });

    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.code).toBe('storage_full');

    Storage.prototype.setItem = originalSetItem;
  });

  it('clearError resets error state', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid');

    const { result } = renderHook(() => useNotes());

    expect(result.current.error).not.toBeNull();

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('does not break when localStorage is empty', () => {
    const { result } = renderHook(() => useNotes());

    expect(result.current.notes).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });

  it('handles null in localStorage gracefully', () => {
    const { result } = renderHook(() => useNotes());

    expect(result.current.notes).toHaveLength(0);
    expect(result.current.error).toBeNull();
  });

  it('validates note status is active or completed only', () => {
    const badNote = {
      id: 'bad-1',
      title: 'Başlık',
      content: 'İçerik',
      status: 'invalid_status',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([badNote]));

    const { result } = renderHook(() => useNotes());

    expect(result.current.notes).toHaveLength(0);
    expect(result.current.error).not.toBeNull();
  });

  it('validates note id is non-empty string', () => {
    const badNote = {
      id: '',
      title: 'Başlık',
      content: 'İçerik',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([badNote]));

    const { result } = renderHook(() => useNotes());

    expect(result.current.notes).toHaveLength(0);
    expect(result.current.error).not.toBeNull();
  });
});
