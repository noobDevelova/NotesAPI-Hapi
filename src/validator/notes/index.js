const { NotePayloadSchema, NoteQuerySchema } = require('./schema');

const NotesValidator = {
  validateNotePayload: payload => {
    const result = NotePayloadSchema.validate(payload);

    if (result.error) {
      throw new Error(result.error.message);
    }
  },

  validateNoteQuery: query => {
    const result = NoteQuerySchema.validate(query);

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  },
};

module.exports = NotesValidator;
