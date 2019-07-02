// External dependences
const gql = require('fastify-gql');
const fastiSwag = require('fastify-swagger');

// Internal dependencies
const routes = require('./routes');
const swagger = require('./config/swagger');
const fastify = require('./server');

// GraphQL Schema
const schema = require('./schema');

// Register swagger
fastify.register(fastiSwag, swagger.options);

// Register fastify graphql 
fastify.register(gql, {
	schema,
	graphiql: true
});

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