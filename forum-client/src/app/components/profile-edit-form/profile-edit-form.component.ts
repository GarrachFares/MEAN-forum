import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.css']
})
export class ProfileEditFormComponent implements OnInit {
  name= new FormControl('user name')
  email= new FormControl('user email')
  imgUrl = new FormControl('https://i.imgur.com/8RKXAIV.jpg')
  errorMessage = ''
  errorIsOn = false
  changesSaved = false

  constructor(private service:UserService,private router:Router) { }

  ngOnInit(): void {
    this.service.getMyProfile().subscribe(response =>{
      this.name.setValue(response.name)
      if(response.imgUrl)this.imgUrl.setValue(response.imgUrl)
      this.email.setValue(response.email)
    },error => {
      console.log(error)
      console.log('smthing went wrong')
      this.router.navigate(['/'])
    }) 
  }

  sub(f:any){
    const formValue ={
      name : this.name.value,
      email:this.email.value,
      imgUrl : this.imgUrl.value,
      password: f.value.password 
    }
    //console.log(formValue)
    this.service.updateMyProfile(formValue).subscribe(response =>{
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

  

}
