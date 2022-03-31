import { SpinnerModule } from './../../spinner/spinner.module';
import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career.component';

@NgModule({
  declarations: [CareerComponent],
  imports: [CommonModule, CareerRoutingModule, NoContentModule, SpinnerModule],
  exports: [CareerComponent],
})
export class CareerModule {}
