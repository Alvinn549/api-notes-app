require('dotenv').config();
const Hapi = require('@hapi/hapi');
const notesPlugin = require('./api/notes');
// const NotesServices = require('./services/inMemory/NotesService');
const NotesServices = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

async function init() {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const notesService = new NotesServices();

  await server.register({
    plugin: notesPlugin,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
