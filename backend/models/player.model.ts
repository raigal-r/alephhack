import WebSocket from 'ws';
import { Meme } from './meme.model';

export interface Player {
  id: string;
  socket: WebSocket;
  memes: Meme[];
}