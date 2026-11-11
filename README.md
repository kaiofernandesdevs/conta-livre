# ContraLivre API

API REST para gerenciamento de contas de clientes em bares e restaurantes. O sistema permite abrir contas, registrar itens consumidos, controlar pagamentos e manter produtos e clientes em um fluxo simples e organizado.

## Visão geral

- Cadastro e consulta de clientes
- Abertura e fechamento de contas
- Adição, atualização e remoção de itens da conta
- Registro de pagamentos
- Cadastro e controle de produtos
- Documentação interativa via Swagger

## Stack

- Node.js
- Express.js
- MySQL + mysql2
- Swagger
- dotenv
- CORS

## Pré-requisitos

- Node.js 20+
- MySQL 8+
- npm

## Instalação

```bash
git clone <url-do-repositorio>
cd conta-livre
npm install
cp .env.exemple .env
```

Configure o arquivo `.env`:

```env
PORT=5010
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PWD=sua_senha
MYSQL_DB=contalivre
```

> O arquivo `.env` não deve ser enviado para o repositório.

## Como executar

Modo desenvolvimento:

```bash
npm start
```

A API ficará disponível em:

- http://localhost:5010
- http://localhost:5010/api-docs

## Estrutura do projeto

```text
src/
├── app.js
├── config/
│   └── swagger.js
├── controllers/
│   ├── clienteController.js
│   ├── contaController.js
│   ├── itemContaController.js
│   └── produtoController.js
├── middlewares/
│   └── errorMiddleware.js
├── repositorys/
│   ├── connection.js
│   ├── clienteRepository.js
│   ├── contaRepository.js
│   ├── itemContaRepository.js
│   ├── pagamentoRepository.js
│   └── produtoRepository.js
├── routes/
│   └── routes.js
├── services/
│   ├── clienteService.js
│   ├── contaService.js
│   ├── itemContaService.js
│   └── produtoService.js
└──
```

## Endpoints principais

### Clientes

| Método | Rota | Descrição |
|---|---|---|
| GET | `/clientes` | Lista clientes |
| GET | `/clientes/:id` | Busca cliente por ID |
| POST | `/clientes` | Cria cliente |
| PUT | `/clientes/:id` | Atualiza cliente |

### Contas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/contas` | Lista contas |
| GET | `/contas/:id` | Busca conta por ID |
| POST | `/contas` | Abre uma conta |
| POST | `/contas/:id/pagamentos` | Registra pagamento |
| PATCH | `/contas/:id/fechar` | Fecha a conta |

### Produtos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/produtos` | Lista produtos |
| GET | `/produtos/:id` | Busca produto por ID |
| POST | `/produtos` | Cria produto |
| PUT | `/produtos/:id` | Atualiza produto |
| PATCH | `/produtos/:id/disponibilidade` | Altera disponibilidade |

### Itens da conta

| Método | Rota | Descrição |
|---|---|---|
| POST | `/contas/:contaId/itens` | Adiciona item à conta |
| GET | `/contas/:contaId/itens` | Lista itens da conta |
| PUT | `/contas/:contaId/itens/:itemId` | Atualiza item |
| DELETE | `/contas/:contaId/itens/:itemId` | Remove item |

## Banco de dados

O projeto usa MySQL com as tabelas principais:

- `cliente`
- `conta`
- `produto`
- `item_conta`
- `pagamento`

O esquema pode ser gerado de acordo com a estrutura do projeto e os serviços/repositórios existentes.

## Exemplo de fluxo

```bash
curl -X POST http://localhost:5010/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva"}'

curl -X POST http://localhost:5010/contas \
  -H "Content-Type: application/json" \
  -d '{"clienteId":1}'

curl -X POST http://localhost:5010/contas/1/itens \
  -H "Content-Type: application/json" \
  -d '{"produtoId":1,"quantidade":2}'

curl -X POST http://localhost:5010/contas/1/pagamentos \
  -H "Content-Type: application/json" \
  -d '{"valorPagamento":50}'
```

## Licença

ISC

## Observações

Este projeto está estruturado em camadas: controllers, services e repositories, mantendo a lógica de negócio separada do acesso ao banco de dados e da camada HTTP.
