import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitizenCharterRoutingModule } from './citizen-charter-routing.module';
import { CitizenCharterComponent } from './citizen-charter.component';
import { AddCitizenCharterComponent } from './add-citizen-charter/add-citizen-charter.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxFileDropModule } from 'ngx-file-drop';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [CitizenCharterComponent, AddCitizenCharterComponent],
  imports: [
    CommonModule,
    CitizenCharterRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    AngularEditorModule,
    NgxDocViewerModule,
    PdfViewerModule,
  ],
})
export class CitizenCharterModule {}
