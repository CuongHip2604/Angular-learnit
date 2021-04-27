import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { PARAMS } from 'src/app/models/constants';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  faTimes = faTimes;

  constructor(
    private postService: PostService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.bsModalRef.hide();
  }

  onSubmit(params: Post) {
    if (!params.title) return;
    this.postService.createPost(params).subscribe(() => {
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
