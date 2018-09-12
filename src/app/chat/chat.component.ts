import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() chatList: [];
  @Output() chatFired = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  sendChat() {
    console.log('ChatComponent.sendChat');
    this.chatFired.emit({
      text: 'send a chat.'
    });
  }
}
