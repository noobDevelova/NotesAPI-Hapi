const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Handlebars = require('handlebars');

const notes = require('./routes.controller');

const { NotesService } = require('./services');
const { NotesValidator } = require('./validator');
const { ClientError } = require('./exceptions');
const { BaseResponse } = require('./utils');
const { EnvAdapter } = require('./infrastructure');

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: EnvAdapter.get('PORT'),
    host: EnvAdapter.get('HOST'),
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(Vision);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    path: `${__dirname}/views/screens`,
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = BaseResponse.create({
        status: 'fail',
        message: response.message,
      });

      return h.response(newResponse).code(response.statusCode);
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
