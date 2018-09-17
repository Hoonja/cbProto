import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Chat } from './models/chat';
import { Cell } from './models/cell';


const SERVER_LOCAL_ADDR = 'localhost';
const SERVER_TEST_ADDR = '192.168.10.104';
export const Type = {
  ACK: 'ACK',
  CHAT: 'CHAT',
  MSG: 'MSG'
};

export const CMsg = {
  ROOM: 'ROOM',
  CONQUER_CELL: 'CONQUER_CELL'
};

export const SMsg = {
  ROOM_INFO: 'ROOM_INFO',
  ROOM_NEWUSER: 'ROOM_NEWUSER',
  ROOM_EXITUSER: 'ROOM_EXITUSER',
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
    let serverUrl;

    if (window.location.href.indexOf(SERVER_TEST_ADDR) >= 0) {
      serverUrl = 'http://' + SERVER_TEST_ADDR + ':4001';
    } else {
      serverUrl = 'http://' + SERVER_LOCAL_ADDR + ':3000';
    }
    this.socket = io(serverUrl);
    console.log('Connecting to ' + serverUrl);
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
      cmd: CMsg.ROOM,
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
    this.socket.emit(Type.CHAT, new Chat(this.userId, this.roomId, { text: chat }));
  }

  conquerCell(cell: Cell) {
    // console.log(`RemoteControllerService.conquerCell: cellId(${cell.id}), cost(${cell.cost})`);
    this.sendMsg({
      cmd: CMsg.CONQUER_CELL,
      data: cell
    });
  }
}
