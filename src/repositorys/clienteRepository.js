import { connection } from "./connection.js";

export async function criarCliente(novoCliente) {
    const comando = `INSERT INTO cliente(nome) VALUES (?)`;
    const [info] = await connection.query(comando,[novoCliente.nome]);
    return info.insertId;
}

export async function listarClientes() {
    const comando = `SELECT * FROM cliente`;
    const [info] = await connection.query(comando);
    return info;
}

export async function buscarClientePorId(id) {
    const comando = `SELECT * FROM cliente WHERE id = ?`;
    const [info] = await connection.query(comando, [id]);
    return info[0];
}



