export default class ItemPedido {
    
    constructor({id,pedido_id,produto_id,quantidade,preco_unitario}) {
        this.id = id;
        this.pedidoId = pedido_id;
        this.produtoId = produto_id;
        this.quantidade = quantidade;
        this.precoUnitario = preco_unitario;
    }

    subTotal() {
        return this.quantidade * this.precoUnitario;
    }


}