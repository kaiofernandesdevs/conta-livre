import * as contaRepository from '../repository/contaRepository.js';
import * as pedidoRepository from '../repository/pedidoRepository.js';

export async function abrirConta(clienteId) {  
  if (!clienteId) {
    throw new Error('Id do cliente é obrigatório');
  }

  const contaAberta = await contaRepository.buscarContaAbertaCliente(clienteId);

  if (contaAberta) {
    throw new Error('Cliente já possui conta aberta');
  }

  return await contaRepository.criarConta(clienteId);
}

export async function listarContas() {
  return await contaRepository.listarContas();
}

export async function deletarConta(contaId) {
  if (!contaId) {
    throw new Error('Id da conta é obrigatorio');
  }

  const resposta = await contaRepository.deletarConta(contaId);

  if (resposta.affectedRows === 0) {
    throw new Error('Conta não encontrada');
  }

  return true;
}

export async function fecharConta(contaId) {
    if (!contaId) {
    throw new Error('Id é obrigatorio');
  }
  const conta = await contaRepository.buscarContaPorId(contaId);

  if(!conta) {
    throw new Error('Conta não existe');
  }

  if (conta.status === 'FECHADA') {
    throw new Error('Conta já esta fechada');
  }
  const pedidoAberto = await pedidoRepository.buscarPedidoAberto(contaId);

  if(pedidoAberto) {
    throw new Error('Conta nao pode ser fechada por ter pedidos abertos');
  }

  await contaRepository.fecharConta(contaId);
  return true;
}