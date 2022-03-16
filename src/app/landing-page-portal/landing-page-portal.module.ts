import { TourismModule } from './tourism/tourism.module';
import { TransparencyModule } from './transparency/transparency.module';
import { FooterModule } from './../footer/footer.module';
import { LegislativeModule } from './legislative/legislative.module';
import { ScrollTopModule } from './../scroll-top/scroll-top.module';
import { MainPageModule } from './main-page/main-page.module';
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
    FooterModule,
    ScrollTopModule,
    LegislativeModule,
    TransparencyModule,
    TourismModule,
  ],
})
export class LandingPagePortalModule {}
