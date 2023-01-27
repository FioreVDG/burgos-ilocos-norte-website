import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageContentMngmntRoutingModule } from './landing-page-content-mngmnt-routing.module';
import { LandingPageContentMngmntComponent } from './landing-page-content-mngmnt.component';
import { HotlinesComponent } from './hotlines/hotlines.component';

@NgModule({
  declarations: [LandingPageContentMngmntComponent],
  imports: [
    CommonModule,
    LandingPageContentMngmntRoutingModule,
    MaterialModule,
  ],
})
export class LandingPageContentMngmntModule {}
