import { Component, OnInit } from '@angular/core';
import { RemoteControllerService } from '../remote-controller.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private remote: RemoteControllerService) { }

  ngOnInit() {
    this.remote.sayHello();
    this.remote.onChat().subscribe(this.handleMsg);
  }

  handleMsg(msg) {
    console.log('got a chat(in Chat): ' + msg);
  }

}
