import { SpinnerModule } from './../../spinner/spinner.module';
import { MaterialModule } from './../../material/material.module';
import { ViewTransparencyComponent } from './view-transparency/view-transparency.component';
import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransparencyRoutingModule } from './transparency-routing.module';
import { TransparencyComponent } from './transparency.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [TransparencyComponent, ViewTransparencyComponent],
  imports: [
    CommonModule,
    TransparencyRoutingModule,
    NoContentModule,
    NgxDocViewerModule,
    MaterialModule,
    SpinnerModule,
  ],
  exports: [TransparencyComponent],
})
export class TransparencyModule {}
