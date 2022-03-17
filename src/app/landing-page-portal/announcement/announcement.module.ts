import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementRoutingModule } from './announcement-routing.module';
import { AnnouncementComponent } from './announcement.component';

@NgModule({
  declarations: [AnnouncementComponent],
  imports: [CommonModule, AnnouncementRoutingModule, NoContentModule],
  exports: [AnnouncementComponent],
})
export class AnnouncementModule {}
