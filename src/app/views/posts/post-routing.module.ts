import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    data: {
      title: 'Post List',
    },
  },
  {
    path: '**',
    redirectTo: '/posts',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
