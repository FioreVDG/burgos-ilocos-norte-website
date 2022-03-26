import { AddTourismComponent } from './add-tourism/add-tourism.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourismRoutingModule } from './tourism-routing.module';
import { TourismComponent } from './tourism.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [TourismComponent, AddTourismComponent],
  imports: [
    CommonModule,
    TourismRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    AngularEditorModule,
  ],
})
export class TourismModule {}
