import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteControllerService } from '../remote-controller.service';
import { Room } from '../models/room';
import { User } from '../models/user';
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
  room: Room;
  user: User;

  constructor(private router: Router, private route: ActivatedRoute, private remote: RemoteControllerService) { }

  ngOnInit() {
    try {
      this.room = JSON.parse(this.route.snapshot.paramMap.get('room'));
      this.user = JSON.parse(this.route.snapshot.paramMap.get('user'));
      console.log('main.room.navigateParam', this.room);
      console.log('main.user.navigateParam', this.user);

      this.remote.onConnect().subscribe(this.handleConnect.bind(this));
      this.remote.onDisconnect().subscribe(this.handleDisconnect.bind(this));
      this.remote.onMessage().subscribe(this.handleMsg);
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
      room: this.room,
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
    console.log('got a chat(in main): ' + msg);
  }
}
