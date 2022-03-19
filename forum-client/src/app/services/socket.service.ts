import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket ,private userService:UserService) { }

	// emit event
	connect() {
		this.socket.emit('connect_bruh',this.userService.getLoggedUserId());
	} 

	// listen event
	OnNewConnectedUser() {
		return this.socket.fromEvent('new.online.member');
	}

	sendMessage(message=''){
		this.socket.emit('sending.message',message);
	}
}
