import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegislativeRoutingModule } from './legislative-routing.module';
import { LegislativeComponent } from './legislative.component';
import { AddLegislativeComponent } from './add-legislative/add-legislative.component';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [LegislativeComponent, AddLegislativeComponent],
  imports: [
    CommonModule,
    LegislativeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
  ],
})
export class LegislativeModule {}
