import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteControllerService, Res } from '../remote-controller.service';
import { Room } from '../models/room';
import { User } from '../models/user';
import { Chat } from '../models/chat';
import { Cell, CELL_INIT_VALUE } from '../models/cell';
// import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  // animations: [slideInDownAnimation]
})
export class MainComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';
  room: Room;
  user: User;
  chatList = [];
  selectedCell: Cell;

  constructor(private router: Router, private route: ActivatedRoute, private remote: RemoteControllerService) { }

  ngOnInit() {
    try {
      this.room = JSON.parse(this.route.snapshot.paramMap.get('room'));
      this.user = JSON.parse(this.route.snapshot.paramMap.get('user'));
      this.selectedCell = null;
      // console.log('main.room.navigateParam', this.room);
      // console.log('main.user.navigateParam', this.user);

      this.remote.onConnect().subscribe(this.handleConnect.bind(this));
      this.remote.onDisconnect().subscribe(this.handleDisconnect.bind(this));
      this.remote.onMessage().subscribe(this.handleMsg.bind(this));
      this.remote.onChat().subscribe(this.handleChat.bind(this));
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  enterRoom() {
    this.remote.enterRoom({
      room: this.room,
      user: this.user
    });
  }

  foo() {
    console.log('foo');
  }

  handleConnect(msg) {
    console.log('MainComponent.handleConnect', msg);
    this.enterRoom();
  }

  handleDisconnect(msg) {
    console.warn('MainComponent.handleDisconnect', msg);
    this.foo();
  }

  handleMsg(msg) {
    switch (msg.cmd) {
      case Res.ROOM_INFO:
        this.room = msg.data.room;
        console.log('MainComponent.handleMsg: this.room', this.room);
        break;
      case Res.CONQUER_CELL_FAILED:
        this.updateCellInfo(msg.data.id, msg.data);
        alert('정복에 실패했습니다. ㅠㅠ');
        break;
      case Res.CONQUER_CELL_SUCCESS:
        this.updateCellInfo(msg.data.id, msg.data);
        alert('정복 성공! ^ㅁ^');
        break;
      case Res.UPDATE_CELL:
        this.updateCellInfo(msg.data.id, msg.data);
        break;
      default:
        console.warn('MainComponent.handleMsg: Unhandled Msg', msg);
        break;
    }
  }

  handleChat(chat: Chat) {
    console.log(`MainComponent.handleChat: userId(${chat.userId}), roomId(${chat.roomId}), text(${chat.text})`);
    this.chatList.push(chat.text);
  }

  sendChat(e) {
    console.log('MainComponent.sendChat', e);
    const text = this.user.id + ' ' + e.text;
    this.chatList.push(text);
    this.remote.sendChat(text);
  }

  updateCellInfo(id, cell) {
    this.room.cells[id] = cell;
    if (this.selectedCell && this.selectedCell.id === id) {
      this.selectedCell = cell;
    }
  }

  conquerCell(e) {
    console.log('MainComponent.conquerCell', e);
    // this.remote.conquerCell(e.cell);
    this.remote.conquerCell(new Cell(e.cellId, this.user.id, this.user.team, e.cost, 0, true));

    // this.remote.conquerCell(new Cell(1, 'hoonja', 'red', 100, 0, false));
    // this.remote.conquerCell(new Cell(1, 'terra', 'red', 34, 0, false));
    // this.remote.conquerCell(new Cell(2, 'usia', 'blue', 121, 0, false));
    // this.remote.conquerCell(new Cell(1, 'tiger', 'green', 77, 0, false));
    // this.remote.conquerCell(new Cell(2, 'ljymill', 'blue', 140, 0, false));
  }

  selectCell(e) {
    if (this.room.cells && this.room.cells.length) {
      const cell: Cell = this.room.cells[e.index];
      if (cell.occupied) {
        this.selectedCell = cell;
      } else {
        this.selectedCell = new Cell(e.index, '없음', '없음', CELL_INIT_VALUE, 0, false);
      }
    }
  }
}
