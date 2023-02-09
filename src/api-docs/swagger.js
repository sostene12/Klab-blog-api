import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { blogRouteDocs } from "./blogs.docs";
import {userRouteDocs} from "./user.docs"
import {estateRouteDocs} from "./estate.docs"


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
        { name: 'Estates', description: 'Estates Routes' },
        { name: 'Contact', description: 'Contact Routes' },
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
      paths: {...userRouteDocs,...blogRouteDocs,...estateRouteDocs},
    },
    apis: ['../routes/**/*.js'],
  }

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) =>{
    app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
}

export default swaggerDocs;