import { MaterialModule } from './../../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoMeaningRoutingModule } from './logo-meaning-routing.module';
import { LogoMeaningComponent } from './logo-meaning.component';

@NgModule({
  declarations: [LogoMeaningComponent],
  imports: [CommonModule, LogoMeaningRoutingModule, MaterialModule],
})
export class LogoMeaningModule {}
