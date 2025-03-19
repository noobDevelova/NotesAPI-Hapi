const Joi = require('joi');

const NotePayloadSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

const NoteQuerySchema = Joi.object({
  name: Joi.string().empty(''),
});

module.exports = { NotePayloadSchema, NoteQuerySchema };
