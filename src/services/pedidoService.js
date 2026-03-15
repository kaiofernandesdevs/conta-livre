import * as pedidoRepository from '../repositorys/pedidoRepository.js';
import * as contaRepository from '../repositorys/contaRepository.js';

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
};

