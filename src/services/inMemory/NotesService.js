const { nanoid } = require('nanoid');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote(data) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      ...data,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((item) => item.id === id)[0];

    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }

    return note;
  }

  editNoteById(id, updatedNote) {
    const noteIndex = this._notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
      throw new Error('Gagal memperbaharui catatan, Catatan tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._notes[noteIndex] = {
      ...this._notes[noteIndex],
      ...updatedNote,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const noteIndex = this._notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
      throw new Error('Gagal memperbaharui catatan, Catatan tidak ditemukan');
    }

    this._notes.splice(noteIndex, 1);
  }
}

module.exports = NotesService;
