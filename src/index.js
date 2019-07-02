const routes = require('./routes');
const swagger = require('./config/swagger');
const fastify = require('./server');

// Register swagger
fastify.register(require('fastify-swagger'), swagger.options);

// Initialize routes
routes.forEach((route, index) => {
	console.log(route);
	fastify.route(route);
});

// Run server using port 3000
const start = async() => {
	try {
		await fastify.listen(3000, '0.0.0.0');
		fastify.swagger();
		fastify.log.info(`Server listening on ${fastify.server.address().port}`);
	} catch(err) {
		fastify.log.error(err);
		process.exit(1);
	}
}

start();