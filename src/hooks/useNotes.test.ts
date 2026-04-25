import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNotes } from './useNotes';

describe('useNotes', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('toggles note status from active to completed', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('Test', 'Content');
    });

    const noteId = result.current.notes[0].id;
    expect(result.current.notes[0].status).toBe('active');

    act(() => {
      result.current.toggleNoteStatus(noteId);
    });

    expect(result.current.notes[0].status).toBe('completed');
    expect(result.current.completedCount).toBe(1);
  });

  it('toggles note status from completed to active', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('Test', 'Content');
    });

    const noteId = result.current.notes[0].id;

    act(() => {
      result.current.toggleNoteStatus(noteId);
    });

    act(() => {
      result.current.toggleNoteStatus(noteId);
    });

    expect(result.current.notes[0].status).toBe('active');
    expect(result.current.completedCount).toBe(0);
  });

  it('deletes a note', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('Test 1', 'Content 1');
      result.current.addNote('Test 2', 'Content 2');
    });

    expect(result.current.notes).toHaveLength(2);

    // addNote adds to the beginning of the array
    // So notes = [Test 2, Test 1]
    const noteId = result.current.notes[0].id; // Test 2

    act(() => {
      result.current.deleteNote(noteId);
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].title).toBe('Test 1');
  });

  it('persists notes to localStorage after toggle', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('Test', 'Content');
    });

    const noteId = result.current.notes[0].id;

    act(() => {
      result.current.toggleNoteStatus(noteId);
    });

    const stored = JSON.parse(localStorage.getItem('setfarm-notlar') || '[]');
    expect(stored[0].status).toBe('completed');
  });

  it('persists notes to localStorage after delete', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('Test', 'Content');
    });

    const noteId = result.current.notes[0].id;

    act(() => {
      result.current.deleteNote(noteId);
    });

    const stored = JSON.parse(localStorage.getItem('setfarm-notlar') || '[]');
    expect(stored).toHaveLength(0);
  });

  it('updates updatedAt timestamp on toggle', () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote('Test', 'Content');
    });

    const originalUpdatedAt = result.current.notes[0].updatedAt;

    // Small delay to ensure different timestamp
    vi.useFakeTimers();
    vi.advanceTimersByTime(10);

    const noteId = result.current.notes[0].id;

    act(() => {
      result.current.toggleNoteStatus(noteId);
    });

    expect(result.current.notes[0].updatedAt).not.toBe(originalUpdatedAt);
    vi.useRealTimers();
  });
});
