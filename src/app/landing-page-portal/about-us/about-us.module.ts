import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { NoContentModule } from 'src/app/no-content/no-content.module';
@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    NoContentModule,
    MaterialModule,
  ],
  exports: [AboutUsComponent],
})
export class AboutUsModule {}
