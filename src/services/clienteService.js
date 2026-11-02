import * as clienteRepository from '../repositorys/clienteRepository.js';

export async function listarClientes() {
    return await clienteRepository.listarClientes();
}

export async function criarCliente(novoCliente) {
    if(!novoCliente.nome || novoCliente.nome.trim() == '') {
        const erro = new Error("Nome do cliente deve ser obrigatório");
        erro.status = 400;
        throw erro;
    }

    return await clienteRepository.criarCliente(novoCliente);
}

export async function buscarClientePorId(id) {
    if(!id) {
        const erro = new Error("id do cliente deve ser obrigatório");
        erro.status = 400;
        throw erro;
    }
    const cliente = await clienteRepository.buscarClientePorId(id);
    if(!cliente) {
        const erro = new Error("Cliente não encontrado");
        erro.status = 404;
        throw erro;
    }
    return cliente;
}


export async function atualizarCliente(id, clienteDados) {
    if (!id) {
        const erro = new Error("Id do cliente é obrigatório para atualização");
        erro.status = 400;
        throw erro;
    }

    if (!clienteDados.nome || clienteDados.nome.trim() === '') {
        const erro = new Error("Nome do cliente é obrigatório para atualização");
        erro.status = 400;
        throw erro;
    }

    const clienteExistente = await clienteRepository.buscarClientePorId(id);
    if (!clienteExistente) {
        const erro = new Error("Cliente não encontrado para atualização");
        erro.status = 404;
        throw erro;
    }

    await clienteRepository.atualizarCliente(id, clienteDados);
    
    return true;
}