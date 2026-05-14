const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
	dr_id: {
		type: Number,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: [true, 'Name is required'],
		trim: true,
		min: [2, 'Name must be at least 2 characters long'],
		max: [50, 'Name cannot exceed 50 characters'],
	},
	specialty: {
		type: String,
		required: [true, 'Specialty is required'],
		trim: true,
		min: [2, 'Specialty must be at least 2 characters long'],
		max: [100, 'Specialty cannot exceed 100 characters'],
	},
	available: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model('Doctor', doctorSchema);
