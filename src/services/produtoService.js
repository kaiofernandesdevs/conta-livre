import * as produtoRepository from '../repositorys/produtoRepository.js';

export async function criarProduto(novoProduto) {
    if (!novoProduto.nome || novoProduto.nome.trim() === '') {
        const erro = new Error("Nome do produto deve ser obrigatorio");
        erro.status = 400;
        throw erro;
    }
    if (!novoProduto.preco || novoProduto.preco <= 0) {
        const erro = new Error("Preco do produto deve ser valido");
        erro.status = 400;
        throw erro;
    }
    return await produtoRepository.criarProduto(novoProduto);
}

export async function listarProdutos() {
    return await produtoRepository.listaProdutos();
}

export async function buscarProdutoPorId(id) {
    if (!id) {
        const erro = new Error("Id do produto é necessario");
        erro.status = 400;
        throw erro;
    }
    const produto = await produtoRepository.buscarProdutoPorId(id);
    if (!produto) {
        const erro = new Error("Não foi possivel encontrar o produto");
        erro.status = 404;
        throw erro;
    }

    return produto;
}

export async function atualizarProduto(id, produto) {
    if (!produto.nome || produto.nome.trim() === '') {
        const erro = new Error("Nome do produto é obrigatorio para atualização");
        erro.status = 400;
        throw erro;
    }

    if (!produto.preco || produto.preco <= 0) {
        const erro = new Error("O preço do produto deve ser valido e maior que zero");
        erro.status = 400;
        throw erro;
    }

    const produtoAtualizado = await produtoRepository.atualizarProduto(id, produto);

    if (produtoAtualizado === 0) {
        const erro = new Error("Produto não foi encontrado");
        erro.status = 404;
        throw erro;
    }
    return true;
}

export async function inativarProduto(id) {
    const produtoInativado = await produtoRepository.inativarProduto(id);

    if (produtoInativado === 0) {
        const erro = new Error("Produto não foi encontrado para ser inativado");
        erro.status = 404;
        throw erro;
    }

    return true;
}