import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  posts : any= []
  name = ''
  description = ''
  groupId:any
  imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcWa7nAAU9ZdA1poLmbvq_Lv6R49soYzGplA&usqp=CAU'
  backgroundImgUrl = ''
  loggedUserIsAdmin : boolean = false
  loggedUserIsMember : boolean = false
  constructor(private groupService:GroupService,private postService:PostService,private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.groupId =this.route.snapshot.paramMap.get('id')
    const id =this.route.snapshot.paramMap.get('id')
    this.groupService.getGroup(id).subscribe(response =>{
      console.log(response)
      this.posts = response.posts
      this.name =  response.name
      if(response.imgUrl) this.imgUrl = response.imgUrl
      if(response.backgroundImgUrl) this.backgroundImgUrl = response.backgroundImgUrl
      if(response.description) this.description = response.description
      this.loggedUserIsAdmin = response.isAdmin
      this.loggedUserIsMember = response.isMember 

      //if(response.email) this.loggedUserIsAdmin = true
    },error => {
      console.log(error)
      console.log('smthing went wrong')
      this.router.navigate(['/'])
    }) 
  }

  sub(f:any){
    const formValue ={
      content : f.value.newpost ,
      group : this.route.snapshot.paramMap.get('id')
    }
    this.postService.addPost(formValue).subscribe(response =>{
      console.log(response) 
      this.posts.push(response);
       f.reset()
    },error => {
      //add the toast here
      console.log(error.error)
      //console.log('smthing went wrong')
      
    })
    
  }
  joinGroup(){
    const groupId =this.route.snapshot.paramMap.get('id')
    this.groupService.joinGroup(groupId).subscribe(responce =>{
      //console.log(responce)
      this.loggedUserIsMember = true
    },
    error => {
      console.log(error)
    })
  }

  leaveGroup(){
    const groupId =this.route.snapshot.paramMap.get('id')
    this.groupService.leaveGroup(groupId).subscribe(responce =>{
      //console.log(responce)
      this.loggedUserIsMember = false
      this.loggedUserIsAdmin = false
    },
    error => {
      console.log(error)
    })
  }
  
  removePostFromArray(id:string){
    this.posts = this.posts.filter((x:any) => x._id != id)
  }

}
