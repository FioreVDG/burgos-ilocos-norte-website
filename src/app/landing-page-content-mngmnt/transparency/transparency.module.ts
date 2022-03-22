import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransparencyRoutingModule } from './transparency-routing.module';
import { TransparencyComponent } from './transparency.component';

@NgModule({
  declarations: [TransparencyComponent],
  imports: [CommonModule, TransparencyRoutingModule, MaterialModule],
})
export class TransparencyModule {}
