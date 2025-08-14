import React, { useState } from 'react';
import type { Note } from './types';
import { useNotes } from './hooks/useNotes';
import NoteList from './components/NoteList';
import NoteDetailView from './components/NoteDetailView';
import RecordingView from './components/RecordingView';

const App: React.FC = () => {
  const { notes, addNote, deleteNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const handleSaveNote = (newNoteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...newNoteData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    addNote(newNote);
    setSelectedNoteId(newNote.id);
  };

  const handleDeleteNote = (id: number) => {
    deleteNote(id);
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };
  
  const handleNewNote = () => {
    setSelectedNoteId(null);
  }

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 p-4 text-center z-10">
          <h1 className="text-xl font-bold text-slate-100 tracking-wider">
              Notiq - Your VNA
          </h1>
      </header>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-65px)]">
        <div className="md:col-span-1 lg:col-span-1 h-full">
          <NoteList
            notes={notes}
            selectedNoteId={selectedNoteId}
            onSelectNote={setSelectedNoteId}
            onNewNote={handleNewNote}
          />
        </div>
        <main className="md:col-span-2 lg:col-span-3 h-full overflow-y-auto">
          {selectedNote ? (
            <NoteDetailView note={selectedNote} onDelete={handleDeleteNote} />
          ) : (
            <RecordingView onSave={handleSaveNote} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;