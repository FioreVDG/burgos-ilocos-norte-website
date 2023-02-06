import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeaningLogoRoutingModule } from './meaning-logo-routing.module';
import { MeaningLogoComponent } from './meaning-logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SpinnerModule } from 'src/app/spinner/spinner.module';

@NgModule({
  declarations: [MeaningLogoComponent],
  imports: [
    CommonModule,
    MeaningLogoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SpinnerModule,
  ],
})
export class MeaningLogoModule {}
