import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  public invalidLogin = false 
  public errorMessage =''
  constructor(private service:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  submit(f :any){
    this.service.register(f.value).subscribe(
    response => {
      if(response.message){
        this.errorMessage = response.message
        this.invalidLogin = true
      }/*else{
        console.log(response)
      }*/
    }
    )
  }
}
