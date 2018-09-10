import { Component, OnInit } from '@angular/core';
import { RemoteControllerService } from '../remote-controller.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  constructor(private remote: RemoteControllerService) { }

  ngOnInit() {
    this.remote.onMessage().subscribe(this.handleMsg);
  }

  handleMsg(msg) {
    console.log('got a chat(in MyInfo): ' + msg);
  }

}
