## Funcionalidades Implementadas

## Tabela Usuario

[x] Cadastro de usuários

## Tabela Sessão

[x] Cadastro de sessões

## Tabela Entregas

[x] Cadastro de entregas

[x] Listagem de entregas

[x] Atualização do status de uma entrega

## Tabela Logs de Entrega

[x] Cadastro de logs de entrega

## Usuários

<strong> Método	Endpoint	Descrição </strong>

POST	/users	Cadastra um novo usuário.<br>

## Sessões

<strong> Método	Endpoint	Descrição </strong>

POST	/sessions	Cria uma nova sessão de autenticação.<br>

## Entregas

<strong> Método	Endpoint	Descrição </strong>

POST	/deliveries	Cadastra uma nova entrega.<br>
GET	/deliveries	Lista todas as entregas cadastradas.<br>
PATCH	/deliveries/:id/status	Atualiza o status de uma entrega.<br>

## Logs de Entrega

<strong> Método	Endpoint	Descrição </strong>

POST	/delivery/logs	Cadastra um novo log de entrega.<br>
GET	/delivery/logs/:id/show	Lista os logs de uma entrega.<br>

<strong>Exemplo de requisição</strong>

```json
{
  "user_id": "uuid",
  "description": "Televisão 4K"
}
```

## Como executar

```bash
npm install
npm run dev


[x] Listagem dos logs de uma entrega
