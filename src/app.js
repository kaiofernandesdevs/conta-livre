import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { setupSwagger } from './config/swagger.js';
import { addRoutes } from './routes/routes.js';

const API = express();

API.use(cors());
API.use(express.json());

setupSwagger(API);

addRoutes(API);


const PORT = process.env.PORT || 5010; 
API.listen(PORT, () => console.log(`>> The API is running on port ${PORT}`));