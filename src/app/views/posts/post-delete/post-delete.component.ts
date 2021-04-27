import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { map, tap } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { PARAMS } from 'src/app/models/constants';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss'],
})
export class PostDeleteComponent implements OnInit {
  faTimes = faTimes;
  postID: string = '';

  constructor(
    private postService: PostService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.postService.postID.pipe(map((res) => (this.postID = res))).subscribe();
  }

  onClose() {
    this.bsModalRef.hide();
    this.postService.sendPostID(null!);
  }

  onDelete() {
    this.postService
      .deletePost(this.postID)
      .pipe(
        tap(() => {
          this.getListPost();
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
          this.onClose();
        })
      )
      .subscribe();
  }
}
