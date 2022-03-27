import { WhereToGoModule } from './where-to-go/where-to-go.module';
import { PublicServantsModule } from './public-servants/public-servants.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FontAwesomeModule,
    PublicServantsModule,
    WhereToGoModule,
  ],
  exports: [MainPageComponent],
})
export class MainPageModule {}
