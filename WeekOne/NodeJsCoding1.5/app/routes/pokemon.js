const express = require('express');
const router = express.Router();

let pokemon = [
	{ id: 9, name: 'Squirtle', type: 'Water' },
	{ id: 45, name: 'Bulbasaur', type: 'Grass/Poison' },
	{ id: 89, name: 'Charmander', type: 'Fire' },
];
let nextId = Math.max(...pokemon.map((p) => p.id)) + 1;

// Get all Pokemon
router.get('/', (req, res) => {
	// 200 OK for successful retrieval
	res.status(200).json({
		message: 'Service is up',
		data: pokemon,
		metadata: {
			hostname: req.hostname,
			method: req.method,
		},
	});
});

// Get Pokemon by id
router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const found = pokemon.find((p) => p.id === id);
	if (!found) {
		// 404 Not Found for not found
		return res.status(404).json({
			message: `Pokemon with id: ${id} not found`,
			metadata: {
				hostname: req.hostname,
				method: req.method,
			},
		});
	}
	// 200 OK for successful retrieval
	res.status(200).json({
		message: `Service is up - You requested Pokemon with id: ${id}`,
		data: found,
		metadata: {
			hostname: req.hostname,
			method: req.method,
		},
	});
});

// Add a new Pokemon
router.post('/', (req, res) => {
	const { name, type } = req.body;
	if (!name || !type) {
		// 400 Bad Request for missing required fields
		return res.status(400).json({
			message: 'Name and type are required to add a new Pokemon',
			metadata: {
				hostname: req.hostname,
				method: req.method,
			},
		});
	}

	let newPokemon = { id: nextId++, name, type };
	pokemon.push(newPokemon);
	// 201 Created for new resources
	res.status(201).json({
		message: 'Service is up - New Pokemon added',
		data: newPokemon,
		metadata: {
			hostname: req.hostname,
			method: req.method,
		},
	});
});

// Update a Pokemon by id
router.put('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { name, type } = req.body;

	if (!name || !type) {
		// 400 Bad Request for missing required fields
		return res.status(400).json({
			message: 'Name and type are required to update a Pokemon',
			metadata: {
				hostname: req.hostname,
				method: req.method,
			},
		});
	}
	const index = pokemon.findIndex((p) => p.id === id);
	if (index === -1) {
		return res.status(404).json({
			message: `Pokemon with id: ${id} not found`,
			metadata: {
				hostname: req.hostname,
				method: req.method,
			},
		});
	}
	pokemon[index] = { id, name, type };
	// 202 Accepted for updates
	res.status(202).json({
		message: `Service is up - Pokemon with id: ${id} updated`,
		data: pokemon[index],
		metadata: {
			hostname: req.hostname,
			method: req.method,
		},
	});
});

// Delete a Pokemon by id
router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = pokemon.findIndex((p) => p.id === id);
	const deletedPokemon = index !== -1 ? pokemon.splice(index, 1) : [];

	if (deletedPokemon.length === 0) {
		// 404 Not Found for not found
		return res.status(404).json({
			message: `Pokemon with id: ${id} not found`,
			metadata: {
				hostname: req.hostname,
				method: req.method,
			},
		});
	}
	// 202 Accepted for deletions
	res.status(202).json({
		message: `Service is up - Pokemon with id: ${id} deleted`,
		data: deletedPokemon[0],
		metadata: {
			hostname: req.hostname,
			method: req.method,
		},
	});
});

module.exports = router;
