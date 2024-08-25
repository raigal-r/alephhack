import WebSocket from 'ws';
import { GameService } from '../services/game.service';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PlayerProvider } from '../providers/player.provider';

// Constantes para las acciones
const JOIN_ACTION = 'join';
const ATTACK_ACTION = 'attack';

export type Meme = {
  id: string;
  name: string;
  health: number;
  attack: number;
  critChance: number;
  speed: number;
  defense: number;
  powers: { name: string; powerValue: number }[];
};

export const memes: Meme[] = [
  {
    id: 'MAGAIBA',
    name: 'MAGAIBA',
    health: 1200,
    attack: 60,
    critChance: 120,
    speed: 200,
    defense: 57,
    powers: [
      {
        name: 'Smash',
        powerValue: 5,
      },
      {
        name: 'Splash',
        powerValue: 20,
      },
      {
        name: 'Blast',
        powerValue: 40,
      },
      {
        name: 'Zap',
        powerValue: 30,
      },
    ],
  },
  {
    id: 'WIF',
    name: 'WIF',
    health: 400,
    attack: 594,
    critChance: 594,
    speed: 400,
    defense: 80,
    powers: [
      {
        name: 'Smash',
        powerValue: 10,
      },
      {
        name: 'Splash',
        powerValue: 15,
      },
      {
        name: 'Blast',
        powerValue: 20,
      },
      {
        name: 'Zap',
        powerValue: 50,
      },
    ],
  },
  {
    id: 'MOG',
    name: 'MOG',
    health: 556,
    attack: 110,
    critChance: 40,
    speed: 600,
    defense: 120,
    powers: [
      {
        name: 'Smash',
        powerValue: 10,
      },
      {
        name: 'Splash',
        powerValue: 40,
      },
      {
        name: 'Blast',
        powerValue: 5,
      },
      {
        name: 'Zap',
        powerValue: 10,
      },
    ],
  },
  {
    id: 'BONK',
    name: 'BONK',
    health: 789,
    attack: 78,
    critChance: 300,
    speed: 300,
    defense: 14,
    powers: [
      {
        name: 'Smash',
        powerValue: 10,
      },
      {
        name: 'Splash',
        powerValue: 20,
      },
      {
        name: 'Blast',
        powerValue: 30,
      },
      {
        name: 'Zap',
        powerValue: 40,
      },
    ],
  },
  {
    id: 'BOBO',
    name: 'BOBO',
    health: 594,
    attack: 34,
    critChance: 100,
    speed: 200,
    defense: 24,
    powers: [
      {
        name: 'Smash',
        powerValue: 10,
      },
      {
        name: 'Splash',
        powerValue: 20,
      },
      {
        name: 'Blast',
        powerValue: 30,
      },
      {
        name: 'Zap',
        powerValue: 40,
      },
    ],
  },
];

export class GameController {
  gameService: GameService;
  playerProvider: PlayerProvider;

  constructor() {
    this.gameService = new GameService();
    this.playerProvider = new PlayerProvider();
  }

  handleConnection(wsConnection: WebSocket) {
    console.log('[GameController] New client connected');
    wsConnection.send(
      JSON.stringify({ status: 'connected', message: '¡Conectado!' })
    );

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
        console.error(
          `[GameController] Error processing message: ${
            (error as Error).message
          }`
        );
        wsConnection.send(
          JSON.stringify({
            message: 'Invalid message format or internal error',
          })
        );
      }
    });

    wsConnection.on('close', () => {
      const playerId = this.playerProvider.getPlayerIdBySocket(wsConnection);
      if (playerId) {
        this.playerProvider.removePlayer(playerId);
        console.log(`[GameController] Player ${playerId} disconnected`);
      }
    });
  }

  
  async getPlayerMemes(request: FastifyRequest, reply: FastifyReply) {
    const availableMemes: any[] = [];

    if (memes) {
      return reply.send(availableMemes);
    } else {
      return reply
        .status(404)
        .send({ error: 'Player not found or no memes assigned' });
    }
  }
  registerRoutes(fastify: FastifyInstance) {
    fastify.get('/meme', this.getPlayerMemes.bind(this));
  }
}
