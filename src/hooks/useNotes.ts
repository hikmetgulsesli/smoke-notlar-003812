import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Note } from '../types';

const STORAGE_KEY = 'setfarm-notlar';

function isNoteArray(value: unknown): value is Note[] {
  return Array.isArray(value);
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!isNoteArray(parsed)) return [];
      // Sort chronologically: newest first (higher timestamp = more recent)
      return parsed.sort((a, b) => {
        const ta = typeof a.createdAt === 'string' ? new Date(a.createdAt).getTime() : 0;
        const tb = typeof b.createdAt === 'string' ? new Date(b.createdAt).getTime() : 0;
        return tb - ta;
      });
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const completedCount = useMemo(() => notes.filter((note) => note.status === 'completed').length, [notes]);

  const addNote = useCallback((title: string, content: string) => {
    const now = new Date().toISOString();
    setNotes((current) => [{ id: crypto.randomUUID(), title, content, status: 'active', createdAt: now, updatedAt: now }, ...current]);
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

  return { notes, completedCount, addNote, deleteNote, toggleNote };
}
