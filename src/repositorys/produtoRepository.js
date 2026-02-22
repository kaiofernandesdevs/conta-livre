import { connection } from "./connection.js";

export async function criarProduto(novoProduto) {
    const comando = `INSERT INTO produto (nome,descricao,preco) VALUES(?,?,?)`;

    const [info] = await connection.query(comando,[
        novoProduto.nome,
        novoProduto.descricao,
        novoProduto.preco
    ]);
    return info.insertId;
}

export async function listarProdutos() {
    const comando = `SELECT * FROM produto WHERE status = 'ATIVO';`;

    const [info] = await connection.query(comando);
    return info;
}

export async function buscarProdutoPorId(id) {
    const comando = `SELECT * FROM produto WHERE id = ?`;

    const [info] = await connection.query(comando,[id]);
    return info[0];
}

export async function atualizarProduto(id,produto) {
    const comando = `UPDATE produto SET nome = ?, descricao = ?, preco = ? WHERE id = ?`;

    const [info] = await connection.query(comando, [
        produto.nome,
        produto.descricao,
        produto.preco,
        id
    ]);
    return info.affectedRows;
}

export async function inativarProduto(id) {
    const comando = `
        UPDATE produto SET status = 'INATIVO' WHERE id = ?;`;

    const [resultado] = await connection.query(comando, [id]);
    return resultado.affectedRows;
}


