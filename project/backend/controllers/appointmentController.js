import Appointment from '../models/appointmentModel.js';

// @desc    Book an appointment
// @route   POST /api/appointments/book
// @access  Private
export const bookAppointment = async (req, res) => {
    try {
        const { lawyerId, clientName, clientContact, dateTime, status } = req.body;

        // Create new appointment
        const appointment = new Appointment({
            lawyerId,
            clientName,
            clientContact,
            dateTime,
            status,
        });

        const savedAppointment = await appointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('lawyerId');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = status;
        const updatedAppointment = await appointment.save();

        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
