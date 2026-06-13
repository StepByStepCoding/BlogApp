import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://localhost:5001/api';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts() {}

  getPost(id: number) {}

  createPost(post: any) {}

  updatePost(id: number, post: any) {}

  deletePost(id: number) {}
}
