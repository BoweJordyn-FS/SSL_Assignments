const Patients = require('../models/Patients');

const getAllPatients = async (req, res) => {
	try {
		const patients = await Patients.find();
		res.status(200).json({ success: true, data: patients });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

const createPatient = async (req, res) => {
	try {
		const { pcp, name, dob, gender, new_Patient, insurance } = req.body;
		const patient = new Patients({
			pcp,
			name,
			dob,
			gender,
			new_Patient,
			insurance,
		});
		await patient.save();
		res.status(201).json({ success: true, data: patient });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};
const getPatientById = async (req, res) => {
	try {
		const patient = await Patients.findById(req.params.id);
		if (!patient) {
			return res
				.status(404)
				.json({ success: false, message: 'Patient not found' });
		}
		res.status(200).json({ success: true, data: patient });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};
const updatePatient = async (req, res) => {
	try {
		const patient = await Patients.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!patient) {
			return res
				.status(404)
				.json({ success: false, message: 'Patient not found' });
		}
		res.status(200).json({ success: true, data: patient });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};
const deletePatient = async (req, res) => {
	try {
		const patient = await Patients.findByIdAndDelete(req.params.id);
		if (!patient) {
			return res
				.status(404)
				.json({ success: false, message: 'Patient not found' });
		}
		res.status(200).json({ success: true, message: 'Patient deleted' });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

module.exports = {
	getAllPatients,
	createPatient,
	getPatientById,
	updatePatient,
	deletePatient,
};
