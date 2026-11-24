# Conta Livre

O Conta Livre é um sistema interno de comandas para bares e restaurantes. A equipe acompanha, por cliente, o consumo, o valor pago e o saldo de cada comanda.

## Fluxo de atendimento

1. Em **Clientes** e **Produtos**, cadastre o cliente e os produtos que serão vendidos. A disponibilidade de cada produto pode ser alterada no cadastro.
2. Em **Contas**, abra uma comanda para o cliente. A API verifica se já existe uma comanda em aberto para ele. A lista permite alternar entre **Em aberto** e **Pagas**.
3. Na comanda, lance os itens consumidos. Cada lançamento guarda o preço unitário do momento da venda. Alterar a quantidade ou remover um item recalcula o total.
4. Registre os pagamentos à medida que forem recebidos. A tela mostra o total do consumo, o valor pago e o saldo.
5. Informe um desconto, se aplicável, e confirme o fechamento. A comanda passa de `EM_ABERTO` para `PAGO` quando o valor pago cobre o total após o desconto.

## Executar localmente

Use Node.js 22, npm e MySQL 8. Se ainda precisar clonar o projeto, execute estes comandos.

```bash
git clone https://github.com/kaiofernandesdevs/conta-livre.git
cd conta-livre
```

### 1. Configurar a API

Na raiz do projeto, instale as dependências. Se ainda precisar criar o `.env`, copie o modelo.

```powershell
npm ci
Copy-Item .env.exemple .env
```

Em Bash, use `cp .env.exemple .env` para copiar o arquivo. Ajuste as credenciais do MySQL em `.env` e mantenha esse arquivo fora do controle de versão.

Se o PowerShell bloquear `npm.ps1`, use `npm.cmd` no lugar de `npm` nos comandos deste guia.

```env
PORT=5010
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PWD=sua_senha
MYSQL_DB=bar
```

### 2. Preparar o banco de dados

Em uma instalação nova, execute o SQL abaixo no MySQL antes de usar a API. O esquema inicial foi derivado das consultas em `src/repositorys/` e pressupõe um banco vazio. Se alterar `MYSQL_DB`, use o mesmo nome no SQL.

```sql
CREATE DATABASE IF NOT EXISTS bar CHARACTER SET utf8mb4;
USE bar;

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(12, 2) NOT NULL,
    disponivel BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

CREATE TABLE conta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clienteId INT NOT NULL,
    status ENUM('EM_ABERTO', 'PAGO') NOT NULL,
    valorTotal DECIMAL(12, 2) NOT NULL,
    valorPago DECIMAL(12, 2) NOT NULL,
    desconto DECIMAL(12, 2) NOT NULL,
    dataCriacao DATETIME NOT NULL,
    FOREIGN KEY (clienteId) REFERENCES cliente(id)
) ENGINE=InnoDB;

CREATE TABLE item_conta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contaId INT NOT NULL,
    produtoId INT NOT NULL,
    quantidade INT NOT NULL,
    valorUnitario DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (contaId) REFERENCES conta(id),
    FOREIGN KEY (produtoId) REFERENCES produto(id)
) ENGINE=InnoDB;

CREATE TABLE pagamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contaId INT NOT NULL,
    valor DECIMAL(12, 2) NOT NULL,
    dataPagamento DATETIME NOT NULL,
    FOREIGN KEY (contaId) REFERENCES conta(id)
) ENGINE=InnoDB;
```

### 3. Iniciar a API e o frontend

Na raiz do projeto, inicie a API com recarregamento automático via Nodemon.

```bash
npm start
```

A API escuta na porta `5010` por padrão. Abra o [Swagger](http://localhost:5010/api-docs) para consultar e testar as operações documentadas.

Em outro terminal, também na raiz, inicie o frontend.

```bash
npm --prefix frontend ci
npm --prefix frontend run dev
```

Abra o endereço exibido pelo Vite, normalmente [localhost:5173](http://localhost:5173). Em desenvolvimento e na prévia do build, o proxy do Vite remove `/api` do caminho e encaminha as requisições para `http://localhost:5010`.

Se alterar `PORT` na API, ajuste o destino do proxy em `frontend/vite.config.js` ou defina `VITE_API_URL` em `frontend/.env.local` com o endereço completo da API, por exemplo `http://localhost:5020`. O Swagger usa a porta `5010` por padrão. Se mudar a porta, ajuste também o endereço do servidor em `src/config/swagger.js` para executar requisições pelo Swagger.

## Rotas da API

As rotas abaixo são relativas ao endereço da API. O prefixo `/api` é usado pelo proxy do frontend.

| Método | Rota | Operação |
| --- | --- | --- |
| GET | `/clientes` | Listar clientes |
| GET | `/clientes/:id` | Consultar cliente |
| POST | `/clientes` | Cadastrar cliente |
| PUT | `/clientes/:id` | Atualizar cliente |
| GET | `/produtos` | Listar produtos |
| GET | `/produtos/:id` | Consultar produto |
| POST | `/produtos` | Cadastrar produto |
| PUT | `/produtos/:id` | Atualizar produto |
| PATCH | `/produtos/:id/disponibilidade` | Alterar a disponibilidade |
| GET | `/contas` | Listar comandas |
| GET | `/contas/:id` | Consultar comanda |
| POST | `/contas` | Abrir comanda |
| POST | `/contas/:id/pagamentos` | Registrar pagamento |
| PATCH | `/contas/:id/fechar` | Fechar comanda |
| GET | `/contas/:contaId/itens` | Listar itens |
| POST | `/contas/:contaId/itens` | Adicionar item |
| PUT | `/contas/:contaId/itens/:itemId` | Atualizar a quantidade |
| DELETE | `/contas/:contaId/itens/:itemId` | Remover item |

## Compilar e instalar o aplicativo

```bash
npm --prefix frontend run build
npm --prefix frontend run preview
```

O build verifica os tipos do TypeScript e gera `frontend/dist`. Para instalar o app no celular, abra o build por HTTPS e use a opção de instalação do navegador. Em caso de falha de conexão ao carregar a página, o service worker exibe uma mensagem para reconectar. As operações dependem de acesso à API.

Na hospedagem estática, configure um proxy que encaminhe `/api` com a mesma reescrita do Vite ou defina `VITE_API_URL` antes do build. A API opera sem autenticação. Os passos para testar a instalação por HTTPS na rede local estão no [README do frontend](frontend/README.md).

## Arquitetura

O frontend usa React, TypeScript, Vite e TanStack Query. A API REST usa Node.js e Express, com documentação interativa pelo Swagger. Os controllers tratam HTTP, os services aplicam as regras das comandas e os repositórios usam `mysql2` para acessar o MySQL.

| Caminho | Responsabilidade |
| --- | --- |
| `src/app.js` | Inicialização do Express |
| `src/routes/` e `src/controllers/` | Rotas, requisições e respostas da API |
| `src/services/` | Regras de negócio |
| `src/repositorys/` | Conexão e consultas ao MySQL |
| `src/config/` e `src/middlewares/` | Configuração do Swagger e tratamento de erros |
| `frontend/src/` | Telas e integração com a API |
| `frontend/public/` | Manifesto, ícones e service worker |

## Licença

ISC, conforme o `package.json` da API.
