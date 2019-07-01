const mongoose = require('mongoose');
const routes = require('./routes');
const swagger = require('./config/swagger');
const fastify = require('fastify')({
	// Enable built in logger
	logger: true
});

// Register swagger
fastify.register(require('fastify-swagger'), swagger.options);

// Connect to database then verify connection
mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

// Initialize routes
routes.forEach((route, index) => {
	fastify.route(route);
});

// Build a route
fastify.get('/', async (req, res) => {
	return { hello: 'world' }
});

// Run server using port 3000
const start = async() => {
	try {
		await fastify.listen(3000);
		fastify.swagger();
		fastify.log.info(`Server listening on ${fastify.server.address().port}`);
	} catch(err) {
		fastify.log.error(err);
		process.exit(1);
	}
}

start();