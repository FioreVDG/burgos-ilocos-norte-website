import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitizenCharterRoutingModule } from './citizen-charter-routing.module';
import { CitizenCharterComponent } from './citizen-charter.component';

@NgModule({
  declarations: [CitizenCharterComponent],
  imports: [
    CommonModule,
    CitizenCharterRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CitizenCharterModule {}
