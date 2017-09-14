import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SocketService {
  private url = 'http://localhost:9000';
  private socket;

  sendMessage(message){
    console.log(message);
    this.socket.emit('add-message', message);
    console.log('sent message');
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url, {query: 'token=fdsfsdf'});
      console.log('connected');
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
