# idrink - App de delivery

## Fluxo da pessoa cliente:

![Fluxo cliente](https://github.com/Igormcf/idrink/blob/main/front-end/src/images/fluxo-cliente.gif)

## Sobre o projeto:

Este é um projeto `Full-Stack` desenvolvido em grupo, onde criamos e integramos tanto o `Back-End` quanto o `Front-End`, para a criação de um app de delivery de uma distribuidora de bebidas. Dentre as funcionalidades do app, destacam-se:

 - Acesso via login, tanto pelos clientes quanto pela pessoa vendedora e administradora, porém, com acesso a funções diferentes: (1) A pessoa cliente, que realiza um pedido pela lista de produtos; (2) A pessoa vendedora aprova, prepara e envia o pedido; (3) A pessoa administradora gerencia quem usa o pedido;
 - Fazer a comunicação entre clientes e pessoas vendedoras, onde, após realizar o pedido via carrinho de compras, o vendedor recebe o pedido, aprova, prepara e envia. Após recebimento, o cliente marca o pedido como 'recebido'. Ambos possuem os detalhes do pedido;
 - Além disso, através dos detalhes do pedido, o cliente têm acesso a informações se o pedido está sendo preparado ou se já saiu pra entrega;
 
 As tabelas do banco de dados, desenvolvido para a criação da API que alimenta a aplicação, possui as seguintes relações:
 
  ![Diagrama Relacional](https://github.com/Igormcf/idrink/blob/main/front-end/src/images/tables.png)

## Tecnologias utilizadas:

<details>
  <summary><strong>Front-End</strong></summary>

  - JavaScript;
  - React;
  - React Router;
  - Context API.
</details>

<details>
  <summary><strong>Back-End</strong></summary>

  - JavaScript;
  - Node.Js;
  - Express;
  - Sequelize;
  - MySQL;
  - Json Web Token (JWT);
  - md5;
  - cors;
  - express-async-errors.
</details>

## Orientações para a Execução:

<details>
  <summary><strong>Localmente</strong></summary><br />
  
  - Após a clonagem do repositório, instale as dependências com `npm install` .
</details>

<details>
  <summary><strong>Informações importantes</strong></summary>
  
  - O projeto só instala as dependências com a versão 16 do `node` para evitar conflitos de versão, caso não tenha essa versão instalada você pode use o `nvm` para fazer o gerenciamento de versões;
  - Para testar o projeto localmente, é fundamental configurar o arquivo de variáveis de ambiente `.env` dentro da pasta `./back-end` (ele é o único .env no projeto), conforme exemplo em `.env.example`, na mesma pasta;
  - Inicie o projeto pela raiz, utilizando o comando `npm i`. Após isso, é possível fazer a instalação de ambos os aplicativos (back e front) através da raiz do projeto, utilizando o comando `npm run dev:prestart` (esse comando também restaurará o banco de dados, caso o .env esteja configurado corretamente).
</details>

<details>
  <summary><strong>Scripts importantes do <code>package.json</code> principal</strong></summary>
  
  Scripts para uso na raiz do projeto (`./package.json`) e não nas aplicações individuais `./front-end/package.json` e `./back-end/package.json`:
  
  - `npm start`: Limpa as portas `3000` e `3001` e sobe a aplicação com `pm2` em modo `fork` (uma instância para cada aplicação). Nesse modo, as alterações não são assistidas;
  - `npm stop`: Para e deleta as aplicações rodando no `pm2`;
  - `npm run dev`: Limpa as portas `3000` e `3001` e sobe a aplicação com `pm2` em modo `fork` (uma instância pra cada aplicação). Nesse modo, as atualizações são assistidas (modo `watch`);
  - `npm run dev:prestart`: A partir da raiz, esse comando faz o processo de instalação de dependências (`npm i`) nos dois projetos (`./front-end` e `./back-end`) e roda o `Sequelize` no `./back-end`;
  - `npm run db:reset`: Roda os scripts do `Sequelize` restaurando o banco de dados de desenvolvimento. Utilize esse script caso ocorra algum problema no seu banco local;
  - `npm run db:reset:debug`: Além da mesma função do comando anterior, esse também é capaz de retornar informações detalhadas de erros (quando ocorrerem no processo);
</details>
