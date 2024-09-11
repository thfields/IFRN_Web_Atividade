# Atividade Avaliativa Web

Atividade avaliativa da disciplina Desenvolvimento Web Back-end do professor Marcelo Varela de Souza.

Backend feito com NodeJS com Express. Utilizando JWT para geração de Token e Crypto para criptografia de senhas.

Para o banco de dados o MySQK utilizando o ORM Sequelize.

## Instruções de Configuração e Execução:

1. Certifique-se de ter o Node.js instalado em sua máquina.
  Para verificar utilize o comando:
```
node -v
npm -v
```
Caso não tenha instalado acesse o site oficial: 
[NodeJS Download](https://nodejs.org/en/download/current)

2. Clone este repositório usando o comando:
```
git clone https://github.com/thfields/IFRN_Web_Atividade.git
```
3. Importe o arquivo do banco de dados no seu MySQL:
```
prova_backend.sql
```
4. Instale as dependências usando o npm:
```
npm install
```
5. Inicie o servidor usando o comando:
```
npm start
```

# Autenticação com Token
 - Você pode obter um token fazendo uma requisição POST para o endpoint `/login` com as credenciais de usuário. 
 - Para acessar os endpoints protegidos, é necessário incluir um token JWT no cabeçalho `Authorization` da sua requisição. 
 - O token deve ser enviado no formato `Bearer <token>`.


# Descrição dos Endpoints

### Endpoint `/login`

#### Método: POST
- Descrição: Solicita o login e retorna o token de acesso.
- Parâmetros: 
  - `email`: Email do usuário (obrigatório).
  - `senha`: Senha do usuário (obrigatório).
- Como usar: Faça uma requisição POST para `/login`, enviando os parâmetros no corpo da requisição.
- OBS: O servidor retornará um token que deve ser incluído nas requisições subsequentes.

### Endpoint `/usuarios`

#### Método: GET
- Descrição: Retorna todos os usuários cadastrados.
- Como usar: Faça uma requisição GET para `/usuarios`.
- OBS: Token necessário para fazer a requisição.

#### Método: POST
- Descrição: Cria um novo usuário.
- Parâmetros:
  - `nome`: Nome do usuário (obrigatório).
  - `email`: Email do usuário (obrigatório).
  - `senha`: Senha do usuário (obrigatório).
- Como usar: Faça uma requisição POST para `/usuario`, enviando os parâmetros no corpo da requisição.

### Endpoint: `/usuario/:id`

#### Método: GET
- Descrição: Retorna um usuário específico com base no ID fornecido.
- Como usar: Faça uma requisição GET para `/usuario/:id`, substituindo `:id` pelo ID do usuário desejado.
- OBS: Token necessário para fazer a requisição.

#### Método: PUT
- Descrição: Atualiza um usuário existente com base no ID fornecido.
- Parâmetros:
  - `nome`: Novo nome do usuário.
  - `email`: Novo email do usuário.
  - `senha`: Nova senha do usuário.
- Como usar: Faça uma requisição PUT para `/usuario/:id`, enviando os parâmetros a serem atualizados no corpo da requisição.
- OBS: Token necessário para fazer a requisição.

#### Método: DELETE
- Descrição: Deleta um usuário existente com base no ID fornecido.
- Como usar: Faça uma requisição DELETE para `/usuario/:id`, substituindo `:id` pelo ID do usuário a ser deletado.
- OBS: Token necessário para fazer a requisição.

Certifique-se de incluir os parâmetros necessários e observar as restrições definidas para cada operação.


## Testes do Insomnia
Você pode encontrar os testes do Insomnia no arquivo `requisições_endpoints_insomina.json`. Importe este arquivo para o seu cliente Insomnia para testar os endpoints facilmente.
