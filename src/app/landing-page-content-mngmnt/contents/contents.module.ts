import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsComponent } from './contents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [ContentsComponent],
  imports: [
    CommonModule,
    ContentsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
})
export class ContentsModule {}
