import http from "node:http"
import { jsonHandler } from "./middleware/jsonHandler.js";
import { routeHandler } from "./middleware/routeHandler.js";

/**
 * 💡 AULÃO GUANABARA - O Servidor Nativo Node.js:
 * 
 * 1. 'req' (IncomingMessage) = A comanda do garçom. Traz o método (GET, POST), URL e corpo da requisição.
 * 2. 'res' (ServerResponse) = A bandeja do garçom. Usada para devolver respostas (status, cabeçalhos, JSON).
 */
async function listener(req, res) { 
    // Passo 1: Executa o middleware que lê os pedaços (Streams) do corpo da requisição e monta o JSON em req.body
    await jsonHandler(req, res)
    
    // Passo 2: Descobre qual rota o cliente quer acessar e chama a função (Controller) responsável
    routeHandler(req, res)
}

// Cria o servidor HTTP na porta 3333 sem usar nenhum framework (Express/Fastify)!
http.createServer(listener).listen(3333)