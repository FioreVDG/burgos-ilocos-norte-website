import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [CareerComponent],
  imports: [
    CommonModule,
    CareerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CareerModule {}
