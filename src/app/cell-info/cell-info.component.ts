import { Component, OnInit } from '@angular/core';
import { RemoteControllerService } from '../remote-controller.service';

@Component({
  selector: 'app-cell-info',
  templateUrl: './cell-info.component.html',
  styleUrls: ['./cell-info.component.css']
})
export class CellInfoComponent implements OnInit {

  constructor(private remote: RemoteControllerService) { }

  ngOnInit() {
    this.remote.onMessage().subscribe(this.handleMsg);
  }

  handleMsg(msg) {
    console.log('got a chat(in Cell): ' + msg);
  }

}
