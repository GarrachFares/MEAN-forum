import { HttpClient , HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../utilities';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  addPost(post:any){
    const token = localStorage.getItem('Token')
    return this.http.post<any>(apiUrl+'/posts',post, {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }
  deletePost(postId:any){
    const token = localStorage.getItem('Token')
    return this.http.delete<any>(apiUrl+'/posts/'+postId, {headers: new HttpHeaders({ 'content-type':'application/json',Authorization:  'bearer '+token }) })
  }
}
