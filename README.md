# DioBank API

Backend REST da aplicação DioBank, desenvolvido com Node.js, TypeScript, Express e TypeORM com banco de dados SQLite.

## Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- SQLite
- JSON Web Token (JWT)

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

O servidor sobe na porta **5000**.

## Build

```bash
npm run build
npm start
```

## Endpoints

### Autenticação

#### `POST /login`
Autentica um usuário e retorna o token JWT.

**Body:**
```json
{
  "email": "user@email.com",
  "password": "senha"
}
```

**Resposta:**
```json
{
  "token": "eyJ...",
  "user": {
    "id": "uuid",
    "name": "Nome",
    "email": "user@email.com"
  }
}
```

---

### Usuários

#### `POST /user`
Cria um novo usuário.

**Body:**
```json
{
  "name": "Nome",
  "email": "user@email.com",
  "password": "senha"
}
```

---

#### `GET /user` 🔒
Retorna todos os usuários. Requer autenticação.

---

#### `GET /user/:userId` 🔒
Retorna um usuário pelo ID. Requer autenticação.

---

#### `DELETE /user/:email`
Remove um usuário pelo e-mail.

---

### Autenticação nas rotas protegidas 🔒

Envie o header:

```
Authorization: Bearer <token>
```

## Entidade User

| Campo      | Tipo    | Descrição              |
|------------|---------|------------------------|
| `user_id`  | uuid    | ID único (gerado auto) |
| `name`     | string  | Nome do usuário        |
| `email`    | string  | E-mail (único)         |
| `password` | string  | Senha (texto puro)     |
| `balance`  | float   | Saldo (padrão: 0)      |

## Banco de dados

SQLite com `synchronize: true` — as tabelas são criadas/atualizadas automaticamente ao iniciar o servidor. O arquivo do banco fica em `src/database/db.sqlite`.

## CORS

Configurado para aceitar requisições de qualquer origem. Para restringir ao frontend em produção, edite `src/index.ts`:

```ts
server.use(cors({ origin: 'http://localhost:3000' }))
```
