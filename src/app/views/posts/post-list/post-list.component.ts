import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PARAMS } from 'src/app/models/constants';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PostCreateComponent } from '../post-create/post-create.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  faPlus = faPlus;
  bsModalRef!: BsModalRef;

  constructor(
    private postService: PostService,
    private modalService: BsModalService
  ) {
    this.modalService.config.class = 'modal-dialog-centered modal-md';
    this.modalService.config.ignoreBackdropClick = false;
    this.modalService.config.backdrop = true;
  }

  ngOnInit(): void {
    this.getListPost();
    this.postService.listpost
      .pipe(
        map((res) => {
          this.posts = res;
        })
      )
      .subscribe();
  }

  getListPost() {
    const params = {
      limit: PARAMS.LIMIT,
      offset: PARAMS.OFFSET,
    };
    this.postService
      .getListPost(params)
      .pipe(
        map((res) => {
          this.postService.sendListPost(res.data.posts);
        })
      )
      .subscribe();
  }

  createPost() {
    this.bsModalRef = this.modalService.show(PostCreateComponent);
  }
}
