import WebSocket from 'ws';
import { GameService } from '../services/game.service';

// Constantes para las acciones
const JOIN_ACTION = 'join';
const ATTACK_ACTION = 'attack';

export class GameController {

  gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  handleConnection(wsConnection: WebSocket) {
    console.log('[GameController] New client connected');
    wsConnection.send(JSON.stringify({ status: 'connected', message: '¡Conectado!' }));

    wsConnection.on('message', (message: string) => {
      try {
        const data = JSON.parse(message);
        const { action } = data;

        switch (action) {
          case JOIN_ACTION:
            this.gameService.handleJoin(wsConnection, data);
            break;

          case ATTACK_ACTION:
            this.gameService.handleAttack(wsConnection, data);
            break;

          default:
            console.warn(`[GameController] Unknown action received: ${action}`);
            wsConnection.send(JSON.stringify({ message: 'Unknown action' }));
            break;
        }
      } catch (error) {
        console.error(`[GameController] Error processing message: ${(error as Error).message}`);
        wsConnection.send(JSON.stringify({ message: 'Invalid message format or internal error' }));
      }
    });

    wsConnection.on('close', () => {
      console.log('[GameController] Client disconnected');
    });
  }
}
