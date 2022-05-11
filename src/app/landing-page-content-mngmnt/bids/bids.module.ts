import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidsRoutingModule } from './bids-routing.module';
import { BidsComponent } from './bids.component';
import { AddBidsComponent } from './add-bids/add-bids.component';
import { AddFileComponent } from './add-bids/add-file/add-file.component';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [BidsComponent, AddBidsComponent, AddFileComponent],
  imports: [
    CommonModule,
    BidsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxFileDropModule,
  ],
})
export class BidsModule {}
