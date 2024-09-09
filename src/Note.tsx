// src/Note.tsx
import React from 'react';
import { Note as NoteType } from './types';

interface NoteProps {
  note: NoteType;
  onDelete: (id: number) => void;
  onEdit: (note: NoteType) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete, onEdit }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p><strong>Date:</strong> {new Date(note.date).toLocaleString()}</p>
      <p><strong>Tag:</strong> {note.tag}</p>
      <button onClick={() => onEdit(note)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default Note;
