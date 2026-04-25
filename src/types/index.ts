export type NoteStatus = 'active' | 'completed';

export interface Note {
  id: string;
  title: string;
  content: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NotesState {
  notes: Note[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

export type NotesAction =
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'TOGGLE_STATUS'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'LOAD_NOTES'; payload: Note[] }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };
