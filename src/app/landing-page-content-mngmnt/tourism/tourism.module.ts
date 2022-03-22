import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TourismRoutingModule } from './tourism-routing.module';
import { TourismComponent } from './tourism.component';

@NgModule({
  declarations: [TourismComponent],
  imports: [
    CommonModule,
    TourismRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TourismModule {}
