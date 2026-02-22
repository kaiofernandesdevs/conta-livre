import { Router } from "express";
import * as service from '../services/clienteService.js';

const endpoints = Router();

endpoints.get('/clientes', async (req,resp) => {
    try {
        const listarClientes = await service.listarClientes();
        resp.status(200).send(listarClientes);
    } catch (err) {
        resp.status(400).send(err.message);
    }
});

endpoints.get('/clientes/:id', async (req,resp) => {
    try {
        const clienteId = await service.buscarClientePorId(req.params.id);
        resp.status(200).send(clienteId);

    } catch(err) {
        resp.status(404).send({erro: err.message});
    }
});

endpoints.post('/clientes', async (req,resp) => {
    try {
        const novoCliente = await service.criarCliente(req.body);
        resp.status(201).send(novoCliente);
    } catch(err) {
        resp.status(400).send({erro: err.message});
    }
});



export default endpoints;