import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotlinesRoutingModule } from './hotlines-routing.module';
import { HotlinesComponent } from './hotlines.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SpinnerModule } from 'src/app/spinner/spinner.module';

@NgModule({
  declarations: [HotlinesComponent],
  imports: [
    CommonModule,
    HotlinesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    SpinnerModule,
  ],
})
export class HotlinesModule {}
