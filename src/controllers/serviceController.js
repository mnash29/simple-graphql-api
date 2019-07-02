const boom = require('@hapi/boom');

// Get data model
const Service = require('../models/Service');

// Get a single service id
exports.getSingleService = async (req) => {
	try {
		const id = req.params === undefined ? req.id : req.params.id;
		const service = await Service.findById(id);
		return service;
	} catch(err) {
		throw boom.boomify(err);
	}
}

// Get single cars services
exports.getCarsServices = async (req) => {
	try {
		const id = req.params === undefined ? req.id : req.params.id;
		const services = await Service.find({ car_id: id });
		return services;
	} catch(err) {
		throw boom.boomify(err);
	}
}