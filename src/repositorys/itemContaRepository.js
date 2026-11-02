import { connection } from "./connection.js";

export async function adicionarItemConta(contaId, produtoId, quantidade, valorUnitario) {
    const comando = `
        INSERT INTO item_conta (contaId, produtoId, quantidade, valorUnitario)
        VALUES (?, ?, ?, ?)
    `;

    const [info] = await connection.query(comando, [
        contaId, 
        produtoId, 
        quantidade, 
        valorUnitario
    ]);
    return info.insertId;
}


export async function listarItensDaConta(contaId) {
    const comando = `SELECT * FROM item_conta WHERE contaId = ?`;
    
    const [info] = await connection.query(comando, [contaId]);
    return info;
}

export async function buscarItemPorId(itemId) {
    const comando = `SELECT * FROM item_conta WHERE id = ?`;
    const [info] = await connection.query(comando, [itemId]);
    return info[0];
}

export async function atualizarQuantidadeItem(itemId, quantidade) {
    const comando = `UPDATE item_conta SET quantidade = ? WHERE id = ?`;
    const [info] = await connection.query(comando, [quantidade, itemId]);
    return info.affectedRows;
}

export async function removerItem(itemId) {
    const comando = `DELETE FROM item_conta WHERE id = ?`;
    const [info] = await connection.query(comando, [itemId]);
    return info.affectedRows;
}