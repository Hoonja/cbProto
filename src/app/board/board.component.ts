import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Room } from '../models/room';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() room: Room;
  @Output() select = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  selectCell(e) {
    this.select.emit({ index: 12 });
  }
}
