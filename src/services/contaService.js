import * as contaRepository from '../repositorys/contaRepository.js';
import * as pedidoRepository from '../repositorys/pedidoRepository.js';

export async function abrirConta(clienteId) {
  if (!clienteId) {
    const erro = new Error("Nome do cliente deve ser obrigatorio");
    erro.status = 400;
    throw erro;
  }

  const contaAberta = await contaRepository.buscarContaAbertaCliente(clienteId);

  if (contaAberta) {
    const erro = new Error("Cliente já possui conta aberta");
    erro.status = 409;
    throw erro;
  }

  return await contaRepository.criarConta(clienteId);
}

export async function listarContas() {
  return await contaRepository.listarContas();
}

export async function deletarConta(contaId) {
  if (!contaId) {
    const erro = new Error("id da conta deve ser obrigatorio");
    erro.status = 400;
    throw erro;
  }

  const resposta = await contaRepository.deletarConta(contaId);

  if (resposta.affectedRows === 0) {
    const erro = new Error("id da conta nao encontrado");
    erro.status = 404;
    throw erro;
  }

  return true;
}

export async function fecharConta(contaId) {
  if (!contaId) {
      const erro = new Error("id da conta deve ser obrigatorio");
      erro.status = 400;
      throw erro;
  }
  const conta = await contaRepository.buscarContaPorId(contaId);

  if (!conta) {
      const erro = new Error("Conta nao encontrada");
      erro.status = 404;
      throw erro;
  }

  if (conta.status === 'FECHADA') {
    const erro = new Error("Conta do cliente já se encontra fechada");
    erro.status = 409;
    throw erro;
  }
  const pedidoAberto = await pedidoRepository.buscarPedidoAberto(contaId);

  if (pedidoAberto) {
    const erro = new Error("Conta nao pode ser fechada por ter pedidos abertos");
    erro.status = 409;
    throw erro;
  }
  await contaRepository.fecharConta(contaId);
  return true;
}