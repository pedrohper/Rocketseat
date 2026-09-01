# 🎟️ Ticket API 

Uma API RESTful para gestão de tickets e chamados de suporte, desenvolvida do zero utilizando **apenas JavaScript puro e módulos nativos do Node.js**. 

O objetivo principal deste projeto não é apenas entregar um CRUD, mas sim consolidar os fundamentos da web, construindo do zero as engrenagens que frameworks como o Express abstraem.

## ⚙️ O que rola por baixo dos panos

Nenhum framework de roteamento foi utilizado. A estrutura inteira foi construída na mão:

* **Roteamento Customizado:** Criação de um motor de rotas nativo que mapeia métodos HTTP e caminhos dinâmicos.
* **Processamento via Streams:** Consumo de dados da requisição em *chunks* utilizando *Readable Streams* e Buffers para processar o corpo (body) em JSON.
* **Regex para URLs:** Expressões Regulares avançadas para identificar e extrair parâmetros dinâmicos (`req.params`) e *Query Strings* (`req.query`) direto da URL.
* **Banco de Dados em Memória:** Persistência de dados gerenciada de forma assíncrona com a biblioteca nativa `fs/promises`, salvando os registros em um arquivo `.json`.

## 🚀 Funcionalidades (CRUD Completo)

* **`POST` /tickets:** Criação de um novo ticket (equipamento, descrição e nome do usuário).
* **`GET` /tickets:** Listagem de todos os tickets (com suporte a filtros via *query params*, ex: `?status=open`).
* **`PUT` /tickets/:id:** Atualização dos dados de um ticket específico.
* **`PATCH` /tickets/:id/close:** Encerramento de um ticket, adicionando a solução do problema.
* **`DELETE` /tickets/:id:** Remoção de um ticket do banco de dados.

## 🛠️ Tecnologias

* **JavaScript (ES Modules)**
* **Node.js (Nativo):** `node:http`, `node:crypto`, `node:fs/promises`

## 💻 Como executar o projeto

1. Clone este repositório:
   ```bash
   git clone [https://github.com/pedrohper/Ticket.git](https://github.com/pedrohper/Ticket.git)
