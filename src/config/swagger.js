import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Conta Livre',
      version: '1.0.0',
      description: 'Documentação da API REST de gerenciamento de contas, produtos e clientes.',
    },
    servers: [
      {
        url: 'http://localhost:5010',
        description: 'Servidor Local',
      },
    ],
  },

  apis: ['./src/controllers/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}