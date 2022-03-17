import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageContentMngmntRoutingModule } from './landing-page-content-mngmnt-routing.module';
import { LandingPageContentMngmntComponent } from './landing-page-content-mngmnt.component';


@NgModule({
  declarations: [
    LandingPageContentMngmntComponent
  ],
  imports: [
    CommonModule,
    LandingPageContentMngmntRoutingModule
  ]
})
export class LandingPageContentMngmntModule { }
