import schema from '../validators/appointmentValidator.js';

export const validateBody = (req, res, next) => {
    
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.message });
    } else {
        next();
    }
};