import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Chat } from './models/chat';
import { Cell } from './models/cell';


const SERVER_URL = 'http://localhost:3000';
export const Type = {
  ACK: 'ACK',
  CHAT: 'CHAT',
  MSG: 'MSG'
};

export const Cmd = {
  ROOM: 'ROOM',
  ROOM_NEWUSER: 'ROOM_NEWUSER',
  ROOM_EXITUSER: 'ROOM_EXITUSER',
  CONQUER_CELL: 'CONQUER_CELL'
};

export const Res = {
  ROOM_INFO: 'ROOM_INFO',
  CONQUER_CELL_SUCCESS: 'CONQUER_CELL_SUCCESS',
  CONQUER_CELL_FAILED: 'CONQUER_CELL_FAILED',
  UPDATE_CELL: 'UPDATE_CELL',
  UPDATE_USER: 'UPDATE_USER',
  GOTO_FINAL: 'GOTO_FINAL',
  GAME_OVER: 'GAME_OVER',
  LOG: 'LOG'
};

@Injectable({
  providedIn: 'root'
})
export class RemoteControllerService {
  socket: SocketIOClient.Socket;
  socketId: string;
  userId: string;
  roomId: string;
  canPlay: boolean;

  constructor() {
    // console.log('Connecting to remote server...');
    this.canPlay = false;
    this.socket = io(SERVER_URL);
  }

  onConnect() {
    return Observable.create(observer => {
      this.socket.on(Type.ACK, id => {
        this.socketId = id;
        console.log('Connection accepted, socket.id=' + this.socketId);
        observer.next(id);
      });
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
    this.userId = data.user.id;
    this.roomId = data.room.id;
    this.sendMsg({
      cmd: Cmd.ROOM,
      data: data
    });
  }

  toggleCanPlay(canPlay: boolean) {
    this.canPlay = canPlay;
  }

  sayHello() {
    this.socket.emit(Type.CHAT, {
      userId: this.userId,
      roomId: '',
      text: 'Hello, I\'m angular client'
    });
  }

  sendMsg(msg: any) {
    // this.socket.emit(Type.MSG, JSON.stringify(msg));
    this.socket.emit(Type.MSG, { userId: this.userId, roomId: this.roomId, ...msg });
  }

  sendChat(chat: string) {
    this.socket.emit(Type.CHAT, new Chat(this.userId, this.roomId, chat));
  }

  conquerCell(cell: Cell) {
    // console.log(`RemoteControllerService.conquerCell: cellId(${cell.id}), cost(${cell.cost})`);
    this.sendMsg({
      cmd: Cmd.CONQUER_CELL,
      data: cell
    });
  }
}
