import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  @Input()content = '' ;
  @Input()userName = '' ;
  @Input()userImg = '' ;
  @Input() postId = '' ;
  @Input() post:any ;
  @Input() userId :string =this.userService.getLoggedUserId()
  canDelete = false
  @Output() deleted = new EventEmitter<string>()
  constructor(private postService:PostService,private userService:UserService) { }

  ngOnInit(): void {
    
    if(this.post){
      this.postId = this.post._id
      this.userName= this.post.user.name
      this.userImg= this.post.user.imgUrl
      this.userId = this.post.user._id
      this.content=this.post.content
    }
    const loggedUserId =this.userService.getLoggedUserId()
    //console.log(loggedUserId,this.userId)
    if(loggedUserId == this.userId) this.canDelete = true
  }

  deletePost(){
    if(this.postId && this.postId != ''){
      this.postService.deletePost(this.postId).subscribe(response =>{
        console.log(response)
        this.deleted.emit(response._id)
      }, 
      error => {
        console.log(error);
      })
    }
  }
}
