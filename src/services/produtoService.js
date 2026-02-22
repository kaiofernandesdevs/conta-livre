import * as produtoRepository from '../repositorys/produtoRepository.js';

export async function criarProduto(novoProduto) {
    if(!novoProduto.nome || novoProduto.nome.trim() === '') {
        throw new Error("Nome do Produto é obrigatorio");
    }

    if(!novoProduto.preco || novoProduto.preco <=0) {
        throw new Error("O produto deve ter preco valido");
    }

    return await produtoRepository.criarProduto(novoProduto);
}

export async function listaProdutos() {
    return await produtoRepository.listaProdutos();
}