import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  room: Room = new Room('', 10, 10);
  user: User = new User('', 'red', 1000.0);
  teams = ['red', 'yellow', 'green', 'blue'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get result() {
    return JSON.stringify({room: this.room, user: this.user});
  }

  enterTheRoom(form?: any) {
    // console.log('HomeComponent.enterTheRoom', form.controls['roomId']);
    console.log('HomeComponent.room', this.room);
    console.log('HomeComponent.user', this.user);
    if (form) {
      console.log('HomeComponent.enterTheRoom.form', form.form.controls['roomId'].value);
    }

    this.router.navigate(['/main/' + this.room.id, {
      room: JSON.stringify({
        id: this.room.id,
        width: this.room.width,
        height: this.room.height
      }),
      user: JSON.stringify({
        id: this.user.id,
        team: this.user.team,
        money: this.user.money
      })
    }]);
  }
}
