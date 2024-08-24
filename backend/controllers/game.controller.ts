import WebSocket from 'ws';
import { GameService } from '../services/game.service';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

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
  async getPlayerMemes(request: FastifyRequest, reply: FastifyReply) {
    const availableMemes: any[] = [];

    const baseMemes = [
      { name: 'PEPE', health: 100, attack: 100, defense: 50, critChance: 0.2, speed: 30 },
      { name: 'WIF', health: 100, attack: 100, defense: 50, critChance: 0.2, speed: 30 },
      { name: 'MAGAIBA', health: 100, attack: 100, defense: 50, critChance: 0.2, speed: 30 },
    ];

    baseMemes.forEach((baseMeme) => {
      const memePowers: any[] = [
        { name: 'Smash', powerValue: 10 },
        { name: 'Splash', powerValue: 20 },
        { name: 'Blast', powerValue: 30 },
        { name: 'Zap', powerValue: 40 },
      ];

      const meme: any = {
        id: baseMeme.name,
        name: baseMeme.name,
        health: baseMeme.health,
        attack: baseMeme.attack,
        defense: baseMeme.defense,
        critChance: baseMeme.critChance,
        speed: baseMeme.speed,
        powers: memePowers,
      };

      availableMemes.push(meme);
    });
    if (availableMemes) {
      return reply.send(availableMemes);
    } else {
      return reply.status(404).send({ error: 'Player not found or no memes assigned' });
    }
  }
  registerRoutes(fastify: FastifyInstance) {
    fastify.get('/meme', this.getPlayerMemes.bind(this));
  }

}
