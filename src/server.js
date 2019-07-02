const fastify = require('fastify')({
	logger: true
});

const mongoose = require('mongoose');

// Connect to database then verify connection
mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

module.exports = fastify;