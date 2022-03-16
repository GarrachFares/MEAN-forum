import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public invalidLogin = false 
  public errorMessage =''
  constructor(private service:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  submit(f :any){
    this.service.login(f.value).subscribe(
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
