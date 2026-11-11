import { Router } from "express";

import * as service from '../services/itemContaService.js'; 

const endpoints = Router();

/**
 * @openapi
 * /contas/{contaId}/itens:
 *   post:
 *     summary: Adiciona um produto à conta (RF09 / RN05 / RN07)
 *     tags: [Itens da Conta]
 *     parameters:
 *       - in: path
 *         name: contaId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [produtoId, quantidade]
 *             properties:
 *               produtoId:
 *                 type: integer
 *                 example: 1
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item adicionado à conta com sucesso
 *       409:
 *         description: Conta paga ou produto indisponível
 *   get:
 *     summary: Lista todos os itens de consumo de uma conta
 *     tags: [Itens da Conta]
 *     parameters:
 *       - in: path
 *         name: contaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de itens consumidos
 * 
 * /contas/{contaId}/itens/{itemId}:
 *   put:
 *     summary: Atualiza a quantidade de um item da conta (RN06 / RN07)
 *     tags: [Itens da Conta]
 *     parameters:
 *       - in: path
 *         name: contaId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantidade]
 *             properties:
 *               quantidade:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Quantidade atualizada com sucesso
 *   delete:
 *     summary: Remove um item da conta (RN06 / RN07)
 *     tags: [Itens da Conta]
 *     parameters:
 *       - in: path
 *         name: contaId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removido da conta com sucesso
 */



endpoints.post('/contas/:contaId/itens', async (req, resp, next) => {
  try {
    const { contaId } = req.params;
    const { produtoId, quantidade } = req.body;
    
    const idItem = await service.adicionarItemConta(contaId, produtoId, quantidade);
    
    resp.status(201).send({ id: idItem });
  } catch (err) {
    next(err);
  }
});

endpoints.get('/contas/:contaId/itens', async (req, resp, next) => {
  try {
    const { contaId } = req.params;
    
    const itens = await service.listarItensDaConta(contaId);
    
    resp.status(200).send(itens);
  } catch (err) {
    next(err);
  }
});

endpoints.put('/contas/:contaId/itens/:itemId', async (req, resp, next) => {
  try {
    const { contaId, itemId } = req.params;
    const { quantidade } = req.body;
    
    await service.atualizarQuantidadeItem(contaId, itemId, quantidade);
    
    resp.status(200).send({ msg: 'Quantidade do item atualizada com sucesso' });
  } catch (err) {
    next(err);
  }
});

endpoints.delete('/contas/:contaId/itens/:itemId', async (req, resp, next) => {
  try {
    const { contaId, itemId } = req.params;
    
    await service.removerItem(contaId, itemId);
    
    resp.status(200).send({ msg: 'Item removido com sucesso' });
  } catch (err) {
    next(err);
  }
});

export default endpoints;