const BaseResponse = require('../../utils/BaseResponse');

class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postNoteHandler = async (request, h) => {
    this._validator.validateNotePayload(request.payload);
    const { title = 'untitled', body, tags } = request.payload;
    const noteId = await this._service.addNote({ title, body, tags });

    const response = BaseResponse.create({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });

    return h.response(response).code(201);
  };

  getNotesHandler = async (request, h) => {
    this._validator.validateNoteQuery(request.query);
    const { name } = request.query;
    const notes = await this._service.getNotes();

    if (name && name !== '') {
      const filteredNotes = notes.filter(note => note.title.includes(name));
      return BaseResponse.create({
        status: 'success',
        message: 'Berhasil Mengambil Data Notes',
        data: {
          items: filteredNotes,
        },
      });
    }

    return BaseResponse.create({
      status: 'success',
      message: 'Berhasil Mengambil Data Notes',
      data: {
        items: notes,
      },
    });
  };

  getNoteByIdHandler = async (request, h) => {
    const { id } = request.params;
    const note = await this._service.getNoteById(id);

    const response = BaseResponse.create({
      status: 'success',
      message: 'Berhasil Mengambil Note',
      data: {
        note,
      },
    });

    return h.response(response).code(200);
  };

  putNoteByIdHandler = async (request, h) => {
    try {
      this._validator.validateNotePayload(request.payload);
      const { id } = request.params;
      await this._service.editNoteById(id, request.payload);

      const response = BaseResponse.create({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });

      return h.response(response).code(200);
    } catch (error) {
      const response = BaseResponse.create({
        status: 'fail',
        message: error.message,
      });

      return h.response(response).code(error.statusCode);
    }
  };

  deleteNoteByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;
      await this._service.deleteNoteById(id);

      const response = BaseResponse.create({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });

      return h.response(response).code(200);
    } catch (error) {
      const response = BaseResponse.create({
        status: 'fail',
        message: error.message,
      });

      return h.response(response).code(error.statusCode);
    }
  };
}

module.exports = NotesHandler;
