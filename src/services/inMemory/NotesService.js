const { nanoid } = require('nanoid');
const { InvariantError, NotFoundError } = require('../../exceptions');

class NotesService {
  constructor() {
    this._notes = [];
  }

  async addNote(data) {
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
    const isSuccess = this._notes.filter(note => note.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return id;
  }

  async getNotes() {
    return this._notes;
  }

  async getNoteById(id) {
    const note = this._notes.filter(item => item.id === id)[0];
    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return note;
  }

  async editNoteById(id, updatedNote) {
    const noteIndex = this._notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      throw new NotFoundError(
        'Gagal memperbaharui catatan, Catatan tidak ditemukan'
      );
    }

    const updatedAt = new Date().toISOString();
    this._notes[noteIndex] = {
      ...this._notes[noteIndex],
      ...updatedNote,
      updatedAt,
    };
  }

  async deleteNoteById(id) {
    const noteIndex = this._notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      throw new NotFoundError(
        'Gagal menghapus catatan, Catatan tidak ditemukan'
      );
    }
    this._notes.splice(noteIndex, 1);
  }
}

module.exports = NotesService;
