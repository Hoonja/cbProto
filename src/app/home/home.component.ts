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
  teams = ['red', 'yello', 'green', 'blue'];

  constructor() { }

  ngOnInit() {
  }

  get result() {
    return JSON.stringify({room: this.room, user: this.user});
  }

  enterTheRoom(form?: any) {
    //  TODO: 서버에 쏘고..
    //  TODO: 쏘는 동안 스피너 돌리다가..
    //  TODO: 응답 오면 메인 페이지로 이동

    // console.log('HomeComponent.enterTheRoom', form.controls['roomId']);
    console.log('HomeComponent.room', this.room);
    console.log('HomeComponent.user', this.user);
    if (form) {
      console.log('HomeComponent.enterTheRoom.form', form.form.controls['roomId'].value);
    }
  }
}
