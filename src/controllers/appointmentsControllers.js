import { listAllAppointments, listAppointmentById, appointmentCreator, appointmentUpdater, appointmentRemover } from '../services/appointmentsServices.js';

export const appointmentsList = async (req, res) => {
    try {
        const appointments = await listAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

export const appointmentListById = async (req, res) => {
    try {
        const appointmentsById = await listAppointmentById(req.params.id);
        res.status(200).json(appointmentsById)
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

export const appointmentCreate = async (req, res) => {
    try {
        const { customer, dateTime, serviceType } = req.body;

        if (!customer || !dateTime || !serviceType) {
            return res.status(400).json({ erro: "Cliente, Data e Tipo de serviço são obrigatórios" })
        };

        const newAppointment = await appointmentCreator(customer, dateTime, serviceType);

        res.status(201).json(newAppointment);

    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

export const appointmentUpdate = async (req, res) => {
    try {
        const appointmentUpdated = await appointmentUpdater(req.params.id, req.body);
        if (!appointmentUpdated) {
            return res.status(404).json({ erro: "Agendamento não encontrado" }) 
        };
        res.status(200).json(appointmentUpdated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

export const appointmentDelete = async (req, res) => {
    try {
        const appointmentDeleted = await appointmentRemover(req.params.id);
        if (!appointmentDeleted) {
            return res.status(404).json({ erro: "Agendamento não encontrado" }) 
        };
        res.status(200).json(appointmentDeleted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};



