const Doctors = require('../models/Doctors');

const getAllDoctors = async (req, res) => {
	try {
		const doctors = await Doctors.find();
		res.status(200).json({ success: true, data: doctors });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

const createDoctor = async (req, res) => {
	const data = req.body;
	try {
		const newDoctor = await Doctors.create(data);
		console.log('Doctor created successfully:', newDoctor);
		res.status(201).json({ success: true, data: newDoctor });
	} catch (error) {
		console.error('Error creating doctor:', error.message);
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};
const getDoctorById = async (req, res) => {
	try {
		const doctor = await Doctors.findById(req.params.id);
		if (!doctor) {
			return res
				.status(404)
				.json({ success: false, message: 'Doctor not found' });
		}
		res.status(200).json({ success: true, data: doctor });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};
const updateDoctor = async (req, res) => {
	try {
		const doctor = await Doctors.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: 'after',
		});
		if (!doctor) {
			return res
				.status(404)
				.json({ success: false, message: 'Doctor not found' });
		}
		res.status(202).json({ success: true, data: doctor });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};
const deleteDoctor = async (req, res) => {
	try {
		const doctor = await Doctors.findByIdAndDelete(req.params.id);
		if (!doctor) {
			return res
				.status(404)
				.json({ success: false, message: 'Doctor not found' });
		}
		res
			.status(200)
			.json({ success: true, message: 'Doctor deleted successfully' });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

module.exports = {
	getAllDoctors,
	createDoctor,
	getDoctorById,
	updateDoctor,
	deleteDoctor,
};
