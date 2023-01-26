const server = require('../../src/infrastructure/webserver/server')

server.listen(3000, () => {
  console.log('Listening');
})
