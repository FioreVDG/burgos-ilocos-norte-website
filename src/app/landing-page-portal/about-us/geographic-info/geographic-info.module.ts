import { MaterialModule } from './../../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeographicInfoRoutingModule } from './geographic-info-routing.module';
import { GeographicInfoComponent } from './geographic-info.component';

@NgModule({
  declarations: [GeographicInfoComponent],
  imports: [CommonModule, GeographicInfoRoutingModule, MaterialModule],
})
export class GeographicInfoModule {}
