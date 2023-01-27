import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeographicInfoRoutingModule } from './geographic-info-routing.module';
import { GeographicInfoComponent } from './geographic-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [GeographicInfoComponent],
  imports: [
    CommonModule,
    GeographicInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class GeographicInfoModule {}
