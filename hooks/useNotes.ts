
import { useReducer, useEffect } from 'react';
import type { Note } from '../types';

type Action = { type: 'ADD_NOTE'; payload: Note } | { type: 'DELETE_NOTE'; payload: number } | { type: 'LOAD_NOTES'; payload: Note[] };

const notesReducer = (state: Note[], action: Action): Note[] => {
  switch (action.type) {
    case 'LOAD_NOTES':
      return action.payload;
    case 'ADD_NOTE':
      return [action.payload, ...state];
    case 'DELETE_NOTE':
      return state.filter((note) => note.id !== action.payload);
    default:
      return state;
  }
};

const NOTES_STORAGE_KEY = 'smart-voice-notes';

export function useNotes() {
  const [notes, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
      if (storedNotes) {
        dispatch({ type: 'LOAD_NOTES', payload: JSON.parse(storedNotes) });
      }
    } catch (error) {
      console.error("Failed to load notes from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes to localStorage:", error);
    }
  }, [notes]);

  const addNote = (note: Note) => {
    dispatch({ type: 'ADD_NOTE', payload: note });
  };

  const deleteNote = (id: number) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
  };

  return { notes, addNote, deleteNote };
}
