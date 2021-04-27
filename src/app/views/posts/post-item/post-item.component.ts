import { Component, Input, OnInit } from '@angular/core';
import {
  faVideo,
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/models/post';
import { startCase } from 'lodash-es';
import { STATUS } from 'src/app/models/constants';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PostUpdateComponent } from '../post-update/post-update.component';
import { PostService } from 'src/app/services/post.service';
import { PostDeleteComponent } from '../post-delete/post-delete.component';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() item!: Post;

  faVideo = faVideo;
  faPenAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  startCase = startCase;

  bsModalRef!: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private postService: PostService
  ) {
    this.modalService.config.class = 'modal-dialog-centered modal-md';
    this.modalService.config.ignoreBackdropClick = false;
    this.modalService.config.backdrop = true;
  }

  ngOnInit(): void {}

  setBorder(status: string) {
    switch (status) {
      case STATUS.LEARNING:
        return {
          border: '1px solid rgba(96,165,250)',
        };
      case STATUS.LEARNED:
        return {
          border: '1px solid rgba(129,140,248)',
        };

      default:
        return;
    }
  }
  setBg(status: string) {
    switch (status) {
      case STATUS.LEARNING:
        return {
          background: 'rgba(96,165,250)',
        };
      case STATUS.LEARNED:
        return {
          background: 'rgba(129,140,248)',
        };

      default:
        return;
    }
  }

  openWindow(url: string) {
    window.open(url);
  }

  updatePost(post: Post) {
    this.postService.sendPost(post);
    this.bsModalRef = this.modalService.show(PostUpdateComponent);
  }

  deletePost(id: string) {
    this.postService.sendPostID(id);
    this.bsModalRef = this.modalService.show(PostDeleteComponent);
  }
}
