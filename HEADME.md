Excelente material — ele cobre **todo o ciclo de vida do projeto**, mas realmente pode (e deve) ser **organizado, padronizado e documentado de forma profissional**, principalmente para:

- onboarding de novos devs (júnior/pleno)
- padronização de times
- reaproveitamento em outros projetos
- redução de erros operacionais

Abaixo está a **versão reescrita, organizada e profissional**, com **descrição clara de cada dependência**, **ordem lógica**, **boas práticas** e **comentários estratégicos**.

---

# 📦 Projeto Node.js + TypeScript + PostgreSQL

## 📌 Visão Geral do Projeto

Este projeto é uma **API REST** desenvolvida em **Node.js com TypeScript**, utilizando **Express** como framework HTTP, **TypeORM** como ORM e **PostgreSQL** como banco de dados relacional.

O foco do projeto é:

- Código limpo e escalável
- Arquitetura organizada
- Boas práticas de segurança
- Testabilidade
- Padronização de processos

---

## ✅ Requisitos do Ambiente

Antes de iniciar, certifique-se de ter instalado:

- **Node.js 22+**

  ```bash
  node -v
  ```

- **PostgreSQL**
- **NPM** (vem junto com o Node.js)

---

## ⚙️ Configuração Inicial do Projeto

### 1️⃣ Variáveis de Ambiente

1. Duplique o arquivo:

   ```bash
   .env.example → .env
   ```

2. Configure as credenciais do banco de dados no arquivo `.env`

> 📌 **Boa prática:** Nunca versionar o arquivo `.env`

---

## 📥 Instalação das Dependências

```bash
npm install
```

---

## ▶️ Executando o Projeto

### Compilação e execução em modo desenvolvimento

```bash
npm run start:watch
```

Esse comando:

- Compila o TypeScript
- Reinicia automaticamente o servidor ao detectar alterações

---

## 🗄️ Banco de Dados

### Criar o banco de dados (PostgreSQL)

```sql
CREATE DATABASE dbname;
```

---

## 📂 Migrations

### Executar as migrations

```bash
npx typeorm migration:run -d dist/data-source.js
```

ou

```bash
npm run typeorm -- -d ./src/common/infrastructure/typeorm/index.ts migration:run
```

📌 **Objetivo:** Criar e versionar a estrutura das tabelas no banco.

---

## 🌱 Seeds (Dados de Teste)

Executa a carga inicial de dados para testes:

```bash
node dist/run-seeds.js
```

---

## 🧪 Testes de API

- Importar a collection localizada em `Thunder-client`
- Ajustar a variável **Base URL**

  ```
  http://localhost:8080
  ```

---

# 🧱 Criação do Projeto (Passo a Passo)

## Inicializar o projeto Node.js

```bash
npm init
```

---

## 🌐 Express (Servidor HTTP)

```bash
npm install express
```

**Responsabilidade:**

- Gerenciamento de rotas
- Middleware
- Requisições HTTP

---

## 🧠 TypeScript (Tipagem e Segurança)

```bash
npm install --save-dev @types/express
npm install --save-dev @types/node
```

> Permite **autocompletar**, **verificação de tipos** e **redução de bugs em runtime**.

---

## 🔄 Execução em Desenvolvimento

```bash
npm install --save-dev ts-node-dev
```

**Função:**

- Compila TypeScript em tempo real
- Reinicia o servidor automaticamente

---

## ⚙️ Configuração do TypeScript

```bash
npx tsc --init
```

Compilar manualmente:

```bash
npx tsc
```

Executar:

```bash
node dist/index.js
```

---

## 🧵 Execução de Processos Simultâneos

```bash
npm install --save-dev concurrently
```

Usado quando múltiplos processos precisam rodar juntos.

---

## 🗂️ ORM – TypeORM

```bash
npm install typeorm
npm install tsconfig-paths -D
```

### Configuração de alias no `tsconfig.json`

```json
{
  "baseUrl": "./",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

**Benefícios:**

- Evita imports longos
- Código mais limpo e legível

---

## 🧬 Reflect Metadata

```bash
npm install reflect-metadata
```

**Necessário para:**

- Decorators do TypeORM
- Metadados de entidades

---

## 🐘 Driver PostgreSQL

```bash
npm install pg
```

Permite a comunicação entre Node.js e PostgreSQL.

---

## 🔐 Variáveis de Ambiente

```bash
npm install dotenv
npm install --save-dev @types/dotenv
```

Carrega variáveis do `.env` no processo Node.js.

---

## 🗃️ Migrations

Criar migration:

```bash
npx typeorm migration:create src/migration/NomeDaMigration
```

Executar:

```bash
npx typeorm migration:run -d dist/data-source.js
```

---

## ✅ Validação de Dados

```bash
npm install zod
```

**Por quê usar Zod?**

- Validação de dados em runtime
- Tipagem integrada com TypeScript
- Excelente para DTOs

---

## 🛡️ Segurança HTTP

### Helmet

```bash
npm install helmet
```

Adiciona headers de segurança automaticamente.

---

### CORS

```bash
npm install cors
npm install @types/cors -D
```

Controla requisições externas à API.

---

## 📄 Documentação da API (Swagger)

```bash
npm install swagger-jsdoc
npm install swagger-ui-express
npm install @types/swagger-jsdoc -D
npm install @types/swagger-ui-express -D
```

**Benefícios:**

- Documentação automática
- Testes de endpoints
- Facilita integração com front-end

---

## 🧹 Qualidade de Código

### ESLint + Prettier

```bash
npm install eslint -D
npm install eslint-config-prettier -D
npm install eslint-plugin-prettier -D
npm install typescript-eslint -D
```

Garante:

- Padronização de código
- Menos erros
- Melhor leitura

---

## 🧪 Testes Automatizados

```bash
npm install vitest -D
npm install vite-tsconfig-paths -D
npm install @faker-js/faker -D
```

- **Vitest** → Framework de testes
- **Faker** → Geração de dados fake
- **vite-tsconfig-paths** → Suporte a aliases nos testes

---

## 📜 Scripts do `package.json`

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "npx dotenv-cli -e .env -- ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/common/infrastructure/http/index.ts",
    "lint": "eslint .",
    "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
    "test": "npx dotenv-cli -e .env.test vitest run",
    "test:watch": "vitest"
  }
}
```

📌 **Boa prática:** Scripts claros reduzem erros operacionais.

---

## 🔁 Versionamento com Git

### Clonar o projeto

```bash
git clone -b <branch_name> <repository_url> .
```

Verificar branch:

```bash
git branch
```

Atualizar:

```bash
git pull
```

Commit:

```bash
git add .
git commit -m "Base projeto"
```

Push:

```bash
git push origin develop
```

---

## 🎯 Recomendações Finais (Experiência Prática)

✔ Documente tudo (README bem estruturado)
✔ Use migrations sempre
✔ Valide dados de entrada (Zod)
✔ Automatize testes
✔ Padronize commits
✔ Nunca acople regra de negócio ao Express
