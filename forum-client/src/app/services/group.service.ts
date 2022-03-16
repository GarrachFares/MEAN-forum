import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../utilities';
import { catchError, tap } from "rxjs/operators"; 
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }
  createGroup(group:any){
    const token = localStorage.getItem('Token')
    return this.http.post<any>(apiUrl+'/groups',group, {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }
  getGroups(){
    const token = localStorage.getItem('Token')
    return this.http.get<any>(apiUrl+'/groups', {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }
  getGroup(id:any){
    const token = localStorage.getItem('Token')
    return this.http.get<any>(apiUrl+'/groups/'+id, {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }
  addPost(post:any,groupId:string){
    const token = localStorage.getItem('Token')
    return this.http.post<any>(apiUrl+'/posts/',post, {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }
  joinGroup(id:any){
    const token = localStorage.getItem('Token')
    return this.http.post<any>(apiUrl+'/groups/'+id+'/join',{}, {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }
  leaveGroup(id:any){
    const token = localStorage.getItem('Token')
    return this.http.post<any>(apiUrl+'/groups/'+id+'/leave',{}, {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }
  updateMyGroup(id:any,group:any){
    const token = localStorage.getItem('Token')
    return this.http.put<any>(apiUrl+'/groups/'+id,group, {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
 
  }
  deleteGroup(id:any){
    const token = localStorage.getItem('Token')
    return this.http.delete<any>(apiUrl+'/groups/'+id, {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }

}
