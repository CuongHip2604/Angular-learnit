import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PARAMS } from 'src/app/models/constants';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss'],
})
export class PostUpdateComponent implements OnInit {
  postDetail: Post = null!;

  faTimes = faTimes;

  constructor(
    private postService: PostService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.postService.currentPost
      .pipe(map((res) => (this.postDetail = res)))
      .subscribe();
  }

  onClose() {
    this.bsModalRef.hide();
    this.postService.sendPost(null!);
  }

  onSubmit(params: Post) {
    if (!params._id) return;
    this.postService.updatePost(params).subscribe(() => {
      this.getListPost();
    });
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
          this.onClose();
        })
      )
      .subscribe();
  }
}
