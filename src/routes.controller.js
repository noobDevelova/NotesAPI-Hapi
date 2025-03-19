const { NotesHandler, routes: notesRoutes } = require('./api');
const { ViewsHandler, routes: viewsRoutes } = require('./views');

module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const notesHandler = new NotesHandler(service, validator);
    const viewsHandler = new ViewsHandler(service);

    server.route(notesRoutes(notesHandler));
    server.route(viewsRoutes(viewsHandler));
  },
};
