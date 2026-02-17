import contaController from '../controllers/contaController.js';
import pedidoController from '../controllers/pedidoController.js';

export function addRoutes(API) {
    API.use(contaController);
    API.use(pedidoController);
}

