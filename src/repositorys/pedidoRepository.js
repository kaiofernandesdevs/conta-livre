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
      SELECT * FROM pedido WHERE conta_id = ? AND status = 'ABERTO'LIMIT 1`;

    const [rows] = await connection.query(comando, [contaId]);
    return rows.length ? rows[0] : null;
  }