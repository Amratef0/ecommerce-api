const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API',
            version: '1.0.0',
            description: 'Ecommerce API Documentation'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            },
            {
                url: 'https://ecommerce-api-production-6fca.up.railway.app',
                description: 'Production server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;