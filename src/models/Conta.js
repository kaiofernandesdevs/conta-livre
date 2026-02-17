export default class conta {
    constructor({
        id,id_cliente,status,total,criada_em,fechada_em}) {
            this.id = id;
            this.idCliente = id_cliente;
            this.status = status;
            this.total = total;
            this.criadaEm = criada_em;
            this.fechadaEm = fechada_em;
    }


    isAberta() {
        return this.status === "ABERTA";
    }
}