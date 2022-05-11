import { MaterialModule } from './../../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionVisionRoutingModule } from './mission-vision-routing.module';
import { MissionVisionComponent } from './mission-vision.component';

@NgModule({
  declarations: [MissionVisionComponent],
  imports: [CommonModule, MissionVisionRoutingModule, MaterialModule],
})
export class MissionVisionModule {}
