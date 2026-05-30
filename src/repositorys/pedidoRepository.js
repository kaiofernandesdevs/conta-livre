import { connection } from "./connection.js";

export async function criarPedido(contaId) {
  const comando = `INSERT INTO pedido (conta_id,data,status) VALUES (?, NOW(), 'ABERTO')`;

  const [info] = await connection.query(comando, [contaId]);
  return info.insertId;
}

export async function listarPedidos(contaId) {
  const comando = `SELECT * FROM pedido WHERE conta_id = ? ORDER BY data DESC`;

  const [info] = await connection.query(comando, [contaId]);
  return info;
}

export async function buscarPedidoAberto(contaId) {
  const comando = `
      SELECT * FROM pedido WHERE conta_id = ? AND status = 'ABERTO' LIMIT 1`;

  const [rows] = await connection.query(comando, [contaId]);
  return rows.length ? rows[0] : null;
}

export async function buscarPedidoPorId(pedidoId) {
  const comando = `SELECT * FROM pedido WHERE id = ?`;
  const [info] = await connection.query(comando, [pedidoId]);
  return info[0];
}

export async function adicionarItem(pedidoId, produtoId, quantidade, precoUnitario) {
  const comando = `INSERT INTO item_pedido(pedido_id, produto_id, quantidade, preco_unitario)
    VALUES (?, ?, ?, ?)`;

  const [info] = await connection.query(comando, [pedidoId, produtoId, quantidade, precoUnitario]);
  return info.insertId;
}

export async function listarItens(pedidoId) {
  const comando = `SELECT * FROM item_pedido WHERE pedido_id = ?`;
  
  const [info] = await connection.query(comando, [pedidoId]);
  return info;
}

export async function calcularTotal(pedidoId) {
  const comando = `SELECT SUM(quantidade * preco_unitario) as total FROM item_pedido WHERE pedido_id = ?`;
  
  const [info] = await connection.query(comando, [pedidoId]);
  return info[0].total || 0;
}

export async function atualizarQuantidadeItem(itemId, quantidade, precoUnitario) {
  const comando = `UPDATE item_pedido SET quantidade = ? WHERE id = ?`;
  const [info] = await connection.query(comando, [quantidade, itemId]);
  return info.affectedRows;
}

export async function removerItem(itemId) {
  const comando = `DELETE FROM item_pedido WHERE id = ?`;
  const [info] = await connection.query(comando, [itemId]);
  return info.affectedRows;
}

export async function buscarItemPorId(itemId) {
  const comando = `SELECT * FROM item_pedido WHERE id = ?`;
  const [info] = await connection.query(comando, [itemId]);
  return info[0];
}

export async function fecharPedido(pedidoId) {
  const comando = `UPDATE pedido SET status = 'FECHADO' WHERE id = ?`;
  const [info] = await connection.query(comando, [pedidoId]);
  return info.affectedRows;
}


