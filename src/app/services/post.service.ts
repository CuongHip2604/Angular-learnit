import { Injectable } from '@angular/core';
import { Filter } from '../models/filter';
import { ApiService } from './api.service';
import { API_PATH } from '../models/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
  private postListSubject = new BehaviorSubject<Post[]>([]);
  listpost = this.postListSubject.asObservable();

  private postSubject = new BehaviorSubject<Post>(null!);
  currentPost = this.postSubject.asObservable();

  private postIDSubject = new BehaviorSubject<string>(null!);
  postID = this.postIDSubject.asObservable();

  constructor(private apiService: ApiService) {}

  public getListPost(params: Filter) {
    return this.apiService.GET(API_PATH.POST, params);
  }

  public createPost(params: Post) {
    return this.apiService.POST(`${API_PATH.POST}`, params);
  }

  public updatePost(params: Post) {
    return this.apiService.PUT(`${API_PATH.POST}/${params._id}`, params);
  }

  public deletePost(id: string) {
    return this.apiService.DELETE(`${API_PATH.POST}/${id}`);
  }

  sendPost(params: Post) {
    return this.postSubject.next(params);
  }

  sendListPost(params: Post[]) {
    return this.postListSubject.next(params);
  }

  sendPostID(params: string) {
    return this.postIDSubject.next(params);
  }
}
