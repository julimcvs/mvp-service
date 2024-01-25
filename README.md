## mvp-service
Mínimo Produto Viável (MVP)  Vendendo Serviços e Produtos 24 horas por dia   -  mini e-commerce

## Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você instalou o `Node 18`

## Arquitetura e Stack

- Node 18,
- Typescript,
- PostgreSQL 14.5

## Instalação
Para instalar o mvp-service, siga estas etapas:
```
npm install
docker-compose up -d
```
## Execução do código
Para execução do serviço é necessário configurar as variáveis de ambiente:

- PORT: Porta em que o serviço irá ser executado
- DATABASE_HOST: Host onde o banco de dados está sendo executado.
- DATABASE_PORT: Porta em que o banco de dados está sendo executado.,
- DATABASE_USERNAME: Usuário para login no banco de dados.
- DATABASE_PASSWORD: Senha para login no banco de dados
- DATABASE_NAME: Nome do banco de dados.
- JWT_SECRET: Código secreto para codificação do JWT Token, utilizado no login.

Para execução do projeto, utilize o seguinte comando:
```
npm run dev
```

## Descrição dos Serviços:
Os seguintes serviços foram utilizados:

- product-service: Serviço utilizado para busca de produtos no banco de dados.
- purchase-service: Serviço utilizado para salvar detalhes da compra no banco de dados.
- quotation-service: Serviço utilizado para fazer cotações.
- user-service: Serviço utilizado para login e busca de informações de usuários no banco de dados.

