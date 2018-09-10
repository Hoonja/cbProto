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

      this.remote.onMessage().subscribe(this.handleMsg);
      this.remote.enterRoom({
        room: this.room,
        user: this.user
      });
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }

  goHome() {
    this.router.navigate(['/home', { foo: 'foo', bar: 'bar' }]);
  }

  handleMsg(msg) {
    console.log('got a chat(in main): ' + msg);
  }
}
