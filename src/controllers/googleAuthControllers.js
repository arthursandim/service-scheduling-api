import oauth2Client from '../config/googleAuth.js';
import { saveGoogleToken } from '../services/googleAuthServices.js';

export const googleAuthRedirect = (req, res, next) => {
    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });

    return res.redirect(authorizationUrl);
};

export const googleAuthCallback = async (req, res, next) => {
    try {
        const code = req.query.code;
        await saveGoogleToken(code);
        res.status(200).json({ message: 'Google Calendar conectado com sucesso' });
    } catch (error) {
        next(error);
    };
};
