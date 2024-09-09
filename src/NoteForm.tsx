// src/NoteForm.tsx
import React, { useState, useEffect } from 'react';
import { Note } from './types';

interface NoteFormProps {
  initialNote?: Note | null;
  onSave: (note: Omit<Note, 'id'>) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ initialNote, onSave }) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [tag, setTag] = useState<Note['tag']>(initialNote?.tag || 'to do');
  const [date, setDate] = useState<string>(initialNote?.date || new Date().toISOString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content, tag, date: new Date().toISOString() }); // обновляем дату при сохранении
    setTitle('');
    setContent('');
    setTag('to do');
  };

  useEffect(() => {
    if (initialNote) {
      setDate(initialNote.date); // Устанавливаем дату редактирования
    }
  }, [initialNote]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tag:</label>
        <select value={tag} onChange={(e) => setTag(e.target.value as Note['tag'])}>
          <option value="to do">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default NoteForm;
