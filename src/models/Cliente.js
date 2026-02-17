export default class Cliente {
    constructor({id, nome, criado_em}) {
        this.id = id;
        this.nome = nome;
        this.criadoEm = criado_em;
    }

    nomeFormatado() {
        return this.nome.toUpperCase();
    }

}