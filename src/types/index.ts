export type NoteStatus = 'active' | 'completed';

export interface Note {
  id: string;
  title: string;
  content: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
}
