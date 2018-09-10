import { Component, OnInit } from '@angular/core';
import { RemoteControllerService } from '../remote-controller.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private remote: RemoteControllerService) { }

  ngOnInit() {
    this.remote.onMessage().subscribe(this.handleMsg);
  }

  handleMsg(msg) {
    console.log('got a chat(in board): ' + msg);
  }

}
