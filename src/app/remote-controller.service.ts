import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


const SERVER_URL = 'http://localhost:3000';
const Type = {
  ACK: 'ACK',
  CHAT: 'CHAT',
  MSG: 'MSG'
};

const Cmd = {
  ROOM: 'ROOM',
  LOG: 'LOG'
};

@Injectable({
  providedIn: 'root'
})
export class RemoteControllerService {
  socket: SocketIOClient.Socket;
  id: string;
  canPlay: boolean;

  constructor() {
    console.log('Connecting to remote server...');
    this.canPlay = false;
    this.socket = io(SERVER_URL);
    // this.socket.on(Type.ACK, id => {
    //   this.id = id;
    //   console.log('Connection accepted, socket.id=' + this.id);
    // });
  }

  sayHello() {
    this.socket.emit(Type.CHAT, 'angular', 'Hello, I\'m angular client');
  }

  sendMessage(msg: any) {
    // this.socket.emit(Type.MSG, JSON.stringify(msg));
    this.socket.emit(Type.MSG, msg);
  }

  onConnect() {
    return Observable.create(observer => {
      this.socket.on(Type.ACK, id => {
        this.id = id;
        console.log('Connection accepted, socket.id=' + this.id);
        observer.next(id);
      });
      // this.socket.on('connection', msg => observer.next(msg));
    });
  }

  onDisconnect() {
    return Observable.create(observer => {
      this.socket.on('disconnect', msg => observer.next(msg));
    });
  }

  onChat() {
    return Observable.create(observer => {
      this.socket.on(Type.CHAT, msg => observer.next(msg));
    });
  }

  onMessage() {
    return Observable.create(observer => {
      this.socket.on(Type.MSG, msg => observer.next(msg));
    });
  }

  enterRoom(data: any) {
    this.sendMessage({
      cmd: Cmd.ROOM,
      data: data
    });
  }

  toggleCanPlay(canPlay: boolean) {
    this.canPlay = canPlay;
  }
}
