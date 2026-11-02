import { Router } from "express";
import * as service from '../services/produtoService.js';

const endpoints = Router();

endpoints.get("/produtos", async (req, resp, next) => {
  try {
    const listaProdutos = await service.listarProdutos(); 
    resp.status(200).send(listaProdutos);
  } catch (err) {
    next(err);
  }
});

endpoints.post("/produtos", async (req, resp, next) => {
  try {
    const novoProduto = await service.criarProduto(req.body);
    resp.status(201).send({ id: novoProduto });
  } catch (err) {
    next(err);
  }
});

endpoints.get('/produtos/:id', async (req, resp, next) => {
  try {
    const produto = await service.buscarProdutoPorId(req.params.id);
    resp.status(200).send(produto); 
  } catch (err) {
    next(err);
  }
});

endpoints.put('/produtos/:id', async (req, resp, next) => {
  try {
    const { nome, descricao, preco } = req.body;
    const produtoAtualizado = await service.atualizarProduto(req.params.id, { nome, descricao, preco });
    resp.status(200).send(produtoAtualizado);
  } catch (err) {
    next(err);
  }
});


endpoints.patch('/produtos/:id/disponibilidade', async (req, resp, next) => {
  try {
    const { disponivel } = req.body;
    await service.alterarDisponibilidade(req.params.id, disponivel);
    resp.status(200).send({ mensagem: `Disponibilidade atualizada para ${disponivel}` });
  } catch (err) {
   next(err);
  }
});

export default endpoints;