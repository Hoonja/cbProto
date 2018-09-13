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
  tempRoom: Room;
  room: Room;
  user: User;
  chatList = [];
  selectedCell: Cell;
  firstAttacked = false;

  constructor(private router: Router, private route: ActivatedRoute, private remote: RemoteControllerService) { }

  ngOnInit() {
    try {
      this.tempRoom = JSON.parse(this.route.snapshot.paramMap.get('room'));
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
      room: this.tempRoom,
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
        for (let i = 0; i < msg.data.room.cells.length; i++) {
          if (!msg.data.room.cells[i].occupied) {
            msg.data.room.cells[i] = new Cell(i, '', '#eeeeee', 10, 0, false);
          }
        }
        this.room = msg.data.room;
        console.log('MainComponent.handleMsg: this.room', this.room);
        const ownedCell = this.room.cells.find(item => item.team === this.user.team);
        if (ownedCell) {
          this.firstAttacked = true;
          console.log('이미 정복한 셀이 있음');
        }
        break;
      case Res.CONQUER_CELL_FAILED:
        this.updateCellInfo(msg.data.cell);
        alert('정복에 실패했습니다. ㅠㅠ');
        this.chatList.push(msg.data.cell.id + '번 땅 정복에 실패했습니다');
        break;
      case Res.CONQUER_CELL_SUCCESS:
        this.updateCellInfo(msg.data.cell);
        this.user.money = this.user.money - msg.data.cell.cost;
        this.room.value = this.room.value + msg.data.cell.cost;
        alert('정복 성공! ^ㅁ^');
        this.firstAttacked = true;
        this.chatList.push(msg.data.cell.id + '번 땅 정복에 성공했습니다');
        break;
      case Res.UPDATE_CELL:
        this.updateCellInfo(msg.data.cell);
        this.room.value = msg.data.roomValue;
        console.log('방정보 갱신', this.room);
        const cell = msg.data.cell;
        this.chatList.push(cell.ownerId + '님이 ' + cell.id + '번 땅을 정복했습니다');
        break;
      case Res.GOTO_FINAL:
        if (msg.data.room.id === this.room.id) {
          this.chatList.push('잠시후 전투가 끝납니다. (남은 턴수: ' + msg.data.room.turnsLeft + ')');
        }
        break;
      case Res.GAME_OVER:
        if (msg.data.room.id === this.room.id) {
          alert('전투가 끝났습니다(총 방에 적립된 비용: ' + msg.data.room.value + ')');
          this.chatList.push('전투가 끝났습니다(총 방에 적립된 비용: ' + msg.data.room.value + ')');
        }
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

  updateCellInfo(cell) {
    this.room.cells[cell.id] = cell;
    if (this.selectedCell && this.selectedCell.id === cell.id) {
      this.selectedCell = cell;
    }
  }

  conquerCell(e) {
    console.log(e.cellId + '번 셀을 정복하려함');
    console.log('type of e.cellId: ' + typeof e.cellId);
    console.log('type of this.room.width: ' + typeof this.room.width);
    if (typeof this.room.width === 'string') {
      this.room.width = parseInt(this.room.width, 10);
    }
    let canAttack = false;
    if (this.firstAttacked) {
      const rowId = Math.floor(e.cellId / this.room.width);
      const aroundsOdd = [
        e.cellId - this.room.width - 1,
        e.cellId - this.room.width,
        e.cellId - 1,
        e.cellId + 1,
        e.cellId + this.room.width - 1,
        e.cellId + this.room.width
      ];
      const aroundsEven = [
        e.cellId - this.room.width,
        e.cellId - this.room.width + 1,
        e.cellId - 1,
        e.cellId + 1,
        e.cellId + this.room.width,
        e.cellId + this.room.width + 1
      ];
      const isEven = rowId % 2 === 0;
      const isFirst = e.cellId % this.room.width === 0;
      const isLast = (e.cellId + 1) % this.room.width === 0;
      // const arounds = isEven ? aroundsEven : aroundsOdd;
      let arounds;

      if (isEven) {
        if (isFirst) {
          arounds = [aroundsEven[0], aroundsEven[1], aroundsEven[3], aroundsEven[4], aroundsEven[5]];
        } else if (isLast) {
          arounds = [aroundsEven[0], aroundsEven[2], aroundsEven[4]];
        } else {
          arounds = aroundsEven;
        }
      } else {
        if (isFirst) {
          arounds = [aroundsOdd[1], aroundsOdd[3], aroundsOdd[5]];
        } else if (isLast) {
          arounds = [aroundsOdd[0], aroundsOdd[1], aroundsOdd[2], aroundsOdd[4], aroundsOdd[5]];
        } else {
          arounds = aroundsOdd;
        }
      }

      console.log('확인 범위의 셀', arounds);
      for (let i = 0; i < arounds.length; i++) {
        if (arounds[i] < 0 || arounds[i] >= this.room.width * this.room.height) {
          console.log('범위를 벗어나는 셀(index:' + arounds[i] + ')이라 연산에서 제외');
          continue;
        }
        if (this.room.cells[arounds[i]].team === this.user.team) {
          canAttack = true;
          break;
        }
      }
    } else {
      canAttack = true;
    }

    console.log(`MainComponent.conquerCell: firstAttack=${this.firstAttacked}, canAttack=${canAttack}`);
    if (!canAttack) {
      alert('정복하려면, 인접한 셀을 먼저 정복해야 합니다.');
      return;
    }

    // this.remote.conquerCell(e.cell);
    if (this.user.money - e.cost >= 0) {
      this.remote.conquerCell(new Cell(e.cellId, this.user.id, this.user.team, e.cost, 0, true));
    } else {
      alert('현재 소지한 비용으로는 공격할 수 없습니다.');
    }

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
