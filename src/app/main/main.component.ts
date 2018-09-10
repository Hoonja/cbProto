import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteControllerService } from '../remote-controller.service';
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
  roomId: string;

  constructor(private router: Router, private route: ActivatedRoute, private remote: RemoteControllerService) { }

  ngOnInit() {
    console.log('MainComponent.roomId', this.route.snapshot.params['roomId']);
    console.log('MainComponent.roomId.inParamMap', this.route.snapshot.paramMap.get('roomId'));
    this.roomId = this.route.snapshot.params['roomId'];
    this.remote.onMessage().subscribe(this.handleMsg);
    this.remote.enterRoom(this.roomId, {foo: 'bar'});
  }

  goHome() {
    this.router.navigate(['/home', { foo: 'foo', bar: 'bar' }]);
  }

  handleMsg(msg) {
    console.log('got a chat(in main): ' + msg);
  }
}
