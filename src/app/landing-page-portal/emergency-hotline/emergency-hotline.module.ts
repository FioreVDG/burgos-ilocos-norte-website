import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmergencyHotlineRoutingModule } from './emergency-hotline-routing.module';
import { EmergencyHotlineComponent } from './emergency-hotline.component';

@NgModule({
  declarations: [EmergencyHotlineComponent],
  imports: [CommonModule, EmergencyHotlineRoutingModule, NoContentModule],
  exports: [EmergencyHotlineComponent],
})
export class EmergencyHotlineModule {}
