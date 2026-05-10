const express = require('express');
const router = express.Router();

let pokemon = [
	{ id: 45, name: 'Bulbasaur', type: 'Grass/Poison' },
	{ id: 89, name: 'Charmander', type: 'Fire' },
	{ id: 9, name: 'Squirtle', type: 'Water' },
];
let nextId = pokemon.length + 1;

// Get all Pokemon
router.get('/', (req, res) => {
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
	const { id } = req.params;
	if (!pokemon) {
		return res.status(404).json({
			message: `Pokemon with id: ${id} not found`,
			metadata: {
				hostname: req.hostname,
				method: req.method,
			},
		});
	}
	res.status(200).json({
		message: `Service is up - You requested Pokemon with id: ${id}`,
		data: pokemon[id],
		metadata: {
			hostname: req.hostname,
			method: req.method,
		},
	});
});

// Add a new Pokemon
router.post('/', (req, res) => {
	const { nextid, name, type } = req.body;
	if (!name || !type) {
		return res.status(400).json({
			message: 'Name and type are required to add a new Pokemon',
			metadata: {
				hostname: req.hostname,
				method: req.method,
			},
		});
	}

	const newPokemon = { id: nextid++, name, type };
	pokemon.push(newPokemon);

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
	const { id } = req.params;
	const { name, type } = req.body;

	if (!name || !type) {
		return res.status(400).json({
			message: 'Name and type are required to update a Pokemon',
			metadata: {
				hostname: req.hostname,
				method: req.method,
			},
		});
	}
	pokemon[id] = { name, type };
	res.status(200).json({
		message: `Service is up - Pokemon with id: ${id} updated`,
		data: pokemon[id],
		metadata: {
			hostname: req.hostname,
			method: req.method,
		},
	});
});

// Delete a Pokemon by id
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const deletedPokemon = pokemon.splice(id, 1);

	if (deletedPokemon.length === 0) {
		return res.status(404).json({
			message: `Pokemon with id: ${id} not found`,
			metadata: {
				hostname: req.hostname,
				method: req.method,
			},
		});
	}

	res.status(200).json({
		message: `Service is up - Pokemon with id: ${id} deleted`,
		data: deletedPokemon[0],
		metadata: {
			hostname: req.hostname,
			method: req.method,
		},
	});
});

module.exports = router;
