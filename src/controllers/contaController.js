import { Router } from "express";
import * as service from '../services/contaService.js';

const endpoints = Router();


endpoints.get('/contas', async (req, resp) => {
    try {
        const listaContas = await service.listarContas();
        resp.status(200).send(listaContas);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.post('/contas', async (req, resp) => {
    try {
        const { clienteId } = req.body;
        if (!clienteId) {
            return resp.status(400).send({ erro: "id do cliente é obrigatório" });
        }
        const novoId = await service.abrirConta(clienteId);
        resp.status(201).send({ id: novoId });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.delete('/contas/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        if (!id) {
            return resp.status(400).send({ erro: "id da conta é obrigatorio" });
        }
        await service.deletarConta(id);
        resp.status(200).send({ msg: "conta deletada" });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.patch('/contas/:id/fechar', async (req, resp) => {
    try {
        const { id } = req.params;
        if (!id) {
            return resp.status(400).send({ erro: "id da conta é obrigatorio" });
        }
        await service.fecharConta(id);
        resp.status(200).send({msg: 'Conta fechada com sucesso'});

    } catch (err) {
        resp.status(400).send({erro: err.message});
    }
});


export default endpoints;