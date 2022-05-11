import { MayorModule } from './mayor/mayor.module';
import { MainModule } from './main/main.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { NewsModule } from './news/news.module';
import { WhereToGoModule } from './where-to-go/where-to-go.module';
import { PublicServantsModule } from './public-servants/public-servants.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FontAwesomeModule,
    PublicServantsModule,
    WhereToGoModule,
    NewsModule,
    AnnouncementModule,
    MayorModule,
    CarouselModule,
    MainModule,
  ],
  exports: [MainPageComponent],
})
export class MainPageModule {}
