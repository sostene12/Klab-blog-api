import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { blogRouteDocs } from "./blogs.docs";
import {userRouteDocs} from "./user.docs"


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'Blogs Api',
        description: 'Blog api configurations',
      },
      servers: [
        {
          url: 'http://localhost:5000',
          description: 'Development server',
        },
        {
          url: 'https://dead-blue-nightingale-kit.cyclic.app/',
          description: 'Production server',
        },
      ],
      tags: [
        { name: 'User', description: 'User Routes' },
        { name: 'Blog', description: 'Blog Routes' },
      ],
      components: {
        securitySchemes: {
          token: {
            type: 'apiKey',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name:"token",
            in:"header"
          },
        },
      },
      paths: {...userRouteDocs,...blogRouteDocs},
    },
    apis: ['../routes/**/*.js'],
  }

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) =>{
    app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
}

export default swaggerDocs;