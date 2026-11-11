import { Router } from "express";
import * as service from '../services/contaService.js';

const endpoints = Router();

/**
 * @openapi
 * /contas:
 *   post:
 *     summary: Cria uma nova conta para um cliente
 *     tags:
 *       - Contas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteId
 *             properties:
 *               clienteId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Conta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: ID do cliente é obrigatório
 *       409:
 *         description: Cliente já possui conta aberta
 */


endpoints.get('/contas', async (req, resp, next) => {
    try {
        const listaContas = await service.listarContas();
        resp.status(200).send(listaContas);
    } catch (err) {
        next(err);
    }
});


endpoints.get('/contas/:id', async (req, resp, next) => {
    try {
        const conta = await service.buscarContaPorId(req.params.id);
        resp.status(200).send(conta);
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


endpoints.post('/contas/:id/pagamentos', async (req, resp, next) => {
    try {
        const { id } = req.params;
        const { valorPagamento } = req.body;
        
        const novoValorPago = await service.registrarPagamento(id, valorPagamento);
        
        resp.status(200).send({ 
            msg: "Pagamento registrado com sucesso",
            valorPagoAtualizado: novoValorPago 
        });
    } catch (err) {
        next(err);
    }
});


endpoints.patch('/contas/:id/fechar', async (req, resp, next) => {
    try {
        const { id } = req.params;
        const { desconto } = req.body; 
        
        await service.fecharConta(id, desconto || 0);
        
        resp.status(200).send({ msg: 'Conta fechada (PAGA) com sucesso' });
    } catch (err) {
        next(err);
    }
});

export default endpoints;