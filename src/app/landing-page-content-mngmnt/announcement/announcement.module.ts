import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementRoutingModule } from './announcement-routing.module';
import { AnnouncementComponent } from './announcement.component';
import { AddAnnouncememntComponent } from './add-announcememnt/add-announcememnt.component';

@NgModule({
  declarations: [AnnouncementComponent, AddAnnouncememntComponent],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AnnouncementModule {}
