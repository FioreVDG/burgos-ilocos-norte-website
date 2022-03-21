import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicServantsComponent } from './public-servants.component';

@NgModule({
  declarations: [PublicServantsComponent],
  imports: [CommonModule],
  exports: [PublicServantsComponent],
})
export class PublicServantsModule {}
