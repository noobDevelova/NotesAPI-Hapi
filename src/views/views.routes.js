const routes = handler => [
  {
    method: 'GET',
    path: '/',
    handler: handler.homeViewHandler,
  },
];

module.exports = routes;
