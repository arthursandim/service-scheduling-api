import Appointment from '../models/Appointment.js';

export const listAllAppointments = async () => {
    const appointments = await Appointment.find();
    return(appointments);
};

export const listAppointmentById  = async (appointmentID) => {
    const appointment = await Appointment.findById(appointmentID);
    return (appointment);
};

export const appointmentCreator  = async (customer, dateTime, serviceType) => {
    const newAppointment = await Appointment.create({ customer, dateTime, serviceType });
    return newAppointment;
};

export const appointmentUpdater  = async (appointmentID, newData) => {

    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentID, newData, { new: true });
    return updatedAppointment;
}

export const appointmentRemover = async (appointmentID) => {

    const appointment = await Appointment.findByIdAndDelete(appointmentID);
    return (appointment);
}
