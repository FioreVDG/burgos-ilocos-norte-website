import { SpinnerModule } from './../../spinner/spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddCareerComponent } from './add-career/add-career.component';

@NgModule({
  declarations: [CareerComponent, AddCareerComponent],
  imports: [
    CommonModule,
    CareerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
})
export class CareerModule {}
