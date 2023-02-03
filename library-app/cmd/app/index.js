const config = require( '../../config' );
const server = require('../../src/infrastructure/webserver/server')

server.listen(config.PORT, config.HOST, () => {
  console.info('Listening at ' + config.PORT + ' port');
})
