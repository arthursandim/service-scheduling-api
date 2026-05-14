import { listAllAppointments, listAppointmentById, appointmentCreator, appointmentUpdater, appointmentRemover } from '../services/appointmentsServices.js';

export const appointmentsList = async (req, res, next) => {
    try {
        const appointments = await listAllAppointments();
        res.status(200).json(appointments);
        
    } catch (error) {
        next(error);
    };
};

export const appointmentListById = async (req, res, next) => {
    try {
        const appointmentsById = await listAppointmentById(req.params.id);
        res.status(200).json(appointmentsById)
    } catch (error) {
        next(error);
    };
};

export const appointmentCreate = async (req, res, next) => {
    try {
        const { customer, dateTime, serviceType } = req.body;

        const newAppointment = await appointmentCreator(customer, dateTime, serviceType);

        res.status(201).json(newAppointment);

    } catch (error) {
        next(error);
    };
};

export const appointmentUpdate = async (req, res, next) => {
    try {
        const appointmentUpdated = await appointmentUpdater(req.params.id, req.body);
        if (!appointmentUpdated) {
            return res.status(404).json({ error: "Agendamento não encontrado" }) 
        };
        res.status(200).json(appointmentUpdated);
    } catch (error) {
        next(error);
    } 
};

export const appointmentDelete = async (req, res, next) => {
    try {
        const appointmentDeleted = await appointmentRemover(req.params.id);
        if (!appointmentDeleted) {
            return res.status(404).json({ error: "Agendamento não encontrado" }) 
        };
        res.status(200).json(appointmentDeleted);
    } catch (error) {
        next(error);
    } 
};



