import { SpinnerModule } from './../../spinner/spinner.module';
import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegislativeRoutingModule } from './legislative-routing.module';
import { LegislativeComponent } from './legislative.component';

@NgModule({
  declarations: [LegislativeComponent],
  imports: [
    CommonModule,
    LegislativeRoutingModule,
    NoContentModule,
    SpinnerModule,
  ],
})
export class LegislativeModule {}
