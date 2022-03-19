import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.css']
})
export class MessagingPageComponent implements OnInit {

  constructor(private socketService : SocketService) { }

  ngOnInit(): void {
    this.socketService.connect() ;
    this.socketService.OnNewConnectedUser().subscribe((data) => console.log('new one !' ,data));
  }

  sendMessage(field:any){
    this.socketService.sendMessage(field.value)
  }

}
