import { NgModule } from '@angular/core';
import { P404Component } from './404.component';
import { P500Component } from './500.component';

@NgModule({
  imports: [],
  exports: [P404Component, P500Component],
  declarations: [P404Component, P500Component],
  providers: [],
})
export class ErrorModule {}
