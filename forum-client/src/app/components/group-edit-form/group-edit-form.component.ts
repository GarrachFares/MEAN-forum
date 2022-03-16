import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-edit-form',
  templateUrl: './group-edit-form.component.html',
  styleUrls: ['./group-edit-form.component.css']
})
export class GroupEditFormComponent implements OnInit {

  name= new FormControl('group name')
  description = new FormControl('group email')
  imgUrl = new FormControl('https://i.imgur.com/8RKXAIV.jpg')
  errorMessage = ''
  errorIsOn = false
  changesSaved = false
  btnState = 'save changes'
  groupid:any
  constructor(private groupService:GroupService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const groupId =this.route.snapshot.paramMap.get('id')
    if(!groupId) {
      this.btnState = 'create group'
      return
    }
    this.groupid = groupId
    this.groupService.getGroup(groupId).subscribe(response =>{
      if(!response.isAdmin){
        console.log('unautherized')
         this.router.navigate(['/group/',groupId])
      }
      this.name.setValue(response.name)
      if(response.imgUrl)this.imgUrl.setValue(response.imgUrl)
      this.description.setValue(response.description)
    },error => {
      console.log(error)
      console.log('smthing went wrong')
      this.router.navigate(['/'])
    }) 
  }

  sub(f:any){
    const formValue ={
      name : this.name.value,
      description:this.description.value,
      imgUrl : this.imgUrl.value,
    }
    //console.log(formValue)
    const groupId =this.route.snapshot.paramMap.get('id')
    let fn =  this.groupService.createGroup(formValue)
    if(groupId) fn = this.groupService.updateMyGroup(groupId,formValue)

    fn.subscribe(response =>{
      console.log(response)
      if(response.message){
        this.errorIsOn = true
        this.changesSaved = false
        this.errorMessage = response.message
      }else{
        this.changesSaved = true
        this.errorIsOn = false
      }
    },error => {
      console.log(error)
      console.log('smthing went wrong')
      
    })
    
  }
  deleteGroup(){
    this.groupService.deleteGroup(this.groupid).subscribe(
      response =>{
        if(response.message){
          this.errorIsOn = true
          this.changesSaved = false
          this.errorMessage = response.message
        }else{
          console.log('deleted successfuly') 
          console.log(response);
          this.router.navigate(['/groups'])
        }
      },
      error =>{
        console.log(error)
        console.log('smthing went wrong')
      }
    )
  }

}
