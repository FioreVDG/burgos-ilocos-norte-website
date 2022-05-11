import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MayorComponent } from './mayor.component';

@NgModule({
  declarations: [MayorComponent],
  imports: [CommonModule],
  exports: [MayorComponent],
})
export class MayorModule {}
