import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { STATUS } from 'src/app/models/constants';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter<Post>();

  @Input() isUpdate: boolean = false;
  statuses = [
    {
      name: 'To learn',
      value: STATUS.TO_LEARN,
    },
    {
      name: 'Learning',
      value: STATUS.LEARNING,
    },
    {
      name: 'Learned',
      value: STATUS.LEARNED,
    },
  ];

  postForm!: FormGroup;

  postDetail!: Post;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.getPostDetail();
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      url: ['', [Validators.required]],
      status: ['TO_LEARN'],
    });

    if (this.postDetail) {
      this.postForm.patchValue({
        title: this.postDetail.title,
        description: this.postDetail.description,
        url: this.postDetail.url,
        status: this.postDetail.status,
      });
    }
  }

  getPostDetail() {
    this.postService.currentPost
      .pipe(map((res) => (this.postDetail = res)))
      .subscribe();
  }

  updateForm() {
    if (!this.postForm.valid) return;
    const params = {
      ...this.postForm.value,
    };
    if (this.isUpdate) {
      params['_id'] = this.postDetail._id;
    }
    this.submit.emit(params);
  }

  cancelForm() {
    this.cancel.emit();
  }

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

  get url() {
    return this.postForm.get('url');
  }
}
