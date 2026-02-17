import contaController from '../controllers/contaController.js';
import pedidoController from '../controllers/pedidoController.js';
import produtoController from '../controllers/produtoController.js';


export function addRoutes(API) {
    API.use(contaController);
    API.use(pedidoController);
    API.use(produtoController);
}

