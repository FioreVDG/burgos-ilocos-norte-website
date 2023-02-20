import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficialsRoutingModule } from './officials-routing.module';
import { OfficialsComponent } from './officials.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/spinner/spinner.module';

@NgModule({
  declarations: [OfficialsComponent],
  imports: [
    CommonModule,
    OfficialsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
})
export class OfficialsModule {}
