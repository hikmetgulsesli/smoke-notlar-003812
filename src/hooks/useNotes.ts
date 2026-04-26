import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Note } from '../types';

const STORAGE_KEY = 'setfarm-notlar';

export interface UseNotesError {
  message: string;
  code: 'storage_full' | 'parse_error' | 'validation_error' | 'unknown';
}

function isValidNote(note: unknown): note is Note {
  if (typeof note !== 'object' || note === null) return false;
  const n = note as Record<string, unknown>;
  return (
    typeof n.id === 'string' && n.id.length > 0 &&
    typeof n.title === 'string' &&
    typeof n.content === 'string' &&
    (n.status === 'active' || n.status === 'completed') &&
    typeof n.createdAt === 'string' &&
    typeof n.updatedAt === 'string'
  );
}

function isNoteArray(value: unknown): value is Note[] {
  return Array.isArray(value) && value.every(isValidNote);
}

function getErrorFromStorageError(err: unknown): UseNotesError {
  if (err instanceof Error) {
    if (err.name === 'QuotaExceededError' || err.message.includes('quota') || err.message.includes('full')) {
      return { message: 'Depolama alanı doldu. Bazı notlar kaydedilemedi.', code: 'storage_full' };
    }
    return { message: `Bir hata oluştu: ${err.message}`, code: 'unknown' };
  }
  return { message: 'Bilinmeyen bir hata oluştu.', code: 'unknown' };
}

export function useNotes() {
  const [error, setError] = useState<UseNotesError | null>(null);

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!isNoteArray(parsed)) {
        setError({ message: 'Not verisi bozuk. Lütfen tarayıcı depolamasını temizleyin.', code: 'validation_error' });
        return [];
      }
      // Sort chronologically: newest first (higher timestamp = more recent)
      return parsed.sort((a, b) => {
        const ta = typeof a.createdAt === 'string' ? new Date(a.createdAt).getTime() : 0;
        const tb = typeof b.createdAt === 'string' ? new Date(b.createdAt).getTime() : 0;
        return tb - ta;
      });
    } catch (err) {
      setError(getErrorFromStorageError(err));
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (err) {
      const storageErr = getErrorFromStorageError(err);
      setError(storageErr);
    }
  }, [notes]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const completedCount = useMemo(() => notes.filter((note) => note.status === 'completed').length, [notes]);

  const addNote = useCallback((title: string, content: string) => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle && !trimmedContent) return;
    const now = new Date().toISOString();
    setNotes((current) => [
      { id: crypto.randomUUID(), title: trimmedTitle, content: trimmedContent, status: 'active', createdAt: now, updatedAt: now },
      ...current,
    ]);
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((current) => current.filter((note) => note.id !== id));
  }, []);

  const toggleNote = useCallback((id: string) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? { ...note, status: note.status === 'active' ? 'completed' : 'active', updatedAt: new Date().toISOString() }
          : note
      )
    );
  }, []);

  return { notes, completedCount, addNote, deleteNote, toggleNote, error, clearError };
}
