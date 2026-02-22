import { connection } from "./connection.js";

export async function criarCliente(novoCliente) {
    const comando = `INSERT INTO cliente(id,nome,criado_em) VALUES (?,?,NOW())`;

    const [info] = await connection.query(comando,[
        novoCliente.nome
    ]);
    return info.insertId(novoCliente);
}

export async function listarClientes() {
    const comando = `SELECT * FROM cliente`;

    const [info] = await connection.query(comando);
    return info;
}