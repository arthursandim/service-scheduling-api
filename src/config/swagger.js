import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Service Scheduling API',
            version: '1.0.0',
            description: 'API de agendamento de serviços para Sandim Jardinagem',
        },
    },
    apis: ['./src/docs/*.js'],
};

export default swaggerJsdoc(options);