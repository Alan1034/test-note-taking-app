/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-10-11 22:58:57
 * @LastEditTime: 2023-10-12 02:30:10
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \note-taking-app\src\api.ts
 * 
 */
import type { note, noteId } from "@/types/types";

export default class NotesAPI {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

    return notes.sort((a: note, b: note) => {
      if ((!a.updated) || (!b.updated)) {
        return -1
      }
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave: note) {
    const notes = NotesAPI.getAllNotes();
    const existing = notes.find((note: note) => note.id === noteToSave.id);

    // Edit/Update
    if (existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      noteToSave.id = Math.floor(Math.random() * 1000000);
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  static deleteNote(id: noteId) {
    const notes = NotesAPI.getAllNotes();
    const newNotes = notes.filter((note: note) => note.id != id);

    localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
  }
}
