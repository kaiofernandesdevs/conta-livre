import { connection } from "./connection.js";

export async function criarConta(clienteId) {
    const comando = `INSERT INTO conta (id_cliente,status,criada_em) values (?,'ABERTA',NOW());`;

    const [info] = await connection.query(comando, [clienteId] )
    return info.insertId;
};

export async function buscarContaPorId(contaId) {
    const comando = `SELECT * FROM conta WHERE id = ?`;
    const [info] = await connection.query(comando, [contaId]);
    return info[0];
}

export async function listarContas() {
    const comando = `SELECT * FROM conta;`;
    const [info] = await connection.query(comando);
    return info;
};

export async function buscarContaAbertaCliente(clienteId) {
    const comando = `
    SELECT * FROM conta WHERE id_cliente = ? AND status = 'ABERTA';`;

    const [info] = await connection.query(comando, [clienteId]);
    return info[0];
};

export async function deletarConta(contaId) {
    const comando = `DELETE FROM CONTA WHERE id = ?`;

    const [info] = await connection.query(comando,[contaId]);
    return info;
};

export async function fecharConta(contaId) {
    const comando = `UPDATE conta SET status = 'FECHADA' WHERE id = ?`;

    const [info] = await connection.query(comando,[contaId]);
    return info;
}