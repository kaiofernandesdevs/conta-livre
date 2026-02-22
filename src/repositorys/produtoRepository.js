import { connection } from "./connection.js";

export async function criarProduto(novoProduto) {
    const comando = `INSERT INTO produto (nome,descricao,preco,status,criado_em) VALUES(?,?,?,'ABERTA',NOW())`;

    const [info] = await connection.query(comando,[
        novoProduto.nome,
        novoProduto.descricao,
        novoProduto.preco
    ]);
    return info.insertId;
}

export async function listaProdutos() {
    const comando = `SELECT * FROM produto`;

    const [info] = await connection.query(comando);
    return info;
}
