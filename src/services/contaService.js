import * as contaRepository from '../repositorys/contaRepository.js';
import * as clienteRepository from '../repositorys/clienteRepository.js';
import * as pagamentoRepository from '../repositorys/pagamentoRepository.js';

export async function abrirConta(clienteId) {
    if (!clienteId) {
        const erro = new Error("O Id do cliente é obrigatório");
        erro.status = 400;
        throw erro;
    }

    const cliente = await clienteRepository.buscarClientePorId(clienteId);
    if (!cliente) {
        const erro = new Error("Cliente não encontrado");
        erro.status = 404;
        throw erro;
    }

    const contaAberta = await contaRepository.buscarContaAbertaCliente(clienteId);
    if (contaAberta) {
        const erro = new Error("Este cliente já possui uma conta EM_ABERTO");
        erro.status = 409;
        throw erro;
    }

    return await contaRepository.criarConta(clienteId);
}

export async function listarContas() {
    return await contaRepository.listarContas();
}

export async function buscarContaPorId(contaId) {
    if (!contaId) {
        const erro = new Error("Id da conta é obrigatório");
        erro.status = 400;
        throw erro;
    }
    return await contaRepository.buscarContaPorId(contaId);
}

export async function registrarPagamento(contaId, valorPagamento) {
    if (!contaId || !valorPagamento || valorPagamento <= 0) {
        const erro = new Error("O valor do pagamento deve ser maior que zero");
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
        const erro = new Error("Esta conta já está com status PAGO e não pode receber novos pagamentos");
        erro.status = 409;
        throw erro;
    }

    await pagamentoRepository.inserirPagamento(contaId, valorPagamento);


    const novoValorPago = Number(conta.valorPago) + Number(valorPagamento);

    await contaRepository.atualizarConta(contaId, {
        valorTotal: conta.valorTotal,
        valorPago: novoValorPago,
        desconto: conta.desconto
    });

    return novoValorPago;
}

export async function fecharConta(contaId, desconto = 0) {
    if (!contaId) {
        const erro = new Error("id da conta deve ser obrigatório");
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
        const erro = new Error("Conta do cliente já se encontra paga (fechada)");
        erro.status = 409;
        throw erro;
    }

    const valorComDesconto = Number(conta.valorTotal) - Number(desconto);

    if (Number(conta.valorPago) < valorComDesconto) {
        const erro = new Error(`Não é possível fechar a conta. Valor pago (${conta.valorPago}) é inferior ao total necessário (${valorComDesconto}).`);
        erro.status = 400;
        throw erro;
    }

    await contaRepository.atualizarConta(contaId, {
        valorTotal: conta.valorTotal,
        valorPago: conta.valorPago,
        desconto: desconto
    });

    await contaRepository.atualizarStatusConta(contaId, 'PAGO');

    return true;
}