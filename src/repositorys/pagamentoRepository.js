import { connection } from "./connection.js";

export async function inserirPagamento(contaId, valor) {
    const comando = `
        INSERT INTO pagamento (contaId, valor, dataPagamento) 
        VALUES (?, ?, NOW())
    `;
    const [info] = await connection.query(comando, [contaId, valor]);
    return info.insertId;
}

export async function listarPagamentosDaConta(contaId) {
    const comando = `SELECT * FROM pagamento WHERE contaId = ? ORDER BY dataPagamento DESC`;
    const [info] = await connection.query(comando, [contaId]);
    return info;
}