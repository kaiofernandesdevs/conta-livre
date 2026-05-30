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

endpoints.post('/contas/:contaId/pedidos/:pedidoId/itens', async (req, resp, next) => {
  try {
    const { contaId, pedidoId } = req.params;
    const { produtoId, quantidade } = req.body;
    
    const itemIdPedido = await service.adicionarItemPedido(pedidoId, produtoId, quantidade);
    resp.status(201).send({ id: itemIdPedido });
  } catch (err) {
    next(err);
  }
});

endpoints.get('/contas/:contaId/pedidos/:pedidoId/itens', async (req, resp, next) => {
  try {
    const { pedidoId } = req.params;
    const itensPedido = await service.listarItensPedido(pedidoId);
    const totalPedido = await service.calcularTotalPedido(pedidoId);
    resp.status(200).send({ itensPedido, totalPedido });
  } catch (err) {
    next(err);
  }
});

endpoints.patch('/contas/:contaId/pedidos/:pedidoId/fechar', async (req, resp, next) => {
  try {
    const { pedidoId } = req.params;
    await service.fecharPedido(pedidoId);
    resp.status(200).send({ msg: 'Pedido fechado com sucesso' });
  } catch (err) {
    next(err);
  }
});

endpoints.put('/contas/:contaId/pedidos/:pedidoId/itens/:itemId', async (req, resp, next) => {
  try {
    const { itemId } = req.params;
    const { quantidade } = req.body;
    await service.atualizarQuantidadeItem(itemId, quantidade);
    resp.status(200).send({ msg: 'Item atualizado com sucesso' });
  } catch (err) {
    next(err);
  }
});

endpoints.delete('/contas/:contaId/pedidos/:pedidoId/itens/:itemId', async (req, resp, next) => {
  try {
    const { itemId } = req.params;
    await service.removerItem(itemId);
    resp.status(200).send({ msg: 'Item removido com sucesso' });
  } catch (err) {
    next(err);
  }
});

export default endpoints;