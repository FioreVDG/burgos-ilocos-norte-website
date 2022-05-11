import { NoContentModule } from './../../no-content/no-content.module';
import { SpinnerModule } from './../../spinner/spinner.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';

@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SpinnerModule,
    NoContentModule,
  ],
  exports: [DepartmentComponent],
})
export class DepartmentModule {}
