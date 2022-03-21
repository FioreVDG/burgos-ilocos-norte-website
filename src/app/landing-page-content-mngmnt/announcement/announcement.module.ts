import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementRoutingModule } from './announcement-routing.module';
import { AnnouncementComponent } from './announcement.component';
import { AddAnnouncememntComponent } from './add-announcememnt/add-announcememnt.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ModalsModule } from 'src/app/shared/modals/modals.module';

@NgModule({
  declarations: [AnnouncementComponent, AddAnnouncememntComponent],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    ModalsModule,
  ],
})
export class AnnouncementModule {}
