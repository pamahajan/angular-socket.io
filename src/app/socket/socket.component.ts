import { Component, OnInit, OnDestroy } from '@angular/core';
import { Control }           from '@angular/common';
import { SocketService }       from './socket.service';

@Component({

  selector: 'chat',
  template: `<div *ngFor="let message of messages">
                     {{message.text}}
                   </div>
                   <input [(ngModel)]="message"  /><button (click)="sendMessage()">Send</button>`,

})
export class SocketComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;

  constructor(private chatService:SocketService) {}

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
