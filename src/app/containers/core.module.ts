import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { ContentComponent } from './content/content.component';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, CoreRoutingModule],
  exports: [ContainerComponent],
  declarations: [
    SidebarComponent,
    HeaderComponent,
    ContentComponent,
    ContainerComponent,
  ],
  providers: [],
})
export class CoreModule {}
