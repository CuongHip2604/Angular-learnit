import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { PostRoutingModule } from './post-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostFormComponent } from './post-form/post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostListComponent,
    PostItemComponent,
    PostCreateComponent,
    PostUpdateComponent,
    PostDeleteComponent,
    PostFormComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FontAwesomeModule,
    // NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PostsModule {}
