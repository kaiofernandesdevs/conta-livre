export default class Pedido {
    constructor({id,conta_id,data,status}) {
        this.id = id;
        this.contaId = conta_id;
        this.data = data;
        this.status = status;
    }
}
