import * as produtoRepository from '../repositorys/produtoRepository.js';

export async function criarProduto(novoProduto) {
    if (!novoProduto.nome || novoProduto.nome.trim() === '') {
        throw new Error("Nome do Produto é obrigatorio");
    }
    if (!novoProduto.preco || novoProduto.preco <= 0) {
        throw new Error("O produto deve ter preco valido");
    }
    return await produtoRepository.criarProduto(novoProduto);
}

export async function listaProdutos() {
    return await produtoRepository.listaProdutos();
}

export async function buscarProdutoPorId(id) {
    if (!id) {
        throw new Error("Id é necessario");
    }
    const produto = await produtoRepository.buscarProdutoPorId(id);
    if (!produto) {
        throw new Error("produto nao encontrado");
    }

    return produto;
}

export async function atualizarProduto(id, produto) {
    if (!produto.nome || produto.nome.trim() === '') {
        throw new Error('Nome do produto é obrigatório');
    }

    if (!produto.preco || produto.preco <= 0) {
        throw new Error('Preço do produto deve ser maior que zero');
    }

    const produtoAtualizado = await produtoRepository.atualizarProduto(id, produto);

    if (produtoAtualizado === 0) {
        throw new Error('Produto não foi encontrado');
    }
    return true;
}

export async function inativarProduto(id) {
    const produtoInativado = await produtoRepository.inativarProduto(id);

    if (produtoInativado === 0) {
        throw new Error('Produto não foi encontrado');
    }

    return true;
}