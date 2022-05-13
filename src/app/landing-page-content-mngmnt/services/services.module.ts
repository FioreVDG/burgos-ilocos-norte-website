import { SpinnerModule } from './../../spinner/spinner.module';
import { NoContentModule } from './../../no-content/no-content.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ModalsModule } from 'src/app/shared/modals/modals.module';
import { AddServiceComponent } from './add-service/add-service.component';

@NgModule({
  declarations: [ServicesComponent, AddServiceComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    ModalsModule,
    AngularEditorModule,
    NoContentModule,
    SpinnerModule,
  ],
})
export class ServicesModule {}
