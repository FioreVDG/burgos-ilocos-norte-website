import { MaterialModule } from './../../material/material.module';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from './../../spinner/spinner.module';
import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourismRoutingModule } from './tourism-routing.module';
import { TourismComponent } from './tourism.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [TourismComponent],
  imports: [
    CommonModule,
    TourismRoutingModule,
    NoContentModule,
    SpinnerModule,
    FormsModule,
    MaterialModule,
    CarouselModule,
  ],
  exports: [TourismComponent],
})
export class TourismModule {}
