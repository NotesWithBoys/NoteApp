// src/api.ts
import { Note } from './types';

let notes: Note[] = [
  {
    id: 1,
    title: 'First Note',
    content: 'This is my first note',
    date: new Date().toISOString(),
    tag: 'to do',
  },
  {
    id: 2,
    title: 'Second Note',
    content: 'This is my second note',
    date: new Date().toISOString(),
    tag: 'in progress',
  }
];

export function getNotes(): Promise<Note[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(notes), 500);
  });
}

export function createNote(note: Omit<Note, 'id'>): Promise<Note> {
  return new Promise((resolve) => {
    const newNote = { id: Date.now(), ...note };
    notes.push(newNote);
    setTimeout(() => resolve(newNote), 500);
  });
}

export function updateNote(updatedNote: Note): Promise<Note> {
  return new Promise((resolve) => {
    notes = notes.map(note => (note.id === updatedNote.id ? updatedNote : note));
    setTimeout(() => resolve(updatedNote), 500);
  });
}

export function deleteNote(id: number): Promise<void> {
  return new Promise((resolve) => {
    notes = notes.filter(note => note.id !== id);
    setTimeout(() => resolve(), 500);
  });
}
