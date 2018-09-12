import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit() {}
}
