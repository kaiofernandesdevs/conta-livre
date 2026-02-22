import clienteRepository from '../repositorys/clienteRepository.js';

export async function listarClientes() {
    return await clienteRepository.listarClientes();
}

export async function criarCliente(novoCliente) {
    if(!cliente.nome || cliente.nome.trim() == '') {
        throw new Error("Nome do cliente é Obrigatorio");
    }

    return await clienteRepository.criarCliente(novoCliente);
}

export async function buscarClientePorId(id) {
    if(!id) {
        throw new Error("Id obigatorio");
    }
    const cliente = await clienteRepository.buscarClientePorId(id);
    if(!cliente) {
        throw new Error('Cliente não encontrado');
    }
    return cliente;
}

