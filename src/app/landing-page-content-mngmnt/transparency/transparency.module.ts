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
import { AddTransparencyFileComponent } from './add-transparency/add-transparency-file/add-transparency-file.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    TransparencyComponent,
    AddTransparencyComponent,
    AddTransparencyFileComponent,
  ],
  imports: [
    CommonModule,
    TransparencyRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    AngularEditorModule,
    SpinnerModule,
    NgxDocViewerModule,
  ],
})
export class TransparencyModule {}
