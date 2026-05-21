import Professional from '../models/Professional.js';
import oauth2Client from '../config/googleAuth.js';
import { google } from 'googleapis';

export const createCalendarEvent = async (customerName, serviceType, dateTime, address) => {
    const professional = await Professional.findOne({});
    oauth2Client.setCredentials({refresh_token: professional.googleRefreshToken});

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const startDate = new Date(dateTime);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const endDateTime = endDate.toISOString();

    const event = {
        summary: `${customerName} - ${serviceType}`,
        description: `${address}`,
        start: { dateTime: dateTime, timeZone: 'America/Sao_Paulo' },
        end: { dateTime: endDateTime, timeZone: 'America/Sao_Paulo' }
    };

    await calendar.events.insert({calendarId: 'primary', resource: event});

};

