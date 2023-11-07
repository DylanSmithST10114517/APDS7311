import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
  }

  createPost(title: string, description: string, departmentCode: string) {
    this.postsService.createPost(title, description, departmentCode).subscribe((response: any) => {
      console.log(response)
      //navigate to posts-view page
      this.router.navigate(['/']);
    })
  }

}
