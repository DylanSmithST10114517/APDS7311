import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private apiRequestService: ApiRequestService) {}

  createPost(title: string, description: string, departmentCode: string) {
    return this.apiRequestService.post('posts', {title, description, departmentCode});
  }

  getPosts() {
    return this.apiRequestService.get('posts');
  }

  deletePost(id: string) {
    return this.apiRequestService.delete(`posts/${id}`);
  }
}
