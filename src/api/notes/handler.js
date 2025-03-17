const BaseResponse = require('../../utils/BaseResponse');

class NotesHandler {
  constructor(service) {
    this._service = service;
  }

  postNoteHandler = (request, h) => {
    try {
      const { title = 'untitled', body, tags } = request.payload;

      const noteId = this._service.addNote({ title, body, tags });

      const response = BaseResponse.create({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });

      return h.response(response).code(201);
    } catch (error) {
      const response = BaseResponse.create({
        status: 'fail',
        message: error.message,
      });

      return h.response(response).code(404);
    }
  };

  getNotesHandler = () => {
    const notes = this._service.getNotes();

    return BaseResponse.create({
      status: 'success',
      message: 'Berhasil Mengambil Data Notes',
      data: {
        notes,
      },
    });
  };

  getNoteByIdHandler = (request, h) => {
    try {
      const { id } = request.params;

      const note = this._service.getNoteById(id);

      const response = BaseResponse.create({
        status: 'success',
        message: 'Berhasil Mengambil Note',
        data: {
          note,
        },
      });

      return h.response(response).code(200);
    } catch (error) {
      const response = BaseResponse.create({
        status: 'fail',
        message: error.message,
      });

      return h.response(response).code(404);
    }
  };

  putNoteByIdHandler = (request, h) => {
    try {
      const { id } = request.params;

      this._service.editNoteById(id, request.payload);

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

      return h.response(response).code(404);
    }
  };

  deleteNoteByIdHandler = (request, h) => {
    try {
      const { id } = request.params;

      this._service.deleteNoteById(id);

      const response = BaseResponse.create({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });

      return h.response(response).code(200);
    } catch (error) {
      const response = BaseResponse.create({
        status: 'fail',
        message: 'Catatan berhasil dihapus',
      });

      return h.response(response).code(404);
    }
  };
}

module.exports = NotesHandler;
