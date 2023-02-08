import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicServantsRoutingModule } from './public-servants-routing.module';
import { PublicServantsComponent } from './public-servants.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [PublicServantsComponent],
  imports: [
    CommonModule,
    PublicServantsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,

    NgxFileDropModule,
  ],
})
export class PublicServantsModule {}
