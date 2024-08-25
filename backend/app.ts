import { Server } from 'http';
import Fastify, { FastifyInstance } from 'fastify';
import WebSocket, { Server as WebSocketServer } from 'ws';
import { GameController } from './controllers/game.controller';

const PORT = 443;
const HTTP_PORT = 3001;

export function startServer(): Server {
  const server = new Server();

  const fastify: FastifyInstance = Fastify({ logger: true });

  const wsServer = new WebSocketServer({ server });

  const gameController = new GameController();

  wsServer.on('connection', (wsConnection: WebSocket) => {
    gameController.handleConnection(wsConnection);
  });

  gameController.registerRoutes(fastify);

  fastify.listen({ port: HTTP_PORT }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`Fastify server listening on ${address}`);
  });

  server.listen(PORT, () => {
    console.log(`[app.ts] WebSocket server started on ws://localhost:${PORT}`);
  });

  return server;
}

// Iniciar el servidor
startServer();
