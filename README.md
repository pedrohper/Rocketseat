# 🚀 Estudos e Exercícios - Rocketseat

Este repositório reúne projetos, desafios práticos e exercícios desenvolvidos ao longo das formações e cursos da **Rocketseat**. O objetivo é consolidar conceitos fundamentais e avançados do ecossistema JavaScript, TypeScript, desenvolvimento backend com Node.js e ferramentas modernas de desenvolvimento web.

---

## 📂 Projetos Incluídos

| Projeto | Descrição | Principais Tecnologias |
| :--- | :--- | :--- |
| [**🎟️ Ticket API**](./Ticket_API) | API RESTful de gerenciamento de tickets de suporte construída **100% nativa sem frameworks**. | Node.js (HTTP, Streams, Buffers, FS), ES Modules |
| [**🥗 Daily Diet API**](./Daily_Diet_API) | API RESTful para controle e monitoramento de dieta diária, métricas e usuários. | Fastify, TypeScript, Knex.js, SQLite3, Zod, Vitest |
| [**✂️ Hair Day**](./Projeto%20Hair%20Day) | Aplicação Web para agendamento de cortes de cabelo com controle de datas e horários. | JavaScript, Webpack, Babel, Day.js, JSON Server |

---

## 🛠️ Detalhes dos Projetos

### 🎟️ [Ticket API](./Ticket_API)
API focada em entender o funcionamento interno de frameworks backend, construindo na mão:
* Roteamento dinâmico utilizando **Expressões Regulares (Regex)**.
* Processamento de corpo de requisições via **Readable Streams** e **Buffers**.
* Banco de dados em memória persistido assincronamente em arquivo `.json` com `node:fs/promises`.
* Operações de CRUD completo e gerenciamento de status de chamados.

### 🥗 [Daily Diet API](./Daily_Diet_API)
API completa para acompanhamento de refeições e métricas de dieta:
* Cadastro, edição, remoção e listagem de refeições dentro/fora da dieta.
* Cálculo de métricas: total de refeições, dentro/fora da dieta e melhor sequência de refeições mantidas na dieta.
* Autenticação/Identificação de usuário via **Cookies**.
* Validação de esquemas com **Zod**, consultas com **Knex.js** e testes de integração com **Vitest** e **Supertest**.

### ✂️ [Hair Day](./Projeto%20Hair%20Day)
Interface web de agendamento de serviços em salão de cabeleireiro:
* Manipulação de datas e horários utilizando **Day.js**.
* Bundling e transpilação com **Webpack** e **Babel**.
* API mockada com **JSON Server** para simulação de requisições HTTP em ambiente de desenvolvimento.

---

## 💻 Como Executar

Para rodar qualquer um dos projetos localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/pedrohper/estudos-e-exercicios.git
   ```
2. Acesse a pasta do projeto desejado:
   ```bash
   cd estudos-e-exercicios/Daily_Diet_API # ou Ticket_API / "Projeto Hair Day"
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o script de desenvolvimento conforme definido no `package.json` de cada projeto (ex: `npm run dev` ou `npm run server`).

---

## 👨‍💻 Autor

Desenvolvido por **Pedro Henrique** ([@pedrohper](https://github.com/pedrohper)).
