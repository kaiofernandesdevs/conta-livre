import contaController from '../controllers/contaController.js';
import pedidoController from '../controllers/pedidoController.js';
import produtoController from '../controllers/produtoController.js';
import clienteController from '../controllers/clienteController.js';
import { errorMiddleware } from '../middlewares/errorMiddleware.js';

export function addRoutes(API) {
    API.use(contaController);
    API.use(pedidoController);
    API.use(produtoController);
    API.use(clienteController);
    API.use(errorMiddleware);
}

