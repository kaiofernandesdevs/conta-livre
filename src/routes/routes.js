import contaController from '../controller/contaController.js';
import pedidoController from '../controller/pedidoController.js';

export function addRoutes(API) {
    API.use(contaController);
    API.use(pedidoController);
}

