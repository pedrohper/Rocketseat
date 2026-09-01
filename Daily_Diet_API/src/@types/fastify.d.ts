import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string
      name: string
      session_id?: string
      created_at: string
    };
  }
}
