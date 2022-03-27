import { MaterialModule } from './../../../material/material.module';
import { WhereToGoComponent } from './where-to-go.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [WhereToGoComponent],
  imports: [CommonModule, CarouselModule, MaterialModule],
  exports: [WhereToGoComponent],
})
export class WhereToGoModule {}
