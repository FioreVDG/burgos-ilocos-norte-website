import { MaterialModule } from './../../material/material.module';
import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementRoutingModule } from './announcement-routing.module';
import { AnnouncementComponent } from './announcement.component';
import { ViewAnnouncementComponent } from './view-announcement/view-announcement.component';

@NgModule({
  declarations: [AnnouncementComponent, ViewAnnouncementComponent],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    NoContentModule,
    MaterialModule,
  ],
  exports: [AnnouncementComponent],
})
export class AnnouncementModule {}
