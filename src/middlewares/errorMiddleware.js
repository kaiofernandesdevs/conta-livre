export function errorMiddleware(err, req, resp, next) {
    const status = err.status || 500;
    const msg = err.message || "Erro interno do servidor";
    resp.status(status).send({ erro: msg });
}

