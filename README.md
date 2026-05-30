# 🍺 ContraLivre - Gestão de Contas para Bares e Restaurantes

ContraLivre é uma aplicação desenvolvida para gerenciar contas de clientes em estabelecimentos como bares e restaurantes. O sistema permite a abertura e o controle de contas, registro de pedidos e organização do fluxo de consumo, substituindo o uso de anotações manuais em cadernos físicos por um processo digital estruturado.

---

## 📚 Índice

- [🛠️ Stack Tecnológico](#-stack-tecnológico)
- [📦 Instalação](#-instalação)
- [⚙️ Configuração](#️-configuração)
- [🚀 Como Rodar](#-como-rodar)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔌 Endpoints da API](#-endpoints-da-api)
- [💾 Banco de Dados](#-banco-de-dados)
- [🏗️ Padrões de Arquitetura](#️-padrões-de-arquitetura)

---

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | v22+ | Ambiente de execução JavaScript no backend |
| **Express.js** | ^5.2.1 | Framework para construção da API REST |
| **MySQL** | Relacional | Banco de dados para persistência |
| **MySQL2** | ^3.16.0 | Driver MySQL para Node.js |
| **Nodemon** | ^3.1.11 | Auto-restart em modo desenvolvimento |
| **CORS** | ^2.8.5 | Habilitação de requisições cross-origin |
| **dotenv** | ^17.2.3 | Gerenciamento de variáveis de ambiente |

---

## 📦 Instalação

### Pré-requisitos
- Node.js v20+
- MySQL v8+
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/gestao-bar.git
cd gestao-bar
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.exemple .env
```
Edite o arquivo `.env` com suas configurações:
```env
PORT=5010
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PWD=sua_senha_aqui
MYSQL_DB=bar
```

4. **Configure o banco de dados**

Crie o banco de dados e as tabelas executando o script SQL:

```bash
mysql -u root -p < script-banco.sql
```

Ou execute os comandos manualmente no MySQL:

```sql
CREATE DATABASE bar;
USE bar;

-- Executar todos os CREATEs TABLE da seção "Banco de Dados"
```

---

## ⚙️ Configuração

### Arquivo `.env`

O arquivo `.env` contém todas as variáveis de ambiente necessárias para a aplicação rodar. 

**⚠️ Importante:** Nunca commite o arquivo `.env` no Git (ele está no `.gitignore` por segurança).

Use o arquivo `.env.exemple` como referência para criar seu `.env` local:

```bash
cp .env.exemple .env
```

### Variáveis de Ambiente

| Variável | Exemplo | Descrição |
|----------|---------|-----------|
| `PORT` | `5010` | Porta em que a API rodará |
| `MYSQL_HOST` | `localhost` | Host do servidor MySQL |
| `MYSQL_USER` | `root` | Usuário do MySQL |
| `MYSQL_PWD` | `senha123` | Senha do MySQL |
| `MYSQL_DB` | `bar` | Nome do banco de dados |

---

## 🚀 Como Rodar

### Desenvolvimento (com auto-reload)
```bash
npm start
```

### Produção
```bash
node src/app.js
```

A API estará disponível em: **http://localhost:5010**

---

## 📁 Estrutura do Projeto

```
src/
├── app.js                 # Entrada da aplicação
├── controllers/           # Controladores (requisições HTTP)
│   ├── clienteController.js
│   ├── contaController.js
│   ├── pedidoController.js
│   └── produtoController.js
├── services/             # Lógica de negócio
│   ├── clienteService.js
│   ├── contaService.js
│   ├── pedidoService.js
│   └── produtoService.js
├── repositorys/          # Acesso ao banco de dados
│   ├── clienteRepository.js
│   ├── contaRepository.js
│   ├── pedidoRepository.js
│   ├── produtoRepository.js
│   └── connection.js
├── routes/               # Definição de rotas
│   └── routes.js
└── middlewares/          # Middlewares
    └── errorMiddleware.js
```

---

## 🔌 Endpoints da API

### 👥 **CLIENTES**

#### Listar todos os clientes
```
GET /clientes
```
**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "criado_em": "2026-05-29T10:30:00.000Z"
  }
]
```

#### Buscar cliente por ID
```
GET /clientes/:id
```

#### Criar cliente
```
POST /clientes
Content-Type: application/json

{
  "nome": "Maria Souza"
}
```
**Resposta (201):** `{ "id": 2 }`

---

### 💰 **CONTAS**

#### Listar todas as contas
```
GET /contas
```
**Resposta (200):**
```json
[
  {
    "id": 1,
    "id_cliente": 1,
    "status": "ABERTA",
    "total": 150.50,
    "criada_em": "2026-05-29T10:30:00.000Z",
    "fechada_em": null
  }
]
```

#### Abrir conta para cliente
```
POST /contas
Content-Type: application/json

{
  "clienteId": 1
}
```
**Resposta (201):** `{ "id": 1 }`

#### Fechar conta
```
PATCH /contas/:id/fechar
```
**Resposta (200):** `{ "msg": "Conta fechada com sucesso" }`

#### Deletar conta
```
DELETE /contas/:id
```
**Resposta (200):** `{ "msg": "conta deletada" }`

---

### 🛍️ **PRODUTOS**

#### Listar produtos ativos
```
GET /produtos
```
**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "Cerveja",
    "descricao": "Cerveja gelada",
    "preco": 12.00,
    "status": "ATIVO",
    "criado_em": "2026-05-29T10:30:00.000Z"
  }
]
```

#### Buscar produto por ID
```
GET /produtos/:id
```

#### Criar produto
```
POST /produtos
Content-Type: application/json

{
  "nome": "Refrigerante",
  "descricao": "Refrigerante gelado",
  "preco": 8.50
}
```
**Resposta (201):** `{ "id": 2 }`

#### Atualizar produto
```
PUT /produtos/:id
Content-Type: application/json

{
  "nome": "Cerveja Premium",
  "descricao": "Cerveja premium importada",
  "preco": 15.00
}
```
**Resposta (200):** `true`

#### Inativar produto
```
DELETE /produtos/:id
```
**Resposta (200):** `{ "mensagem": "Produto foi inativado" }`

---

### 📦 **PEDIDOS**

#### Listar pedidos da conta
```
GET /contas/:id/pedidos
```
**Resposta (200):**
```json
[
  {
    "id": 1,
    "conta_id": 1,
    "data": "2026-05-29T10:30:00.000Z",
    "status": "ABERTO"
  }
]
```

#### Criar pedido
```
POST /contas/:id/pedidos
```
**Resposta (201):** `{ "id": 1 }`

#### Fechar pedido
```
PATCH /contas/:contaId/pedidos/:pedidoId/fechar
```
**Resposta (200):** `{ "msg": "Pedido fechado com sucesso" }`

---

### 📋 **ITEMS DO PEDIDO**

#### Adicionar item ao pedido
```
POST /contas/:contaId/pedidos/:pedidoId/itens
Content-Type: application/json

{
  "produtoId": 1,
  "quantidade": 2
}
```
**Resposta (201):** `{ "id": 1 }`

#### Listar items do pedido
```
GET /contas/:contaId/pedidos/:pedidoId/itens
```
**Resposta (200):**
```json
{
  "itensPedido": [
    {
      "id": 1,
      "pedido_id": 1,
      "produto_id": 1,
      "quantidade": 2,
      "preco_unitario": 12.00
    }
  ],
  "totalPedido": 24.00
}
```

#### Atualizar quantidade do item
```
PUT /contas/:contaId/pedidos/:pedidoId/itens/:itemId
Content-Type: application/json

{
  "quantidade": 3
}
```
**Resposta (200):** `{ "msg": "Item atualizado com sucesso" }`

#### Remover item do pedido
```
DELETE /contas/:contaId/pedidos/:pedidoId/itens/:itemId
```
**Resposta (200):** `{ "msg": "Item removido com sucesso" }`

---

## 💾 Banco de Dados

### Tabelas

| Tabela | Descrição |
|--------|-----------|
| `cliente` | Dados dos clientes |
| `conta` | Contas abertas/fechadas |
| `produto` | Produtos disponíveis |
| `pedido` | Pedidos da conta |
| `item_pedido` | Items individuais dos pedidos |

### Schema SQL

```sql
CREATE TABLE cliente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  criado_em DATETIME DEFAULT NOW()
);

CREATE TABLE conta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  status ENUM('ABERTA','FECHADA') DEFAULT 'ABERTA',
  total DECIMAL(10,2) DEFAULT 0,
  criada_em DATETIME DEFAULT NOW(),
  fechada_em DATETIME NULL,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  preco DECIMAL(10,2) NOT NULL,
  status ENUM('ATIVO','INATIVO') DEFAULT 'ATIVO',
  criado_em DATETIME DEFAULT NOW()
);

CREATE TABLE pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conta_id INT NOT NULL,
  data DATETIME DEFAULT NOW(),
  status ENUM('ABERTO','FECHADO') DEFAULT 'ABERTO',
  FOREIGN KEY (conta_id) REFERENCES conta(id)
);

CREATE TABLE item_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  produto_id INT NOT NULL,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedido(id),
  FOREIGN KEY (produto_id) REFERENCES produto(id)
);
```

---

## 🏗️ Padrões de Arquitetura

### Camadas

```
Controller ──→ Service ──→ Repository ──→ Banco de Dados
   ↑             ↑            ↑
Requisições   Validações   Queries
   HTTP       Negócio       SQL
```

### Responsabilidades

- **Controller**: Recebe requisições HTTP e retorna respostas
- **Service**: Contém a lógica de negócio e validações
- **Repository**: Responsável pelo acesso ao banco de dados

Esta separação garante:
- ✅ Organização do código
- ✅ Escalabilidade
- ✅ Facilidade de manutenção
- ✅ Testabilidade
- ✅ Reutilização de código

---

## 🔐 Validações Implementadas

- ✅ Nome do cliente obrigatório
- ✅ Cliente não pode ter duas contas abertas
- ✅ Conta deve estar aberta para criar pedidos
- ✅ Pedido deve estar aberto para adicionar itens
- ✅ Produto deve estar ATIVO para ser vendido
- ✅ Quantidade deve ser maior que zero
- ✅ Não é possível fechar conta com pedidos abertos
- ✅ Total da conta atualiza automaticamente ao fechar pedido

---

## 📝 Códigos de Status HTTP

| Código | Significado |
|--------|------------|
| `200` | OK - Requisição bem-sucedida |
| `201` | Created - Recurso criado |
| `400` | Bad Request - Dados inválidos |
| `404` | Not Found - Recurso não encontrado |
| `409` | Conflict - Conflito de estado |
| `500` | Internal Server Error - Erro do servidor |

---

## 🚦 Exemplo de Fluxo Completo

```bash
# 1. Criar cliente
curl -X POST http://localhost:5010/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva"}'

# 2. Abrir conta
curl -X POST http://localhost:5010/contas \
  -H "Content-Type: application/json" \
  -d '{"clienteId":1}'

# 3. Criar pedido
curl -X POST http://localhost:5010/contas/1/pedidos

# 4. Adicionar item
curl -X POST http://localhost:5010/contas/1/pedidos/1/itens \
  -H "Content-Type: application/json" \
  -d '{"produtoId":1,"quantidade":2}'

# 5. Fechar pedido
curl -X PATCH http://localhost:5010/contas/1/pedidos/1/fechar

# 6. Fechar conta
curl -X PATCH http://localhost:5010/contas/1/fechar
```

---

## 📄 Licença

ISC

---

**Desenvolvido com dedicação para gestão eficiente de bares e restaurantes.**
