import { SpinnerModule } from './../../spinner/spinner.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransparencyRoutingModule } from './transparency-routing.module';
import { TransparencyComponent } from './transparency.component';
import { AddTransparencyComponent } from './add-transparency/add-transparency.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [TransparencyComponent, AddTransparencyComponent],
  imports: [
    CommonModule,
    TransparencyRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    AngularEditorModule,
    SpinnerModule,
  ],
})
export class TransparencyModule {}
