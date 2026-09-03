/**
 * 💡 AULÃO GUANABARA - Streams e Buffers na Prática:
 * 
 * Quando um cliente faz um POST enviando dados, o Node.js recebe o corpo da requisição
 * aos poucos (em gotas de água / "Chunks"). Este middleware junta todos os pedacinhos (Buffer)
 * e converte tudo em um Objeto JSON pronto em 'req.body'.
 */
export async function jsonHandler(req, res) {
    const buffers = []

    // 1. Mangueira de dados (Stream): iteramos assincronamente por cada pedacinho (chunk) que chega
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    // 2. Balde de memória (Buffer): juntamos todos os pedaços e convertemos de binário para texto/JSON
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString()) 
    } catch (erro) {
        req.body = null
    }

    // Define o cabeçalho avisando o cliente que o servidor responde em formato JSON
    res.setHeader("Content-Type", "application/json")
}