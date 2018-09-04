import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  room: Room = new Room('', 10, 10);
  user: User = new User('', 'red', 1000.0);

  constructor() { }

  ngOnInit() {
  }

  enterTheRoom(form: any) {
    console.log('HomeComponent.enterTheRoom', form.controls['roomId']);
  }
}
