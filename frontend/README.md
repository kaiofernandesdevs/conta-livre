# Conta Livre

App interno da equipe para gerenciar comandas, clientes e produtos.

## Desenvolvimento

Configure o MySQL e inicie a API conforme o README da raiz. Em outro terminal, na raiz do repositório, execute os comandos abaixo.

```bash
npm --prefix frontend ci
npm --prefix frontend run dev
```

Abra o endereço indicado pelo Vite. Por padrão, o frontend chama `/api` no mesmo endereço e o Vite encaminha as requisições para `http://localhost:5010`. Para usar outra URL, defina `VITE_API_URL` em `frontend/.env.local` antes de iniciar ou compilar o app. Em hospedagem estática, configure um proxy equivalente ou defina essa variável antes do build.

## Build e instalação

```bash
npm --prefix frontend run build
npm --prefix frontend run preview
```

O build sai em `frontend/dist`. O manifesto e o service worker ficam disponíveis no build de produção. Para instalar no celular, abra o frontend por HTTPS e use a opção de instalação do navegador. As operações usam a API através do proxy da prévia ou do endereço definido em `VITE_API_URL`.

## Prévia HTTPS na rede local

Com `frontend/.https/server.crt` e `frontend/.https/server.key` gerados para o IPv4 do computador, execute na raiz, via PowerShell:

```powershell
$env:CONTA_LIVRE_TLS = '1'
npm --prefix frontend run preview -- --host <IPv4-do-computador> --port 4443 --strictPort
```

Abra `https://<IPv4-do-computador>:4443` pelo celular conectado ao mesmo Wi-Fi. Se usar a autoridade certificadora local de teste, instale e confie somente no arquivo público `frontend/.https/conta-livre-ca.cer` no aparelho e remova a confiança após o teste. Se o IP mudar, gere outro certificado de servidor para o novo IP.

Para uso via internet, proteja o acesso à API antes de disponibilizar o app. A API atual não implementa autenticação.
