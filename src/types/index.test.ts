import { describe, it, expect } from 'vitest';
import type { Note, NoteStatus, NotesState, NotesAction } from './index';

describe('Note types', () => {
  it('should accept valid Note object', () => {
    const note: Note = {
      id: 'test-id-123',
      title: 'Test Notu',
      content: 'Bu bir test notudur.',
      status: 'active' as NoteStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(note.id).toBe('test-id-123');
    expect(note.title).toBe('Test Notu');
    expect(note.status).toBe('active');
  });

  it('should accept completed status', () => {
    const note: Note = {
      id: 'test-id-456',
      title: 'Tamamlanan Not',
      content: '',
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(note.status).toBe('completed');
  });

  it('should validate NotesState shape', () => {
    const state: NotesState = {
      notes: [],
      searchQuery: '',
      isLoading: false,
      error: null,
    };

    expect(state.notes).toEqual([]);
    expect(state.searchQuery).toBe('');
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should allow NotesAction dispatch', () => {
    const addAction: NotesAction = {
      type: 'ADD_NOTE',
      payload: {
        id: '1',
        title: 'Yeni Not',
        content: 'İçerik',
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    };

    expect(addAction.type).toBe('ADD_NOTE');

    const deleteAction: NotesAction = {
      type: 'DELETE_NOTE',
      payload: '1',
    };

    expect(deleteAction.type).toBe('DELETE_NOTE');
  });
});
