import { Server } from 'http';
import WebSocket, { Server as WebSocketServer } from 'ws';
import { GameController } from './controllers/game.controller';

const PORT = 443;

export function startServer(): Server {
  const server = new Server();
  const wsServer = new WebSocketServer({ server });
  const gameService = new GameController();

  wsServer.on('connection', (wsConnection: WebSocket) => {
    gameService.handleConnection(wsConnection);
  });

  server.listen(PORT, () => {
    console.log(`[app.ts] WebSocket server started on ws://localhost:${PORT}`);
  });

  return server;
}
startServer()