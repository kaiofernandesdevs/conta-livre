import { Router } from "express";
import * as service from '../services/pedidoService.js';

const endpoints = Router();


endpoints.get('/contas/:id/pedidos', async (req,resp, next) => {
    try {
        const {id} = req.params;
        const pedidos = await service.listarPedidos(id);
        resp.status(200).send(pedidos);

    } catch(err) {
        next(err);
    }
});

endpoints.post('/contas/:id/pedidos', async (req,resp, next) => {
    try {
        const { id } = req.params;

        const novoPedidoId = await service.criarPedido(id);

        resp.status(201).send({ id: novoPedidoId });

    } catch (err) {
       next(err);
    }
});

export default endpoints;