import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Note } from '../types';

const STORAGE_KEY = 'setfarm-notlar';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as Note[] : [];
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

  return { notes, completedCount, addNote };
}
