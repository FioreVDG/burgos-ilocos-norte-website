import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitizenCharterRoutingModule } from './citizen-charter-routing.module';
import { CitizenCharterComponent } from './citizen-charter.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [CitizenCharterComponent, DocViewerComponent],
  imports: [
    CommonModule,
    CitizenCharterRoutingModule,
    NoContentModule,
    NgxDocViewerModule,
  ],
  exports: [CitizenCharterComponent],
})
export class CitizenCharterModule {}
