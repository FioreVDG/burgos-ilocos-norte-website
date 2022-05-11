import { SpinnerModule } from './../../spinner/spinner.module';
import { NoContentModule } from './../../no-content/no-content.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './add-department/add-department.component';

@NgModule({
  declarations: [DepartmentComponent, AddDepartmentComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NoContentModule,
    SpinnerModule,
  ],
})
export class DepartmentModule {}
