import type { Note } from '../types';
import { NoteCard } from './NoteCard';

interface NoteListProps {
  notes: Note[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteList({ notes, onToggle, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <section className="pb-12">
      <h2 className="text-[1.75rem] font-semibold text-on-surface mb-8 font-headline tracking-tight">
        Son Notlar
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 note-grid">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
