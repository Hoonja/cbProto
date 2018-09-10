import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


const SERVER_URL = 'http://localhost:3000';
const Type = {
  CHAT: 'CHAT',
  MSG: 'MSG'
};

@Injectable({
  providedIn: 'root'
})
export class RemoteControllerService {
  socket: SocketIOClient.Socket;

  constructor() {
    console.log('Connecting to remote server...');
    this.socket = io(SERVER_URL);
  }

  sayHello() {
    this.socket.emit(Type.CHAT, 'Hello, I\'m angular client');
  }
}
