// src/App.tsx
import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './api';
import { Note as NoteType } from './types';
import Note from './Note';
import NoteForm from './NoteForm';

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null);

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  const handleCreateOrUpdateNote = (noteData: Omit<NoteType, 'id'>) => {
    if (currentNote) {
      const updatedNote = { ...currentNote, ...noteData };
      updateNote(updatedNote).then((updated) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === updated.id ? updated : note))
        );
        setCurrentNote(null);
      });
    } else {
      createNote(noteData).then((newNote) => {
        setNotes((prevNotes) => [...prevNotes, newNote]);
      });
    }
  };

  const handleDeleteNote = (id: number) => {
    deleteNote(id).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    });
  };

  const handleEditNote = (note: NoteType) => {
    setCurrentNote(note);
  };

  return (
    <div>
      <h1>Notes App</h1>
      <NoteForm initialNote={currentNote} onSave={handleCreateOrUpdateNote} />
      {notes.map((note) => (
        <Note key={note.id} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote} />
      ))}
    </div>
  );
};

export default App;
