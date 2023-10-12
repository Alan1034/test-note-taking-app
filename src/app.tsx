import NotesView from "./views/view";
import NotesAPI from "./api";
import React, { useEffect, useState } from 'react';
import type { noteId, note, notes, title, body } from "@/types/types";
const App: React.FC = () => {
  useEffect(() => {
    _refreshNotes();
  }, [])
  const [notes, setNotes] = useState<notes>([])
  const [activeNote, setActiveNote] = useState<note>()
  const _refreshNotes = () => {
    const notes = NotesAPI.getAllNotes();

    _setNotes(notes);

    if (notes.length > 0) {
      _setActiveNote(notes[0]);
    }
  }

  const _setNotes = (notes: notes) => {
    setNotes(notes)
    // this.view.updateNoteList(notes);
    // this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  const _setActiveNote = (note: note) => {
    setActiveNote(note);
    // this.view.updateActiveNote(note);
  }

  const _handlers = {
    onNoteSelect: (noteId: noteId) => {
      const selectedNote = notes.find((note: note) => note.id === noteId);
      if (selectedNote) {
        _setActiveNote(selectedNote);
      }
    },
    onNoteAdd: () => {
      const newNote = {
        title: "新建笔记",
        body: "开始记录...",
        id: -1
      };

      NotesAPI.saveNote(newNote);
      _refreshNotes();
    },
    onNoteEdit: (title: title, body: body) => {
      if (activeNote) {
        NotesAPI.saveNote({
          id: activeNote.id,
          title,
          body,
        });
      }
      _refreshNotes();
    },
    onNoteDelete: (noteId: noteId) => {
      NotesAPI.deleteNote(noteId);
      _refreshNotes();
    },
    onNoteUnactive: () => {
      setActiveNote(undefined)
    },

  }
  return (
    <NotesView handlers={_handlers} notes={notes} activeNote={activeNote} />
  )
}

export default App;