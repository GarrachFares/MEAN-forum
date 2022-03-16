import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts:any  = []
  name = ''
  imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcWa7nAAU9ZdA1poLmbvq_Lv6R49soYzGplA&usqp=CAU'
  loggedUserIsOwner : boolean = false
  constructor(private userService:UserService, private postService:PostService ,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id =this.route.snapshot.paramMap.get('id')
    
    let fn = () => this.userService.getMyProfile()
    if(id){
       fn = () => this.userService.getProfile(id)
    }
    fn().subscribe(response =>{
      console.log(response)
      this.posts = response.posts
      this.name =  response.name
      if(response.imgUrl)this.imgUrl = response.imgUrl
      if(response.email) this.loggedUserIsOwner = true
    },error => {
      console.log(error)
      console.log('smthing went wrong')
      this.router.navigate(['/'])
    }) 
  }


  sub(f:any){
    const formValue ={
      content : f.value.newpost
    }
    this.postService.addPost(formValue).subscribe(response =>{
       this.posts.push(response);
       f.reset()
    },error => {
      console.log(error)
      console.log('smthing went wrong')
      
    })
    
  }

  removePostFromArray(id:string){
    this.posts = this.posts.filter((x:any) => x._id != id)
  }
}
