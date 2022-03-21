import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertAreYouSureComponent } from './alert-are-you-sure/alert-are-you-sure.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [AlertAreYouSureComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [],
})
export class ModalsModule {}