ContraLivre é uma aplicação full stack desenvolvida para gerenciar contas de clientes em estabelecimentos como bares e restaurantes. O sistema permite a abertura e o controle de contas, registro de pedidos e organização do fluxo de consumo, substituindo o uso de anotações manuais em cadernos físicos por um processo digital estruturado.
O projeto foi desenvolvido utilizando as seguintes tecnologias:

Node.js – Ambiente de execução JavaScript no backend

Express.js – Framework para construção da API REST

MySQL – Banco de dados relacional para persistência das informações

JavaScript (ES6+) – Linguagem principal da aplicação

dotenv – Gerenciamento de variáveis de ambiente

A aplicação segue uma arquitetura em camadas (Controller, Service e Repository), garantindo separação de responsabilidades, organização do código e facilidade de manutenção e evolução do sistema.

A aplicação segue o padrão Service + Repository Pattern, organizada em camadas:

- Controller → Service → Repository → Banco de Dados

- Controller → Recebe requisições HTTP e retorna respostas

- Service → Contém as regras de negócio

- Repository → Responsável pelo acesso ao banco de dados

Essa separação garante organização, escalabilidade e facilidade de manutenção.
