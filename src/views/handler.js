class ViewsHandler {
  constructor(service) {
    this._service = service;
  }

  homeViewHandler = (request, h) => {
    const metadata = {
      title: 'Hapi.js with Handlebars',
      message:
        'Ini adalah template rendering engine menggunakan handlebars dan plugin vision',
    };

    return h.view('index', metadata);
  };
}

module.exports = ViewsHandler;
