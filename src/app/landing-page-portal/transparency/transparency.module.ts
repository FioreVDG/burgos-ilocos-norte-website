import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransparencyRoutingModule } from './transparency-routing.module';
import { TransparencyComponent } from './transparency.component';

@NgModule({
  declarations: [TransparencyComponent],
  imports: [CommonModule, TransparencyRoutingModule, NoContentModule],
  exports: [TransparencyComponent],
})
export class TransparencyModule {}
