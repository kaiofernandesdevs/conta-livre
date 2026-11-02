import { Router } from "express";

import * as service from '../services/itemContaService.js'; 

const endpoints = Router();

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