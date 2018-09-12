import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Output() select = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  selectCell(e) {
    this.select.emit({ index: 12 });
  }
}
