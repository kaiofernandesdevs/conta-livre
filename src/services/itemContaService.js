import * as itemContaRepository from '../repositorys/itemContaRepository.js';
import * as contaRepository from '../repositorys/contaRepository.js';
import * as produtoRepository from '../repositorys/produtoRepository.js';

export async function adicionarItemConta(contaId, produtoId, quantidade) {
    if (!contaId || !produtoId || !quantidade) {
        const erro = new Error("contaId, produtoId e quantidade são obrigatórios");
        erro.status = 400;
        throw erro;
    }

    if (quantidade <= 0) {
        const erro = new Error("Quantidade deve ser maior que zero");
        erro.status = 400;
        throw erro;
    }

    const conta = await contaRepository.buscarContaPorId(contaId);
    if (!conta) {
        const erro = new Error("Conta não encontrada");
        erro.status = 404;
        throw erro;
    }

    if (conta.status === 'PAGO') {
        const erro = new Error("Não é possível adicionar itens. Esta conta já possui o status PAGO.");
        erro.status = 409;
        throw erro;
    }

    const produto = await produtoRepository.buscarProdutoPorId(produtoId);
    if (!produto) {
        const erro = new Error("Produto não encontrado");
        erro.status = 404;
        throw erro;
    }

    if (!produto.disponivel) {
        const erro = new Error("Este produto está indisponível e não pode ser vendido");
        erro.status = 409;
        throw erro;
    }

    const idItem = await itemContaRepository.adicionarItemConta(contaId, produtoId, quantidade, produto.preco);

    await contaRepository.atualizarTotalConta(contaId);

    return idItem;
}

export async function listarItensDaConta(contaId) {
    if (!contaId) {
        const erro = new Error("Id da conta é obrigatório");
        erro.status = 400;
        throw erro;
    }

    const conta = await contaRepository.buscarContaPorId(contaId);
    if (!conta) {
        const erro = new Error("Conta não encontrada");
        erro.status = 404;
        throw erro;
    }

    return await itemContaRepository.listarItensDaConta(contaId);
}

export async function atualizarQuantidadeItem(contaId, itemId, quantidade) {
    if (!contaId || !itemId || !quantidade) {
        const erro = new Error("contaId, itemId e quantidade são obrigatórios");
        erro.status = 400;
        throw erro;
    }

    if (quantidade <= 0) {
        const erro = new Error("Quantidade deve ser maior que zero");
        erro.status = 400;
        throw erro;
    }

    const conta = await contaRepository.buscarContaPorId(contaId);
    if (conta.status === 'PAGO') {
        const erro = new Error("Não é possível editar itens de uma conta já paga.");
        erro.status = 409;
        throw erro;
    }

    const item = await itemContaRepository.buscarItemPorId(itemId);
    if (!item) {
        const erro = new Error("Item não encontrado");
        erro.status = 404;
        throw erro;
    }

    await itemContaRepository.atualizarQuantidadeItem(itemId, quantidade);

    await contaRepository.atualizarTotalConta(contaId);
    
    return true;
}

export async function removerItem(contaId, itemId) {
    if (!contaId || !itemId) {
        const erro = new Error("Id da conta e Id do item são obrigatórios");
        erro.status = 400;
        throw erro;
    }

    const conta = await contaRepository.buscarContaPorId(contaId);
    if (conta.status === 'PAGO') {
        const erro = new Error("Não é possível remover itens de uma conta já paga.");
        erro.status = 409;
        throw erro;
    }

    const item = await itemContaRepository.buscarItemPorId(itemId);
    if (!item) {
        const erro = new Error("Item não encontrado");
        erro.status = 404;
        throw erro;
    }

    await itemContaRepository.removerItem(itemId);
    await contaRepository.atualizarTotalConta(contaId);
    
    return true;
}