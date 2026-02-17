import * as pedidoRepository from '../repositorys/pedidoRepository.js';
import * as contaRepository from '../repositorys/contaRepository.js';

export async function criarPedido(contaId) {
    if (!contaId) {
        throw new Error('Id da conta é obrigatório');
    }
    const conta = await contaRepository.buscarContaPorId(contaId);
    if (!conta || conta.length === 0) {
        throw new Error('Conta não existe');
    }
    const contaEncontrada = conta[0];
    if (contaEncontrada.status === 'FECHADA') {
        throw new Error('Não é possível criar pedido para conta fechada');
    }
    return await pedidoRepo.criarPedido(contaId);
}


export async function listarPedidos(contaId) {
    if (!contaId) {
        throw new Error('Id da conta é obrigatorio');
    }
    return repo.listarPedidos(contaId);
};

