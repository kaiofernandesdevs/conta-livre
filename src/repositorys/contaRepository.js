import { connection } from "./connection.js";

export async function criarConta(clienteId) {
    const comando = `INSERT INTO conta (clienteId, status, valorTotal, valorPago, desconto, dataCriacao) VALUES (?, 'EM_ABERTO', 0, 0, 0, NOW());`;

    const [info] = await connection.query(comando, [clienteId]);
    return info.insertId;
}

export async function buscarContaPorId(contaId) {
    const comando = `SELECT * FROM conta WHERE id = ?`;
    const [info] = await connection.query(comando, [contaId]);
    return info[0];
}


export async function listarContas() {
    const comando = `SELECT * FROM conta;`;
    const [info] = await connection.query(comando);
    return info;
}

export async function buscarContaAbertaCliente(clienteId) {
    const comando = `SELECT * FROM conta WHERE clienteId = ? AND status = 'EM_ABERTO';`;
    const [info] = await connection.query(comando, [clienteId]);
    return info[0];
}


export async function atualizarConta(contaId, dadosConta) {
    const comando = `UPDATE conta SET valorTotal = ?, valorPago = ?, desconto = ? WHERE id = ?`;

    const [info] = await connection.query(comando, [
        dadosConta.valorTotal,
        dadosConta.valorPago,
        dadosConta.desconto,
        contaId
    ]);
    return info.affectedRows;
}

export async function atualizarStatusConta(contaId, status) {
    const comando = `UPDATE conta SET status = ? WHERE id = ?`;
    const [info] = await connection.query(comando, [status, contaId]);
    return info.affectedRows;
}


export async function atualizarTotalConta(contaId) {
    const comando = `UPDATE conta SET valorTotal = (SELECT COALESCE(SUM(quantidade * valorUnitario), 0) FROM item_conta WHERE contaId = ?) WHERE id = ?`;

    const [info] = await connection.query(comando, [contaId, contaId]);
    return info.affectedRows;
}