import * as pedidoRepository from '../repositorys/pedidoRepository.js';
import * as contaRepository from '../repositorys/contaRepository.js';
import * as produtoRepository from '../repositorys/produtoRepository.js';

export async function criarPedido(contaId) {
    if (!contaId) {
        const erro = new Error("Id da conta é obrigatorio");
        erro.status = 400;
        throw erro;
    }
    const conta = await contaRepository.buscarContaPorId(contaId);
    if (!conta) {
        const erro = new Error('Conta não existe');
        erro.status = 404;
        throw erro;
    }
    if (conta.status === 'FECHADA') {
        const erro = new Error("Não foi possivel criar pedido porque a conta se encontra fechada");
        erro.status = 409;
        throw erro;
    }
    return await pedidoRepository.criarPedido(contaId);
}


export async function listarPedidos(contaId) {
    if (!contaId) {
        const erro = new Error("Id da conta é obrigatorio");
        erro.status = 400;
        throw erro;
    }
    return await pedidoRepository.listarPedidos(contaId);
}

export async function adicionarItemPedido(pedidoId, produtoId, quantidade) {
    if (!pedidoId || !produtoId || !quantidade) {
        const erro = new Error("pedidoId, produtoId e quantidade são obrigatórios");
        erro.status = 400;
        throw erro;
    }

    if (quantidade <= 0) {
        const erro = new Error("Quantidade deve ser maior que zero");
        erro.status = 400;
        throw erro;
    }

    const pedido = await pedidoRepository.buscarPedidoPorId(pedidoId);
    if (!pedido) {
        const erro = new Error("Pedido não encontrado");
        erro.status = 404;
        throw erro;
    }

    if (pedido.status === 'FECHADO') {
        const erro = new Error("Não é possível adicionar itens em pedido fechado");
        erro.status = 409;
        throw erro;
    }

    const produto = await produtoRepository.buscarProdutoPorId(produtoId);
    if (!produto) {
        const erro = new Error("Produto não encontrado");
        erro.status = 404;
        throw erro;
    }

    if (produto.status === 'INATIVO') {
        const erro = new Error("Produto inativo não pode ser vendido");
        erro.status = 409;
        throw erro;
    }

    return await pedidoRepository.adicionarItem(pedidoId, produtoId, quantidade, produto.preco);
}

export async function listarItensPedido(pedidoId) {
    if (!pedidoId) {
        const erro = new Error("Id do pedido é obrigatorio");
        erro.status = 400;
        throw erro;
    }

    const pedido = await pedidoRepository.buscarPedidoPorId(pedidoId);
    if (!pedido) {
        const erro = new Error("Pedido não encontrado");
        erro.status = 404;
        throw erro;
    }

    return await pedidoRepository.listarItens(pedidoId);
}

export async function calcularTotalPedido(pedidoId) {
    if (!pedidoId) {
        const erro = new Error("Id do pedido é obrigatorio");
        erro.status = 400;
        throw erro;
    }

    return await pedidoRepository.calcularTotal(pedidoId);
}

export async function fecharPedido(pedidoId) {
    if (!pedidoId) {
        const erro = new Error("Id do pedido é obrigatorio");
        erro.status = 400;
        throw erro;
    }

    const pedido = await pedidoRepository.buscarPedidoPorId(pedidoId);
    if (!pedido) {
        const erro = new Error("Pedido não encontrado");
        erro.status = 404;
        throw erro;
    }

    if (pedido.status === 'FECHADO') {
        const erro = new Error("Pedido já está fechado");
        erro.status = 409;
        throw erro;
    }

    await pedidoRepository.fecharPedido(pedidoId);
    
    // Atualizar o total da conta
    await contaRepository.atualizarTotalConta(pedido.conta_id);
    
    return true;
}

export async function atualizarQuantidadeItem(itemId, quantidade) {
    if (!itemId || !quantidade) {
        const erro = new Error("itemId e quantidade são obrigatórios");
        erro.status = 400;
        throw erro;
    }

    if (quantidade <= 0) {
        const erro = new Error("Quantidade deve ser maior que zero");
        erro.status = 400;
        throw erro;
    }

    const item = await pedidoRepository.buscarItemPorId(itemId);
    if (!item) {
        const erro = new Error("Item não encontrado");
        erro.status = 404;
        throw erro;
    }

    return await pedidoRepository.atualizarQuantidadeItem(itemId, quantidade, item.preco_unitario);
}

export async function removerItem(itemId) {
    if (!itemId) {
        const erro = new Error("Id do item é obrigatorio");
        erro.status = 400;
        throw erro;
    }

    const item = await pedidoRepository.buscarItemPorId(itemId);
    if (!item) {
        const erro = new Error("Item não encontrado");
        erro.status = 404;
        throw erro;
    }

    return await pedidoRepository.removerItem(itemId);
}

