import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { addRoutes } from './routes/routes.js';

const API = express();

API.use(cors());
API.use(express.json());

addRoutes(API);


const PORT = process.env.PORT || 5010; 
API.listen(PORT, () => console.log(`>> The API is running on port ${PORT}`));