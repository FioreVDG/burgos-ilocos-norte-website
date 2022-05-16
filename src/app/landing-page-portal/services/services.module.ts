import { ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from './../../shared/modals/modals.module';
import { NoContentModule } from './../../no-content/no-content.module';
import { SpinnerModule } from './../../spinner/spinner.module';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MaterialModule,
    SpinnerModule,
    NoContentModule,
    ModalsModule,
    ReactiveFormsModule,
  ],
})
export class ServicesModule {}
