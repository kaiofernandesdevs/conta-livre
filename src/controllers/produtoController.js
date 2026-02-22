import { Router } from "express";
import * as service from '../services/produtoService.js';

const endpoints = Router();

endpoints.get("/produtos", async (req, resp) => {
  try {
    const listaProdutos = await service.listaProdutos();
    resp.status(200).send(listaProdutos);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


endpoints.post("/produtos", async (req, resp) => {
  try {
    const { produtoId } = req.params;
    if (!produtoId) {
      throw new Error("Id não informado");
    }
    const novoProduto = await service.criarProduto(produtoId);
    resp.status(201).send({ id: produtoId });

  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


export default endpoints;


