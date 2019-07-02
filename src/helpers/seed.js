// External dependencies
const faker = require('faker');
const boom = require('@hapi/boom');

// Get Data Models
const Car = require('../models/Car');
const Owner = require('../models/Owner');
const Service = require('../models/Service');

// Import internal dependencies
const fastify = require('../server.js');

// Fake data
const cars = [
	{
		name: 'Tesla',
		models: ['S', 'E', 'X', 'Y']
	},
	{
		name: 'Mercedes',
		models: ['GLA', 'GLC', 'GLE', 'GLS']
	},
	{
		name: 'BMW',
		models: ['X4', 'Z3', 'M2', '7']
	},
	{
		name: 'Audi',
		models: ['A1', 'A3', 'A4', 'A5']
	},
	{
		name: 'Ford',
		models: ['Fiesta', 'Focus', 'Fusion', 'Mustang']
	}
];

const serviceGarages = ['A++ Auto Services', "Gary's Garage", 'Super Service', 'iGarage', 'Best Service'];



// Fake data generation functions
const generateOwnerData = () => {
	let ownerData = [];

	for(let i = 0; i < 50; i++) {
		const firstName = faker.fake('{{name.firstName}}');
		const lastName = faker.fake('{{name.lastName}}');
		const email = faker.fake(`${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`);

		const owner = {
			firstName,
			lastName,
			email
		}

		ownerData.push(owner);
	}
	return ownerData;
}

const generateCarData = ownersIds => {
	let carData = [];

	for(let i = 0; i < 1000; i++) {
		const owner_id = faker.random.arrayElement(ownersIds);
		const carObject = faker.random.arrayElement(cars);
		const title = faker.random.arrayElement(carObject.models);
		const price = faker.random.number({ min: 5000, max: 30000 });
		const age = faker.random.number({ min: 2, max: 10 });

		const car = {
			owner_id,
			brand: carObject.name,
			title,
			price,
			age
		}

		carData.push(car);
	}
	return carData;
}

const generateServiceData = carsIds => {
	let serviceData = [];

	for(let i = 0; i < 5000; i++) {
		const car_id = faker.random.arrayElement(carsIds);
		const name = faker.random.arrayElement(serviceGarages);
		const date = faker.fake('{{date.past}}');

		const service = {
			car_id,
			name,
			date
		}

		serviceData.push(service);
	}

	return serviceData;
}

fastify.ready().then( async () => {
		try {
			const owners = await Owner.insertMany(generateOwnerData());
			const ownersIds = owners.map(x => x._id);

			const cars = await Car.insertMany(generateCarData(ownersIds));
			const carsIds = cars.map(x => x._id);

			const services = await Service.insertMany(generateServiceData(carsIds));

			console.log(`
      Data successfully added:
        - ${owners.length} owners added.
        - ${cars.length} cars added.
        - ${services.length} services added.
      `);
		} catch (err) {
			throw boom.boomify(err);
		}
		process.exit();
	},
	err => {
		console.log('An error occured: ', err);
		process.exit(1);
	}
)