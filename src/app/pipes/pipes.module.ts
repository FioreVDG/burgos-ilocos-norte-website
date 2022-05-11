import { SafePipe } from './safe/safe.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SafePipe],
  imports: [CommonModule],
  exports: [SafePipe],
})
export class PipesModule {}
