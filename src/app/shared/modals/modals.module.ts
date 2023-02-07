import { SpinnerModule } from './../../spinner/spinner.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertAreYouSureComponent } from './alert-are-you-sure/alert-are-you-sure.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ViewerComponent } from './viewer/viewer.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    AlertAreYouSureComponent,
    ViewerComponent,
    FileViewerComponent,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxDocViewerModule,
    SpinnerModule,
    LeafletModule,
    NgxFileDropModule,
  ],
  exports: [],
})
export class ModalsModule {}
