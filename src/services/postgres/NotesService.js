const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { QueryBuilder, ObjectMapper } = require('../../utils');
const { InvariantError, NotFoundError } = require('../../exceptions');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  addNote = async note => {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = QueryBuilder.insert(
      'notes',
      ObjectMapper.objectToSnakeCase({
        id,
        ...note,
        createdAt,
        updatedAt,
      })
    );

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Catatan Gagal Ditambahkan');
    }

    return result.rows[0].id;
  };

  getNotes = async () => {
    const notes = QueryBuilder.select('notes');

    const result = await this._pool.query(notes);

    return result.rows.map(row => ObjectMapper.objectToCamelCase(row));
  };

  getNoteById = async id => {
    const query = QueryBuilder.select('notes', ['*'], { id });
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return ObjectMapper.objectToCamelCase(result.rows[0]);
  };

  editNoteById = async (id, updatedNote) => {
    const updatedAt = new Date().toISOString();

    const query = QueryBuilder.update(
      'notes',
      ObjectMapper.objectToSnakeCase({
        ...updatedNote,
        updatedAt,
      }),
      { id }
    );

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(
        'Gagal memperbaharui catatan, Catatan tidak ditemukan'
      );
    }
  };

  deleteNoteById = async id => {
    const query = QueryBuilder.delete('notes', { id });
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(
        'Gagal menghapus catatan, Catatan tidak ditemukan'
      );
    }
  };
}

module.exports = NotesService;
