import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  teams = [
    { name: 'Red', value: '#C70039' },
    { name: 'Yellow', value: '#F1C40F' },
    { name: 'Green', value: '#27AE60' },
    { name: 'Blue', value: '#1F618D' },
    { name: 'Purple', value: '#7D3C98' },
    { name: 'Orange', value: '#F39C12' },
    { name: 'Brown', value: '#A04000' },
  ];
  team = {};

  @Input() user: User;
  constructor() { }

  ngOnInit() {
    this.team = this.teams.find( item => item.value === this.user.team);
  }
}
