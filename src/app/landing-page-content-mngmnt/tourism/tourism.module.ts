import { SpinnerModule } from './../../spinner/spinner.module';
import { AddTourismComponent } from './add-tourism/add-tourism.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourismRoutingModule } from './tourism-routing.module';
import { TourismComponent } from './tourism.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddImageComponent } from './add-tourism/add-image/add-image.component';

@NgModule({
  declarations: [TourismComponent, AddTourismComponent, AddImageComponent],
  imports: [
    CommonModule,
    TourismRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    AngularEditorModule,
    SpinnerModule,
  ],
})
export class TourismModule {}
