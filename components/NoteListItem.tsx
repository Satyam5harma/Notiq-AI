
import React from 'react';
import type { Note } from '../types';

interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const NoteListItem: React.FC<NoteListItemProps> = ({ note, isSelected, onSelect }) => {
  const date = new Date(note.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <button
      onClick={() => onSelect(note.id)}
      className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
        isSelected
          ? 'bg-slate-700'
          : 'bg-slate-800 hover:bg-slate-700/50'
      }`}
    >
      <h3 className="font-bold text-slate-100 truncate">{note.title}</h3>
      <p className="text-sm text-slate-400 mt-1">{formattedDate}</p>
    </button>
  );
};

export default NoteListItem;
