import { NoContentModule } from './../../no-content/no-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitizenCharterRoutingModule } from './citizen-charter-routing.module';
import { CitizenCharterComponent } from './citizen-charter.component';

@NgModule({
  declarations: [CitizenCharterComponent],
  imports: [CommonModule, CitizenCharterRoutingModule, NoContentModule],
  exports: [CitizenCharterComponent],
})
export class CitizenCharterModule {}
