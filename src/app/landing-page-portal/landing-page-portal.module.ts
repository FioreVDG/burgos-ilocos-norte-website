import { MainPageModule } from './main-page/main-page.module';
import { MainPageComponent } from './main-page/main-page.component';
import { NavigationModule } from './../navigation/navigation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPagePortalRoutingModule } from './landing-page-portal-routing.module';
import { LandingPagePortalComponent } from './landing-page-portal.component';

@NgModule({
  declarations: [LandingPagePortalComponent],
  imports: [
    CommonModule,
    LandingPagePortalRoutingModule,
    NavigationModule,
    MainPageModule,
  ],
})
export class LandingPagePortalModule {}
