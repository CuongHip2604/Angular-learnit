import { Component } from '@angular/core';

@Component({
  selector: 'body',
  template: ` <ngx-spinner
      bdColor="rgba(0, 0, 0, 0.8)"
      size="medium"
      color="#fff"
      type="square-loader"
      [fullScreen]="true"
      ><p style="color: white">Loading...</p></ngx-spinner
    >
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'client-angular';
}
