import { Router } from "express";
import * as service from '../services/pedidoService.js';

const endpoints = Router();


endpoints.get('/contas/:id/pedidos', async (req,resp) => {
    try {
        const {id} = req.params;
        const pedidos = await service.listarPedidos(id);
        resp.send(pedidos);

    } catch(err) {
        resp.status(500).send({erro: err.message});
    }
});

endpoints.post('/contas/:id/pedidos', async (req,resp) => {
    try {
        const { id } = req.params;

        const novoPedidoId = await service.criarPedido(id);

        resp.status(201).send({ id: novoPedidoId });

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

export default endpoints;