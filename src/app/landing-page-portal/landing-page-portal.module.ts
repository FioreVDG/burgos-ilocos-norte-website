import { SpinnerModule } from './../spinner/spinner.module';
import { NewsModule } from './main-page/news/news.module';
import { NoContentModule } from './../no-content/no-content.module';
import { LoadingModule } from './../loading/loading.module';
import { AboutUsModule } from './about-us/about-us.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { CareerModule } from './career/career.module';
import { CitizenCharterModule } from './citizen-charter/citizen-charter.module';
import { EmergencyHotlineModule } from './emergency-hotline/emergency-hotline.module';
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
import { LayoutModule } from '@angular/cdk/layout';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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
    EmergencyHotlineModule,
    CitizenCharterModule,
    CareerModule,
    AnnouncementModule,
    AboutUsModule,
    LoadingModule,
    NoContentModule,
    LayoutModule,
    NewsModule,
    NgxSkeletonLoaderModule,
    SpinnerModule,
  ],
})
export class LandingPagePortalModule {}
