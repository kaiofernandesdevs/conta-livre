import { Router } from "express";
import * as service from '../services/contaService.js';

const endpoints = Router();


endpoints.get('/contas', async (req, resp, next) => {
    try {
        const listaContas = await service.listarContas();
        resp.status(200).send(listaContas);
    } catch (err) {
        next(err);
    }
});


endpoints.post('/contas', async (req, resp, next) => {
    try {
        const novoId = await service.abrirConta(req.body.clienteId);
        resp.status(201).send({ id: novoId });
    } catch (err) {
        next(err);
    }
});


endpoints.delete('/contas/:id', async (req, resp, next) => {
    try {
        await service.deletarConta(req.params.id);
        resp.status(200).send({ msg: "conta deletada" });
    } catch (err) {
        next(err);
    }
});

endpoints.patch('/contas/:id/fechar', async (req, resp, next) => {
    try {
        await service.fecharConta(req.params.id);
        resp.status(200).send({ msg: 'Conta fechada com sucesso' });

    } catch (err) {
        next(err);
    }
});


export default endpoints;