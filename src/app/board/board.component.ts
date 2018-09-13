import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Room } from '../models/room';

const COLOR_UNOCCUPIED = '#eeeeee';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() room: Room;
  @Output() select = new EventEmitter();

  rows = [];
  cols = [];

  constructor() {}

  ngOnInit() {
    // console.log('BoardComponent.ngOnInit', this.room);
    if (this.room && this.room.width && this.room.height) {
      for (let i = 0; i < this.room.width; i++) {
        this.rows.push(i);
      }
      for (let j = 0; j < this.room.height; j++) {
        this.cols.push(j);
      }
    }

    setTimeout(this.constructLayout, 1000);
  }

  selectCell(index) {
    this.select.emit({ index: index });
  }

  constructLayout() {
    // const board = document.querySelector('#hexa-map');
    // console.log('The width of board : ' + board.clientWidth);
    // console.log('The height of board : ' + board.clientHeight);
    // const cellWidth = board.clientWidth / (this.room.width + 0.5);
    // const cellHeight = (board.clientHeight - 40) / this.room.height;
  }

  getCellColor(index) {
    if (this.room && this.room.cells && this.room.cells.length > 0 && this.room.cells.length > index) {
      if (this.room.cells[index] && this.room.cells[index].team) {
        return this.room.cells[index].team;
      } else {
        return COLOR_UNOCCUPIED;
      }
    } else {
      return COLOR_UNOCCUPIED;
    }
  }
}
