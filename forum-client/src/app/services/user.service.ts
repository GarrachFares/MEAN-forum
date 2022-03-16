import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../utilities';
import { catchError, tap } from "rxjs/operators"; 
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient ,private helper:JwtHelperService) { }
  getLoggedUserName(){
    const token = localStorage.getItem('Token')
    if(token){
      const decoded:any = this.helper.decodeToken(token.toString());
      return decoded.name
    }
  }
  getLoggedUserId(){
    const token = localStorage.getItem('Token')
    if(token){
      const decoded:any = this.helper.decodeToken(token.toString());
      return decoded._id
    }
  }
  getProfile(id:any){
    const token = localStorage.getItem('Token')
    return this.http.get<any>(apiUrl+'/users/'+id,{headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token })})
  }
  getMyProfile(){
    const token = localStorage.getItem('Token')
    return this.http.get<any>(apiUrl+'/users/', {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }

 // complete this shit 
  updateMyProfile(userInfo:any){
    const token = localStorage.getItem('Token')
    return this.http.put(apiUrl+'/users/edit',userInfo,{headers: new HttpHeaders({ 'content-type':'application/json',authorization:  'bearer '+token }) }).pipe(
      tap((res:any) =>{
        //console.log(res)
      }) , 
      catchError((err)=> {
        return new Observable(res => {
          let reqData = {
            message:err.error,
            status:err.status
          }
          res.next(reqData)
        })})
   )
  }
}
