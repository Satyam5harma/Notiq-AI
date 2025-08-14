
import React from 'react';
import type { Note } from '../types';
import NoteListItem from './NoteListItem';
import PlusIcon from './icons/PlusIcon';

interface NoteListProps {
  notes: Note[];
  selectedNoteId: number | null;
  onSelectNote: (id: number) => void;
  onNewNote: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, selectedNoteId, onSelectNote, onNewNote }) => {
  return (
    <div className="bg-slate-800/50 h-full flex flex-col p-4 border-r border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-100">My Notes</h2>
        <button
          onClick={onNewNote}
          className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200"
          title="New Note"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-3 overflow-y-auto flex-grow">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              isSelected={note.id === selectedNoteId}
              onSelect={onSelectNote}
            />
          ))
        ) : (
          <div className="text-center text-slate-400 py-10">
            <p>No notes yet.</p>
            <p>Click "+" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;
