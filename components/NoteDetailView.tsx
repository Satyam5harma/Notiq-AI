
import React from 'react';
import type { Note } from '../types';
import Tag from './Tag';
import TrashIcon from './icons/TrashIcon';

interface NoteDetailViewProps {
  note: Note;
  onDelete: (id: number) => void;
}

const NoteDetailView: React.FC<NoteDetailViewProps> = ({ note, onDelete }) => {
  const formattedDate = new Date(note.createdAt).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-8 flex-grow h-full overflow-y-auto bg-slate-900">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">{note.title}</h1>
            <p className="text-sm text-slate-400 mb-4">{formattedDate}</p>
        </div>
        <button
          onClick={() => onDelete(note.id)}
          className="p-2 rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200"
          title="Delete Note"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-3">AI Summary</h2>
        <p className="text-slate-300 leading-relaxed bg-slate-800 p-4 rounded-lg">{note.summary}</p>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-3">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-cyan-400 mb-3">Full Transcript</h2>
        <p className="text-slate-400 leading-relaxed whitespace-pre-wrap bg-slate-800/50 p-4 rounded-lg">{note.transcript}</p>
      </div>
    </div>
  );
};

export default NoteDetailView;
