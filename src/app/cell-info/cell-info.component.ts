import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../models/cell';

@Component({
  selector: 'app-cell-info',
  templateUrl: './cell-info.component.html',
  styleUrls: ['./cell-info.component.css']
})
export class CellInfoComponent implements OnInit {

  @Input() cell: Cell;
  @Output() conquer = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  conquerCell() {
    const val = prompt('공격에 사용할 비용을 입력하세요(' + this.cell.cost + ' 초과 필요)');
    console.log('CellInfoComponent.conquerCell val: ' + val);
    if (!val || this.cell.cost >= parseInt(val, 10)) {
      alert('좀 더 쓰세요.');
      return;
    } else {
      this.conquer.emit({
        cellId: this.cell.id,
        cost: parseInt(val, 10)
      });
    }
  }
}
