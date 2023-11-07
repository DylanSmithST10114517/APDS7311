import { Component, OnInit } from '@angular/core';
import { analyze } from 'eslint-scope';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  posts: any;

  constructor(private postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe((posts: any) => {
      this.posts = posts;
    })
  }

  onPostDeleteClick(id: string) {
    interface Post {
      _id: string;
      title: String;
      description: String;
      departmentCode: String;
      // Other properties of your post object
    }    
    this.postsService.deletePost(id).subscribe((res: any) => {
      this.posts = this.posts.filter((val: Post) => val._id !== id)
      console.log(res);
    })
  }

  onLogoutClick() {
    this.authService.logout();
  }
  
}
