import { Router } from "express";
import * as service from '../services/clienteService.js';

const endpoints = Router();

endpoints.get('/clientes', async (req,resp, next) => {
    try {
        const listarClientes = await service.listarClientes();
        resp.status(200).send(listarClientes);
    } catch (err) {
        next(err);
    }
});

endpoints.get('/clientes/:id', async (req,resp, next) => {
    try {
        const cliente = await service.buscarClientePorId(req.params.id);
        resp.status(200).send(cliente);

    } catch(err) {
        next(err);
    }
});

endpoints.post('/clientes', async (req,resp, next) => {
    try {
        const novoCliente = await service.criarCliente(req.body);
        resp.status(201).send({ id: novoCliente });
    } catch(err) {
        next(err);
    }
});



export default endpoints;