import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups = []
  constructor(private service:GroupService) { }

  ngOnInit(): void {
    this.service.getGroups().
    subscribe(
      responce => {
        this.groups = responce
        this.groups.forEach((group:any) => {
          group.membersNumber = group.members.length 
        });
      } ,
      error => {
        console.log(error)
      }
    )
  }

}
