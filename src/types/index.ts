export type NoteStatus = 'active' | 'completed';

export interface Note {
  id: string;
  title: string;
  content: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
