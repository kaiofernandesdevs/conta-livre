import { Router } from "express";
import * as service from '../services/clienteService.js';

const endpoints = Router();
/**
 * @openapi
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Silva
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Nome do cliente é obrigatório
 * 
 * /clientes/{id}:
 *   get:
 *     summary: Busca um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 *   put:
 *     summary: Atualiza os dados de um cliente (RF06)
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Roberto Silva
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */

endpoints.get('/clientes', async (req, resp, next) => {
    try {
        const listarClientes = await service.listarClientes();
        resp.status(200).send(listarClientes);
    } catch (err) {
        next(err);
    }
});

endpoints.get('/clientes/:id', async (req, resp, next) => {
    try {
        const cliente = await service.buscarClientePorId(req.params.id);
        resp.status(200).send(cliente);
    } catch(err) {
        next(err);
    }
});

endpoints.post('/clientes', async (req, resp, next) => {
    try {
        const novoCliente = await service.criarCliente(req.body);
        resp.status(201).send({ id: novoCliente });
    } catch(err) {
        next(err);
    }
});

endpoints.put('/clientes/:id', async (req, resp, next) => {
    try {
        const { nome } = req.body;
        await service.atualizarCliente(req.params.id, { nome });
        resp.status(200).send({ mensagem: "Cliente atualizado com sucesso" });
    } catch(err) {
        next(err);
    }
});

export default endpoints;