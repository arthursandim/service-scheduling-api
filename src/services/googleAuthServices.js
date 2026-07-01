import Professional from '../models/Professional.js';
import oauth2Client from '../config/googleAuth.js';

export const saveGoogleToken = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    if (tokens.refresh_token) {
        await Professional.findOneAndUpdate({}, { googleRefreshToken: tokens.refresh_token });
    }
};
