## 📌 Requisitos Funcionais (RF)
- [ ] Deve ser possível cadastrar uma ORG
- [ ] Deve ser possível uma ORG se autenticar (Login)
- [ ] Deve ser possível cadastrar um Pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por características (idade, porte, nível de energia, etc.)
- [ ] Deve ser possível visualizar os detalhes de um pet específico

## 🛑 Regras de Negócio (RN)
- [ ] A informação da cidade é obrigatória no parâmetro da rota de listagem de pets
- [ ] Uma ORG deve, obrigatoriamente, ter um endereço completo e um número de WhatsApp
- [ ] Todo pet cadastrado precisa carregar o `org_id` da ORG responsável
- [ ] O sistema não gerencia o fluxo de adoção; ele apenas fornece o link para contato direto com a ORG via WhatsApp
- [ ] Todos os filtros de características do pet na listagem são opcionais (exceto a cidade)
- [ ] Apenas ORGs logadas (com token de acesso válido) têm permissão para cadastrar pets

## ⚙️ Requisitos Não Funcionais (RNF)
- [ ] A senha da ORG precisa estar criptografada no banco de dados (hash com bcrypt)
- [ ] Os dados da aplicação precisam estar persistidos em um banco relacional (PostgreSQL)
- [ ] A comunicação com o banco de dados deve ser gerenciada via Prisma ORM
- [ ] A autenticação da ORG no painel administrativo deve acontecer via JWT (JSON Web Token)
- [ ] A aplicação deve ser estruturada garantindo alta cobertura de testes unitários