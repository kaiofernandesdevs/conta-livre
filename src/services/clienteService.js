import clienteRepository from '../repositorys/clienteRepository.js';

export async function listarClientes() {
    return await clienteRepository.listarClientes();
}

export async function criarCliente(novoCliente) {
    if(!novoCliente.nome || novoCliente.nome.trim() == '') {
        const erro = new Error("Nome do cliente deve ser obrigatorio");
        erro.status = 400;
        throw erro;
    }

    return await clienteRepository.criarCliente(novoCliente);
}

export async function buscarClientePorId(id) {
    if(!id) {
        const erro = new Error("id do cliente deve ser obrigatorio");
        erro.status = 400;
        throw erro;
    }
    const cliente = await clienteRepository.buscarClientePorId(id);
    if(!cliente) {
        const erro = new Error("Id não encontrado");
        erro.status = 404;
        throw erro;
    }
    return cliente;
}

